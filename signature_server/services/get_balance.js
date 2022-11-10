const index = require('../config/index');


async function checkBridge(bridge_name){
    const private_key = process.env.KEY3
    if (bridge_name === "MBC"){
        web3 = index.Web3Instances.mbc_bridge;
    } else {
        web3 = index.Web3Instances.agd_bridge;
    }

    const user_contract = await new web3.eth.Contract(index.ERC20Info.AbiERC20, index.ERC20Info.AddressERC20);
    const Acc = (await web3.eth.accounts.privateKeyToAccount(private_key)).address;
    return ({Acc, user_contract});
}

async function getBalance({bridge_name, address}){
    const {Acc, user_contract} = await checkBridge(bridge_name);
    const balance = await user_contract.methods.balanceOf(address).call({from: Acc});
    return balance
}

module.exports = getBalance