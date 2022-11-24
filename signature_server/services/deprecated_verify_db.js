// //FOR DB APPROACH: ISSUE WITH ERC721

// // //require('dotenv').config();
// // const _ = require('lodash');


// // require('../model/db');

// const {Web3Instances, BridgeERC20Info, BridgeERC721Info} = require('../config/index');
// const {MBC, AGD} = require('../config/index').Contracts;
// const {mbc_bridge, agd_bridge} = Web3Instances;
// const {BridgeAbiERC20} = BridgeERC20Info;
// const {BridgeAbiERC721} = BridgeERC721Info;
// const {NewFtRequests, NewNftRequests} = require('../model/index').requests;
// const {getOne} = require('../repositories/index');
// const extract_event_abi = require('../utils/event_abi');

// //transaction_data:
// //ERC20: (from, to, is_native, amount, from_network, TxId)
// //ERC721: (from, to, tokenIds, from_network, TxId)
// //Rename deposit_withdraw_obj attributes

// const verify_arr = async(is_NFT, is_lock, deposit_withdraw_obj) => {
    
//     // console.log("DEPOSIT OBJ:");
//     // console.log(deposit_withdraw_obj);
//     const {TxIds, from_networks} = deposit_withdraw_obj;
    
//     let bridge;
//     let BridgeAbi;
//     let eventName;
//     let checks;
//     let nft_count = {
//         "MBC": 0,
//         "AGD": 0
//     };
//     let ft_count = {
//         "is_native": {
//             "MBC": 0,
//             "AGD": 0
//         },
//         "not_is_native": {
//             "MBC": 0,
//             "AGD": 0
//         }
//     };
//     let db_count;
    

//     const {from, to} = deposit_withdraw_obj;

//     if (is_NFT == true){
//         BridgeAbi = BridgeAbiERC721;
//         eventName = "TransactMultiTokens";
//         contract_add = process.env.BRIDGE_ERC721_ADDRESS;
//         checks = ["from", "to"];
//         nft_count["MBC"] = parseInt(await MBC["NFT"].methods.Nonces(from, to, is_lock).call({from: process.env.MBC_ADMIN}));
//         nft_count["AGD"] = parseInt(await AGD["NFT"].methods.Nonces(from, to, is_lock).call({from: process.env.AGD_ADMIN}));
//         db_count = {
//             "MBC": 0,
//             "AGD": 0
//         };
//         if (TxIds.length === 0){
//             if (nft_count["MBC"] + nft_count["AGD"] == 0){
//                 return(true)
//             } else {
//                 return(false)
//             }
//         };
//     } else {
//         BridgeAbi = BridgeAbiERC20;
//         eventName = "TransactToken";
//         contract_add = process.env.BRIDGE_ERC20_ADDRESS;
//         checks = ["from", "to", "is_native", "amount"];
//         ft_count["is_native"]["MBC"] = parseInt(await MBC["FT"].methods.Nonces(from, to, true, is_lock).call({from: process.env.MBC_ADMIN}));
//         ft_count["not_is_native"]["MBC"] = parseInt(await MBC["FT"].methods.Nonces(from, to, false, is_lock).call({from: process.env.MBC_ADMIN}));
//         ft_count["is_native"]["AGD"] = paseInt(await AGD["FT"].methods.Nonces(from, to, true, is_lock).call({from: process.env.AGD_ADMIN}));
//         ft_count["not_is_native"]["AGD"] = parseInt(await AGD["FT"].methods.Nonces(from, to, false, is_lock).call({from: process.env.AGD_ADMIN}));
//         db_count = {
//             "is_native": {
//                 "MBC": 0,
//                 "AGD": 0
//             },
//             "not_is_native": {
//                 "MBC": 0,
//                 "AGD": 0
//             }
//         };
//         if (TxIds.length === 0){
//             if (ft_count["is_native"]["AGD"] + ft_count["is_native"]["MBC"] + ft_count["not_is_native"]["MBC"] + ft_count["not_is_native"]["AGD"] == 0){
//                 return(true)
//             } else {
//                 return(false)
//             }
//         };
//     }

//     // console.log("FT NONCES");
//     // console.log(ft_count);
//     // console.log("NFT NONCES");
//     // console.log(nft_count);
    

//     for (let i = 0; i < TxIds.length; i++){
//         if (from_networks[i] == "MBC"){
//             bridge = mbc_bridge;
//         } else {
//             bridge = agd_bridge;
//         }

