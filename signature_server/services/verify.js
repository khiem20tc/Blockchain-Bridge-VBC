require('dotenv').config();

const {MBC, AGD} = require('../config/index').Contracts;


const check_network = (to_network, token) => {
    let from_contract = MBC[token];
    let to_contract = AGD[token];
    if (to_network == "MBC"){
        from_contract = AGD[token];
        to_contract = MBC[token];
    }

    return({from_contract, to_contract})
}


//to must be the Account address of user (Use Acc[0] if plugin Metamask)
const verify_FT_request = async({from, to, is_native, to_network, amount}) => {
    const {from_contract, to_contract} = check_network(to_network, "FT");
    const lock_amount = await from_contract.methods.TrackingAmounts(from, to, !is_native, true).call({from: process.env.MBC_ADMIN});
    const unlock_amount = await to_contract.methods.TrackingAmounts(from, to, is_native, false).call({from: process.env.MBC_ADMIN});
    if (amount <= (lock_amount - unlock_amount)){
        return(true)
    }
    return(false)
}

const verify_single_token = async(from, to, to_network, tokenId) => {
    const {from_contract, to_contract} = check_network(to_network, "NFT");
    const lock_tx = await from_contract.methods.NumTransact(from, to, tokenId, true).call({from: process.env.MBC_ADMIN});
    const unlock_tx = await to_contract.methods.NumTransact(from, to, tokenId, false).call({from: process.env.MBC_ADMIN});
    if ((lock_tx > unlock_tx)){
        return(true)
    }
    return(false)
}

const verify_NFT_request = async({from, to, to_network, tokenIds}) => {
    let valid;
    for (let i = 0; i < tokenIds.length; i++){
        valid = await verify_single_token(from, to, to_network, tokenIds[i]);
        if (valid == false){
            return(false)
        }
    }
    return(true)
}

module.exports = {
    verify_FT_request,
    verify_NFT_request
}