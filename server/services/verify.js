const {Web3Instances, BridgeERC20Info, BridgeERC721Info} = require('../config/index');
const {mbc_bridge, agd_bridge} = Web3Instances;
const {BridgeAbiERC20} = BridgeERC20Info;
const {BridgeAbiERC721} = BridgeERC721Info;
const {NftRequests, FtRequests} = require('../model/index').requests;
const {getOneAndProcess} = require('../repositories/index');
const extract_event_abi = require('../utils/event_abi');

//transaction_data:
//ERC20: (from, to, is_native, amount, from_network, TxId)
//ERC721: (from, to, tokenIds, from_network, TxId)
const verify = async(TxId, from_network, is_NFT) => {
    
    let bridge;
    let BridgeAbi;
    let eventName;
    let model;
    let checks;

    if (from_network == "MBC"){
        bridge = mbc_bridge;
    } else {
        bridge = agd_bridge;
    }

    if (is_NFT == true){
        BridgeAbi = BridgeAbiERC721;
        eventName = "TransactMultiTokens";
        model = NftRequests;
        checks = ["from", "to", "is_native", "amount"];
    } else {
        BridgeAbi = BridgeAbiERC20;
        eventName = "TransactToken";
        model = FtRequests;
        checks = ["from", "to", "tokenIds"]
    }

    const {logs} = (await bridge.eth.getTransactionReceipt(TxId));
    const {topics} = logs[logs.length - 1];
    let log_info = await bridge.eth.abi.decodeLog(extract_event_abi(BridgeAbi, eventName), logs[logs.length - 1].data, topics);
    const request_info = await getOneAndProcess(model, {TxId});
    log_info["from"] = "0x" + topics[1].slice(-40).toLowerCase();
    log_info["to"] = "0x" + topics[2].slice(-40).toLowerCase();
    // console.log(log_info);
    // console.log(request_info);
    let valid = true;
    for (i = 0; i < checks.length; i++){
        if (log_info[checks[i]] != request_info[checks[i]]){
            valid = false;
            console.log(log_info[checks[i]]);
        }
    }
    return(valid);
}

// verify("0x29e2c1701cf8960041bd71b4aa0f43b13cd04cd2a52a35d5ce35d11a47c5c870", "MBC", true);
module.exports = verify;