//         const receipt = (await bridge.eth.getTransactionReceipt(TxIds[i]));
//         const {to, logs}  = receipt;
//         // console.log("RECEIPT");
//         // console.log(receipt);
//         // console.log(to.toLowerCase());
//         // console.log(contract_add.toLowerCase());
//         if (to.toLowerCase() != contract_add.toLowerCase()){
//             return(false)
//         }
//         const {topics} = logs[logs.length - 1];
//         let log_info = await bridge.eth.abi.decodeLog(extract_event_abi(BridgeAbi, eventName), logs[logs.length - 1].data, topics);
//         console.log("LOG INFO:", log_info);
//         log_info["from"] = "0x" + topics[1].slice(-40).toLowerCase();
//         log_info["to"] = "0x" + topics[2].slice(-40).toLowerCase();
//         if (is_NFT !== true){
//             log_info["amount"] = bridge.utils.toBN(topics[3]).toString();
//             if (deposit_withdraw_obj["is_native"][i] == true){
//                 db_count["is_native"][from_networks[i]] += 1
//             } else {
//                 db_count["not_is_native"][from_networks[i]] += 1
//             }
//         } else { 
//             let tokenIds = log_info["tokenIds"];
//             for (let y = 0; y < tokenIds.length; y ++){
//                 if (!deposit_withdraw_obj["tokenIds"].includes(tokenIds[y])){
//                     return(false);
//                 }
//             }
//             db_count[from_networks[i]] += 1;
//         }
//         console.log("LOG INFO:", log_info);
//         for (let x = 0; x < checks.length; x++){
//             console.log(checks[x]);
//             if (checks[x] != "from" && checks[x] != "to"){
//                 if (log_info[checks[x]] != deposit_withdraw_obj[checks[x]][i]){
//                     // console.log("INVALID");
//                     // console.log(log_info[checks[x]]);
//                     // console.log(deposit_withdraw_obj[checks[x]][i]);
//                     return(false);
//                 }
//             } else {
//                 if (log_info[checks[x]] != deposit_withdraw_obj[checks[x]]){
//                     // console.log("INVALID");
//                     // console.log(log_info[checks[x]]);
//                     // console.log(deposit_withdraw_obj[checks[x]]);
//                     return(false);
//                 }
//             }
            
//         }
//     }

    

//     // console.log("COUNTS")
//     // console.log(db_count);
//     // console.log(ft_count);
//     // console.log(nft_count);
//     if (is_NFT === false){
//         if (!_.isEqual(db_count, ft_count)){
//             return(false)
//         }
//     } else {
//         if (!_.isEqual(db_count, nft_count)){
//             return(false)
//         }
//     }
//     return(true)
// }

// const verify_FT_request = async(from, to) => {
//     from = from.toLowerCase();
//     to = to.toLowerCase();
//     const entry = await getOne(NewFtRequests, {from, to});
//     const {deposit_amounts, deposit_from_networks, deposit_TxIds, deposit_is_native, 
//         withdraw_amounts, withdraw_from_networks, withdraw_TxIds, withdraw_is_native} = entry;
//     const deposit_check = await verify_arr(false, true, {
//         from,
//         to,
//         TxIds: deposit_TxIds,
//         from_networks: deposit_from_networks,
//         amount: deposit_amounts,
//         is_native: deposit_is_native
//     });
//     const withdraw_check = await verify_arr(false, false, {
//         from,
//         to,
//         TxIds: withdraw_TxIds,
//         from_networks: withdraw_from_networks,
//         amount: withdraw_amounts,
//         is_native: withdraw_is_native
//     });
//     return(deposit_check && withdraw_check)
// }

// const check_remaining = async(from, to, amount, is_native, to_network) => {
//     from = from.toLowerCase();
//     to = to.toLowerCase();
//     let from_network;
//     if (to_network == "MBC"){
//         from_network = "AGD";
//     } else {
//         from_network = "MBC"
//     }
//     const entry = await getOne(NewFtRequests, {from, to});
//     const {deposit_amounts, deposit_from_networks, deposit_is_native, 
//         withdraw_amounts, withdraw_from_networks, withdraw_is_native} = entry;
//     const remainder = sum_str_arr(from_network, is_native, deposit_amounts, deposit_from_networks, deposit_is_native) 
//     - sum_str_arr(to_network, !is_native, withdraw_amounts, withdraw_from_networks, withdraw_is_native);
//     if (remainder < amount){
//         return(false)
//     }
//     return(true)
// }

