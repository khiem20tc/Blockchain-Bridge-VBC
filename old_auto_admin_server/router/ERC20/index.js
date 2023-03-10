const {Router} = require('express');
const {validate_lock_receive, validate_unlock_transfer, validate_get_balance} = require('../../middleware/index').ERC20_validate;
const {lockController, receiveNativeController, unlockController, transferNativeController, getBalanceController} = require('../../controller/ERC20Controller')

const ERC20_route = Router();
ERC20_route.post('/lock', validate_lock_receive, lockController);
ERC20_route.post('/receive_native', validate_lock_receive, receiveNativeController);
ERC20_route.post('/unlock', validate_unlock_transfer, unlockController);
ERC20_route.post('/transfer_native', validate_unlock_transfer, transferNativeController);
ERC20_route.post('/getBalance', validate_get_balance, getBalanceController);

module.exports = ERC20_route;