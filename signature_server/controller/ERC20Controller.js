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
    return (await getBalance(req.body));
    
})

const getRealBalanceController = template(async(req) => {
    return (await getRealBalance(req.body));
    
})

const getApprovedController = template(async(req) => {
    const approved = (await getApproved(req.body)).toString();
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