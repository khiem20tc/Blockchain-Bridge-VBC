const {Router} = require('express');
const {validate_lock_receive, validate_unlock_transfer, validate_get_balance} = require('../../middleware/index').ERC20_validate;
const {lockController, receiveNativeController, unlockController, transferNativeController, getBalanceController, getApprovedController, getRealBalanceController} = require('../../controller/ERC20Controller')

const ERC20_route = Router();
ERC20_route.post('/lock', validate_lock_receive, lockController);
ERC20_route.post('/receive_native', validate_lock_receive, receiveNativeController);
ERC20_route.post('/unlock', validate_unlock_transfer, unlockController);
ERC20_route.post('/transfer_native', validate_unlock_transfer, transferNativeController);
ERC20_route.post('/getBalance', validate_get_balance, getBalanceController);
ERC20_route.post('/getRealBalance', validate_get_balance, getRealBalanceController);
ERC20_route.post('/getApproved', getApprovedController);

module.exports = ERC20_route;