require('dotenv').config();

const {MBC, AGD} = require('../config/index').Contracts;
const {mbc_bridge, agd_bridge} = require('../config/index').Web3Instances;


const check_network = (to_network, token) => {
    let from_contract = MBC[token];
    let to_contract = AGD[token];
    let web3 = agd_bridge;
    if (to_network == "MBC"){
        from_contract = AGD[token];
        to_contract = MBC[token];
        web3 = mbc_bridge;
    }

    return({from_contract, to_contract, web3})
}

async function getApproved({from, to, is_native, to_network}){
    const {from_contract, to_contract, web3} = check_network(to_network, "FT");
    const sender_address = process.env.MBC_ADMIN;
    const lock_amount = web3.utils.toBN((await from_contract.methods.TrackingAmounts(from, to, !is_native, true).call({from: sender_address})));
    const unlock_amount = web3.utils.toBN((await to_contract.methods.TrackingAmounts(from, to, is_native, false).call({from: sender_address})));
    const approved = lock_amount.sub(unlock_amount);
    console.log(from, to, is_native, to_network);
    console.log("VERIFY AMOUNT:");
    console.log("LOCK", lock_amount.toString());
    console.log("UNLOCK", unlock_amount.toString());
    console.log("APPROVED", approved.toString());
    return(approved);
}


//to must be the Account address of user (Use Acc[0] if plugin Metamask)
const verify_FT_request = async({from, to, is_native, to_network, amount}) => {
    const approved = await getApproved({from, to, is_native, to_network});
    const larger = !((approved.sub(mbc_bridge.utils.toBN(amount))).isNeg());
    console.log(approved);
    console.log(amount);
    console.log(larger);
    if (larger){
        return(true)
    }
    return(false)
}

const verify_single_token = async(from, to, to_network, tokenId) => {
    const {from_contract, to_contract, web3} = check_network(to_network, "NFT");
    const lock_tx = web3.utils.toBN(await from_contract.methods.NumTransact(from, to, tokenId, true).call({from: process.env.MBC_ADMIN}));
    const unlock_tx = web3.utils.toBN(await to_contract.methods.NumTransact(from, to, tokenId, false).call({from: process.env.MBC_ADMIN}));
    const diff = (lock_tx.sub(unlock_tx));
    const larger = !diff.isNeg() && !diff.isZero();
    console.log(larger);
    if (larger){
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

// test = async() => {
//     const valid = await verify_FT_request({
//         from: "0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758",
//         to: "0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758",
//         is_native: true,
//         to_network: "AGD",
//         amount: "1000"
//     });
//     console.log(valid); 
// }

// test()

module.exports = {
    verify_FT_request,
    verify_NFT_request,
    getApproved
}