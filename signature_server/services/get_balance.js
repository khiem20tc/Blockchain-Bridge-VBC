const index = require('../config/index');
require('dotenv').config();

async function checkBridge(bridge_name){
    let user_contract;
    let web3;
    if (bridge_name === "MBC"){
        user_contract = index.Contracts.MBC["ERC20"];
        web3 = index.Web3Instances["mbc_bridge"];
    } else {
        user_contract = index.Contracts.AGD["ERC20"];
        web3 = index.Web3Instances["agd_bridge"];
    }
    const Acc = process.env.MBC_ADMIN;
    return ({Acc, user_contract, web3});
}

async function getBalance({bridge_name, address}){
    const {Acc, user_contract, web3} = await checkBridge(bridge_name);
    const balance = await user_contract.methods.balanceOf(address).call({from: Acc});
    const balance_eth = await web3.utils.fromWei(balance, 'ether');
    return balance_eth
}

async function getRealBalance({bridge_name, address}){  
    const {web3} = await checkBridge(bridge_name);
    const balance = await web3.eth.getBalance(address);
    const balance_eth = await web3.utils.fromWei(balance, 'ether');
    return(balance_eth);
}

module.exports = {getBalance, getRealBalance};