require('dotenv').config();

const {Web3Instances, BridgeERC20Info, BridgeERC721Info} = require('../config/index');
const {mbc_bridge, agd_bridge} = Web3Instances;
const {BridgeAbiERC20} = BridgeERC20Info;
const {BridgeAbiERC721} = BridgeERC721Info;
const {NewFtRequests, NewNftRequests} = require('../model/index').requests;
const {getOne} = require('../repositories/index');
const extract_event_abi = require('../utils/event_abi');

//transaction_data:
//ERC20: (from, to, is_native, amount, from_network, TxId)
//ERC721: (from, to, tokenIds, from_network, TxId)
const verify_arr = async(is_NFT, deposit_withdraw_obj) => {
    
    let bridge;
    let BridgeAbi;
    let eventName;
    let checks;

    if (is_NFT == true){
        BridgeAbi = BridgeAbiERC721;
        eventName = "TransactMultiTokens";
        contract_add = process.env.BRIDGE_ERC20_ADDRESS;
        checks = ["from", "to"];
    } else {
        BridgeAbi = BridgeAbiERC20;
        eventName = "TransactToken";
        contract_add = process.env.BRIDGE_ERC721_ADDRESS;
        checks = ["from", "to", "is_native", "amount"];
    }

    const {TxIds, from_networks} = deposit_withdraw_obj;

    for (let i = 0; i < TxIds.length; i++){
        if (from_networks[i] == "MBC"){
            bridge = mbc_bridge;
        } else {
            bridge = agd_bridge;
        }

        const {to, logs} = (await bridge.eth.getTransactionReceipt(TxIds[i]));
        if (to != contract_add){
            return(false)
        }
        const {topics} = logs[logs.length - 1];
        let log_info = await bridge.eth.abi.decodeLog(extract_event_abi(BridgeAbi, eventName), logs[logs.length - 1].data, topics);
        
        log_info["from"] = "0x" + topics[1].slice(-40).toLowerCase();
        log_info["to"] = "0x" + topics[2].slice(-40).toLowerCase();
        if (is_NFT !== true){
            log_info["amount"] = bridge.utils.toBN(topics[3]).toString();
        } else { 
            let tokenIds = log_info["tokenIds"];
            for (let y = 0; y < tokenIds.length; i ++){
                if (!deposit_withdraw_obj["tokenIds"].includes(tokenIds[y])){
                    return(false);
                }
            }
        }
        
        for (let x = 0; x < checks.length; x++){
            if (log_info[checks[x]] != deposit_withdraw_obj[checks[x]][i]){
                console.log(log_info[checks[i]]);
                return(false);
            }
        }
    }
    return(true)
}

const verify_FT_request = async(from, to) => {
    const entry = await getOne()
}

// verify("0x29e2c1701cf8960041bd71b4aa0f43b13cd04cd2a52a35d5ce35d11a47c5c870", "MBC", true);
module.exports = verify;


// const verify = async(TxId, from_network, is_NFT) => {
    
//     let bridge;
//     let BridgeAbi;
//     let eventName;
//     let model;
//     let checks;

//     if (from_network == "MBC"){
//         bridge = mbc_bridge;
//     } else {
//         bridge = agd_bridge;
//     }

//     if (is_NFT == true){
//         BridgeAbi = BridgeAbiERC721;
//         eventName = "TransactMultiTokens";
//         model = NftRequests;
//         contract_add = process.env.BRIDGE_ERC20_ADDRESS;
//         checks = ["from", "to", "is_native", "amount"];
//     } else {
//         BridgeAbi = BridgeAbiERC20;
//         eventName = "TransactToken";
//         model = FtRequests;
//         contract_add = process.env.BRIDGE_ERC721_ADDRESS;
//         checks = ["from", "to", "tokenIds"]
//     }

//     const {to, logs} = (await bridge.eth.getTransactionReceipt(TxId));
//     const {topics} = logs[logs.length - 1];
//     let log_info = await bridge.eth.abi.decodeLog(extract_event_abi(BridgeAbi, eventName), logs[logs.length - 1].data, topics);
//     const request_info = await getOne(model, {TxId});
//     log_info["from"] = "0x" + topics[1].slice(-40).toLowerCase();
//     log_info["to"] = "0x" + topics[2].slice(-40).toLowerCase();
//     // console.log(log_info);
//     // console.log(request_info);
//     let valid = true;
//     for (i = 0; i < checks.length; i++){
//         if (log_info[checks[i]] != request_info[checks[i]]){
//             valid = false;
//             console.log(log_info[checks[i]]);
//         }
//     }
//     return(valid);
// }