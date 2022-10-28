require('dotenv').config();

const Web3 =  require('web3');
const crypto = require('crypto-js');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');
const index = require('../config/index');
const {getOne, create} = require('../repositories/index');
const {accounts, requests} =  require('../model/index');
const {FtRequests, NftRequests} = requests

//Further UPDATE:
//Tách phần connect vào network ra ngoài function bằng Web3.HTTPProvider + web3.eth.Contract
//Vào trong function, gọi methods qua contract_instance.methods
//Ký transaction qua web3.eth.accounts.signTransaction(tx, private key)
//Send signed transaction by web3.eth.sendSignedTransaction


async function checkBridge(bridge_name, private_key, token){
    let network;
    let bridge_contract;
    let bridge_add;
    let user_contract;
    
    if (bridge_name === "MBC"){
        network = process.env.MBC_LINK;
    } else {
        network = process.env.AGD_LINK;
    }

    console.log(network)
    let user_provider = await new HDWalletProvider(private_key, network);
    let nonceTracker = new NonceSubprovider();
    // user_provider.engine._providers.unshift(nonceTracker);
    // nonceTracker.setEngine(user_provider.engine);
    user_provider.engine._providers[1] = nonceTracker;
    const web3 = await new Web3(user_provider);
    

    if (token === "FT"){
        bridge_add = index.BridgeERC20Info.BridgeAddressERC20;
        bridge_contract = await new web3.eth.Contract(index.BridgeERC20Info.BridgeAbiERC20, bridge_add);
        user_contract = await new web3.eth.Contract(index.ERC20Info.AbiERC20, index.ERC20Info.AddressERC20);
    } else {
        bridge_add = index.BridgeERC721Info.BridgeAddressERC721;
        bridge_contract = await new web3.eth.Contract(index.BridgeERC721Info.BridgeAbiERC721, bridge_add);
        user_contract = await new web3.eth.Contract(index.ERC721Info.AbiERC721, index.ERC721Info.AddressERC721);
    }
    
    const Acc = await web3.eth.getAccounts();
    return ({Acc, bridge_contract, bridge_add, user_contract, web3, user_provider})
}

//ERC20
//lock: (from_contract_add, amount, to) + need user's approval for BRIDGE_CONTRACT
//unlock: (from, to_contract_add, amount) + admin's approval
//transfer_native: (from, amount) + admin's approval
//receive_native: (to) + with eth.

//allowance(owner: address, spender: address)
// Then, increaseAllowance(Bridge_Contract_add, addedValue)

//ERC721
//lock_multiples(uint256[] memory tokenIds, address from_contract_add) + need user's approval
//unlock_multiples(uint256[] memory tokenIds, string[] memory tokenURIs, address to_contract_add)

//setApprovalForAll: (operator: address, approved: bool)
// UPDATE: Check isApprovedForAll => setApprovalForAll 

const approveFunc = async(web3, user_contract, sender_add, bridge_add, token, amount = 0) => {
    if (token === "FT"){
        const allowance = await user_contract.methods.allowance(sender_add, bridge_add).call({from: sender_add});
        console.log(allowance);
        if (allowance == 0){
            await user_contract.methods.approve(bridge_add, amount).send({from: sender_add, gas: '8000000'});
        } else {
            if (!web3.utils.toBN(amount).sub(web3.utils.toBN(allowance)).isNeg()){
                await user_contract.methods.increaseAllowance(bridge_add, web3.utils.toBN(amount).sub(web3.utils.toBN(allowance))).send({from: sender_add, gas: '8000000'});
            }
        }
    } else {
        await user_contract.methods.setApprovalForAll(bridge_add, true).send({from: sender_add, gas: '8000000'});
    }
}

const registeredFunc = async(funcName, params, bridge_name, username, token, value = 0) => {
    const private_key = (crypto.AES.decrypt((await getOne(accounts, {username})).privateKey, process.env.SYS_SECRET_KEY)).toString(crypto.enc.Utf8);

    console.log(private_key);
    let {Acc, bridge_contract, bridge_add, user_contract, web3, user_provider} = await checkBridge(bridge_name, private_key, token);
    if (funcName === "balanceOf"){
        const balance = await user_contract.methods.balanceOf(params[0]).call({from: Acc[0], gas: '8000000'});
        return balance
    }
    if (funcName === "lock" || funcName == "lock_multiples"){
        await approveFunc(web3, user_contract, Acc[0], bridge_add, token, params[1]);
    } 
    console.log(Acc);
    
    const receipt = await bridge_contract.methods[funcName](
        ...params
    ).send({from: Acc[0], value: value, gas: '8000000'});
    
    const {events} = receipt;
    if (token == "FT"){
        const {returnValues} = events.TransactToken
        if (returnValues.is_lock){
            const {from, to, amount, is_native} = returnValues;
            await create(FtRequests, {
                from,
                to,
                amount,
                is_native,
                from_network: bridge_name,
                isDeleted: 0,
                TxId: events.TransactToken.transactionHash
            })
        }
    } else {
        const {returnValues} = events.TransactMultiTokens
        if (returnValues.is_lock){
            const {from, to, tokenIds} = returnValues;
            await create(NftRequests, {
                from,
                to,
                tokenIds,
                from_network: bridge_name,
                isDeleted: 0,
                TxId: events.TransactMultiTokens.transactionHash
            })
        }
    }
    console.log("Before", web3.eth.currentProvider);
    await user_provider.engine.stop();
    console.log(web3.eth.currentProvider);
    return(receipt)
}


module.exports = {registeredFunc}



// const test = async() => {
//     await console.log(await registeredFunc("lock", 
//     ["0x3838244F1821ADABab334d9503642c82F563F56e", 900],
//     "MBC", "ff5ba956416cf66aefa04ecec5f87374da5a3ab70b887d39717e3fae8b7dbdb5", "FT"));
//     console.log("Successful");
// };
// test();

// module.exports = {registeredFunc};

// //user = sender
// const lock =  async (bridge_name, private_key, token, user_contract, amount) => {

//         const {bridge_contract, Acc} = await checkBridge(bridge_name, private_key, token);

//         await bridge_contract.methods
//         .lock(user_contract, amount)
//         .send({from: Acc[0], gas: '8000000'});

// };



// //user = receiver
// const unlock =  async (bridge_name, private_key, token, token, from, user_contract, amount) => {
    
//         const {bridge_contract, Acc} = await checkBridge(bridge_name, private_key, token);

//         await bridge_contract.methods
//         .unlock(from, user_contract, amount)
//         .send({from: Acc[0], gas: "8000000"});

// }


// //user = receiver
// const transfer =  async (bridge_name, private_key, token, from, amount) => {

//         const {bridge_contract, Acc} = await checkBridge(bridge_name, private_key, token);       

//         await bridge_contract.methods
//         .transfer_native(from, amount)
//         .send({from: Acc[0], gas: "8000000"});
// }