const template = require('./template');
const {mbc_bridge} = require('../config/index').Web3Instances;
const {lock, unlock, receive_native, transfer_native} = require('../services/index');
const {getApproved} = require('../services/verify');
const {getBalance, getRealBalance} = require('../services/get_balance')

const lockController = template(async(req) => {
    return (await lock(req.body));
    
})

const unlockController = template(async(req) => {
    return (await unlock(req.body));
    
})


const receiveNativeController = template(async(req) => {
    return (await receive_native(req.body));
    
})


const transferNativeController = template(async(req) => {
    return (await transfer_native(req.body));
    
})

const getBalanceController = template(async(req) => {
    return (await getBalance({
        address: req.query.address,
        bridge_name: req.query.bridge_name
    }));
    
})

const getRealBalanceController = template(async(req) => {
    return (await getRealBalance({
        address: req.query.address,
        bridge_name: req.query.bridge_name
    }));
    
})

const getApprovedController = template(async(req) => {
    const approved = (await getApproved({
        from: req.query.from,
        to: req.query.to,
        is_native: (req.query.is_native == "true"),
        to_network: req.query.to_network
    })).toString();
    const approved_eth = await mbc_bridge.utils.fromWei(approved, 'ether');
    return(approved_eth);
})


module.exports = {
    lockController,
    unlockController,
    transferNativeController,
    receiveNativeController,
    getBalanceController,
    getRealBalanceController,
    getApprovedController
}