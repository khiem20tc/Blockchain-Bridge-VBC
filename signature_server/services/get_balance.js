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

module.exports = getBalance;