const index = require('../config/index');


async function checkBridge(bridge_name, token){
    let bridge_web3
    let bridge_add
    let bridge_contract
    let private_key
    if (bridge_name === "MBC"){
        bridge_web3 = index.Web3Instances.mbc_bridge;
        private_key = index.Mbc_key
    } else {
        bridge_web3 = index.Web3Instances.agd_bridge;
        private_key = index.Agd_key
    }

    if (token === "NFT"){
        bridge_add = index.BridgeERC721Info.BridgeAddressERC721
    } else {
        bridge_add = index.BridgeERC20Info.BridgeAddressERC20
    }

    bridge_contract = await index.Contracts[bridge_name][token];
    
    // const Acc = await bridge_web3.eth.getAccounts();
    const Acc = await bridge_web3.eth.accounts.privateKeyToAccount(private_key);
    return ({bridge_web3, bridge_add, Acc, bridge_contract});
}


//lock, unlock, transfer_native: Called on Front-end.
//ERC20
//set_approvals, increase_approvals, decrease_approvals
//params of all 3: froms, tos, amounts, is_natives

//ERC721
//set_approval: to, uint256[] token_ids

const adminFunc = async(funcName, params, bridge_name, token) => {
    const {Acc, bridge_contract, bridge_add, bridge_web3} = await checkBridge(bridge_name, token);

    // await bridge_contract.methods[funcName](
    //     ...params
    // ).send({from: Acc[0], gas: '80000'})

    const encode_method = bridge_contract.methods[funcName](
        ...params
    ).encodeABI();
    const signed_raw = await Acc.signTransaction({
        to: bridge_add,
        gas: "8000000",
        data: encode_method
    });
    const raw_transaction = signed_raw.rawTransaction;
    const receipt = await bridge_web3.eth.sendSignedTransaction(raw_transaction);
    console.log(receipt)
}

module.exports = {adminFunc};

// const set_approval = async (bridge_name, token, froms, tos, amounts, is_natives) => {
//     const {Acc, bridge_contract} = await checkBridge(bridge_name, token);

//     console.log(Acc[0]);

//     await bridge_contract.methods
//     .set_approvals(froms, tos, amounts, is_natives)
//     .send({from: Acc[0], gas: '8000000'});
// }

// const increase_approval = async (bridge_name, token, froms, tos, amounts, is_natives) => {
//     const {Acc, bridge_contract} = await checkBridge(bridge_name, token);

//     await bridge_contract.methods
//     .increase_approvals(froms, tos, amounts, is_natives)
//     .send({from: Acc[0], gas: '8000000'});
// }

// const decrease_approval = async (bridge_name, token, froms, tos, amounts, is_natives) => {
//     const {Acc, bridge_contract} = await checkBridge(bridge_name, token);

//     await bridge_contract.methods
//     .decrease_approvals(froms, tos, amounts, is_natives)
//     .send({from: Acc[0], gas: '8000000'});
// }





// const test = async() => {
//     await console.log(await adminFunc("set_approvals", 
//     [["0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3"], ["0x2A17727eD9370E909a0665110ad1820158dcc1F6"], [1000], [false]],
//     "MBC", "FT"));
//     console.log("Successful");
// };
// test();