// const verify_NFT_request = async(from, to) => {
//     from = from.toLowerCase();
//     to = to.toLowerCase();
//     const entry = await getOne(NewNftRequests, {from, to});
//     const {deposit_from_networks, deposit_TxIds, deposit_tokenIds, 
//         withdraw_from_networks, withdraw_TxIds, withdraw_tokenIds} = entry;
//     const deposit_check = await verify_arr(true, true, {
//         from,
//         to,
//         TxIds: deposit_TxIds,
//         from_networks: deposit_from_networks,
//         tokenIds: deposit_tokenIds
//     });
//     const withdraw_check = await verify_arr(true, false, {
//         from,
//         to,
//         TxIds: withdraw_TxIds,
//         from_networks: withdraw_from_networks,
//         tokenIds: withdraw_tokenIds
//     });
//     // console.log("DEPOSIT:", deposit_check);
//     // console.log("WITHDRAW:", withdraw_check);
//     return(deposit_check && withdraw_check)
// }

// const check_locked_token = async(from, to, tokenId, to_network) => {
//     from = from.toLowerCase();
//     to = to.toLowerCase();
//     let from_network;
//     if (to_network == "MBC"){
//         from_network = "AGD";
//     } else {
//         from_network = "MBC"
//     };
//     const entry = await getOne(NewNftRequests, {from, to});
//     const {deposit_from_networks, deposit_tokenIds, 
//         withdraw_from_networks, withdraw_tokenIds} = entry;
//     let num_deposit;
//     let num_withdraw;
//     for (let i = 0; i < deposit_tokenIds.length; i ++){
//         if (tokenId == deposit_tokenIds[i] && deposit_from_networks[i] == from_network){
//             num_deposit += 1;
//         }
//     };
//     for (let i = 0; i < withdraw_tokenIds.length; i ++){
//         if (tokenId == withdraw_tokenIds[i] && withdraw_from_networks[i] == from_network){
//             num_withdraw += 1;
//         }
//     };
//     if (num_deposit > num_withdraw){
//         return(true)
//     }
//     return(false)
// }

// const check_locked_tokens = async(from, to, tokenIds, to_network) => {
//     for (let i = 0; i < tokenIds.length; i++){
//         const valid = await check_locked_token(from, to, tokenIds[i], to_network);
//         if (valid == false){
//             return(false)
//         }
//     }
//     return(true)
// }

// // check = async() => {
// //     try {
// //         const valid = await verify_NFT_request("0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758", "0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758");
// //         console.log(valid);
// //     }
// //     catch(e){
// //         console.log(e);
// //     }
// // }

// // check();

// module.exports = {
//     verify_FT_request,
//     verify_NFT_request,
//     check_remaining,
//     check_locked_tokens
// };


// // const verify = async(TxId, from_network, is_NFT) => {
    
// //     let bridge;
// //     let BridgeAbi;
// //     let eventName;
// //     let model;
// //     let checks;

// //     if (from_network == "MBC"){
// //         bridge = mbc_bridge;
// //     } else {
// //         bridge = agd_bridge;
// //     }

// //     if (is_NFT == true){
// //         BridgeAbi = BridgeAbiERC721;
// //         eventName = "TransactMultiTokens";
// //         model = NftRequests;
// //         contract_add = process.env.BRIDGE_ERC20_ADDRESS;
// //         checks = ["from", "to", "is_native", "amount"];
// //     } else {
// //         BridgeAbi = BridgeAbiERC20;
// //         eventName = "TransactToken";
// //         model = FtRequests;
// //         contract_add = process.env.BRIDGE_ERC721_ADDRESS;
// //         checks = ["from", "to", "tokenIds"]
// //     }

// //     const {to, logs} = (await bridge.eth.getTransactionReceipt(TxId));
// //     const {topics} = logs[logs.length - 1];
// //     let log_info = await bridge.eth.abi.decodeLog(extract_event_abi(BridgeAbi, eventName), logs[logs.length - 1].data, topics);
// //     const request_info = await getOne(model, {TxId});
// //     log_info["from"] = "0x" + topics[1].slice(-40).toLowerCase();
// //     log_info["to"] = "0x" + topics[2].slice(-40).toLowerCase();
// //     // console.log(log_info);
// //     // console.log(request_info);
// //     let valid = true;
// //     for (i = 0; i < checks.length; i++){
// //         if (log_info[checks[i]] != request_info[checks[i]]){
// //             valid = false;
// //             console.log(log_info[checks[i]]);
// //         }
// //     }
// //     return(valid);
// // }