const index = require('../config/index');
require('dotenv').config();

async function checkBridge(bridge_name){
    let user_contract;
    if (bridge_name === "MBC"){
        user_contract = index.Contracts.MBC["ERC20"];
    } else {
        user_contract = index.Contracts.AGD["ERC20"];
    }
    const Acc = process.env.MBC_ADMIN;
    return ({Acc, user_contract});
}

async function getBalance({bridge_name, address}){
    const {Acc, user_contract} = await checkBridge(bridge_name);
    const balance = await user_contract.methods.balanceOf(address).call({from: Acc});
    return balance
}

async function getRealBalance({bridge_name, address}){  
    let web3;
    if (bridge_name === "MBC"){
        web3 = index.Web3Instances["mbc_bridge"];
    } else {
        web3 = index.Web3Instances["agd_bridge"];
    }
    const balance = await web3.eth.getBalance(address);
    const balance_eth = await web3.utils.fromWei(balance, 'ether');
    return(balance_eth);
}

module.exports = {getBalance, getRealBalance};