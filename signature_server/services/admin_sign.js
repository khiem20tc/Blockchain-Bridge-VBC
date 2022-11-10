require('dotenv').config();
const {mbc_bridge, agd_bridge} = require('../config/index').Web3Instances;
const {MBC, AGD } = require('../config/index').Contracts;

const mbc_admin = mbc_bridge.eth.accounts.privateKeyToAccount(process.env.MNEMONIC1);
const agd_admin = agd_bridge.eth.accounts.privateKeyToAccount(process.env.MNEMONIC2);


const ERC20_signer = async({to_network, from, to, amount, is_native}) => {
    let contract;
    let method_name;
    let admin;
    if (to_network == "MBC"){
        contract = MBC["FT"];
        admin = mbc_admin;
    } else {
        contract = AGD["FT"];
        admin = agd_admin;
    }

    if (is_native){
        method_name = "transfer_native"
    } else {
        method_name = "unlock"
    }

    const nonce = await contract.methods.TrackingAmounts(from, to, is_native, false).call({from: process.env.MBC_ADMIN});
    console.log(method_name, from, to, amount, nonce);
    const hash = mbc_bridge.utils.soliditySha3({t: 'string', v: method_name}, 
    {t: 'address', v: from},
    {t: 'address', v: to},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce});
    const signature = (await admin.sign(hash)).signature;
    console.log(signature);
    return(signature)
}

const ERC721_single_signer = async({to_network, from, to, tokenId}) => {
    let contract;
    let admin;
    if (to_network == "MBC"){
        contract = MBC["NFT"];
        admin = mbc_admin;
    } else {
        contract = AGD["NFT"];
        admin = agd_admin;
    }



    const nonce = await contract.methods.NumTransact(from, to, tokenId, false).call({from: process.env.MBC_ADMIN});
    const hash = mbc_bridge.utils.soliditySha3({t: 'string', v: 'unlock_multiples'}, 
    {t: 'address', v: from},
    {t: 'address', v: to},
    {t: 'uint256', v: tokenId},
    {t: 'uint256', v: nonce});
    const signature = (await admin.sign(hash)).signature;
    console.log(signature);
    return(signature)
}

const ERC721_multiple_signer = async({to_network, from, to, tokenIds}) => {
    let signatures = [];

    for (let i = 0; i < tokenIds.length; i++){
        let signature = await ERC721_single_signer({to_network, from, to, tokenId: tokenIds[i]});
        signatures.push(signature);
    }
    return(signatures);
}


module.exports = {
    ERC20_signer,
    ERC721_single_signer,
    ERC721_multiple_signer
}