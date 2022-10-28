const { adminFunc } = require('./admin_operations');
const { registeredFunc } = require('./registered_operations');
const {login, register, validate_token} = require('./acc_operations');
const verify = require('./verify');

module.exports = {
    adminFunc,
    registeredFunc,
    login,
    register,
    verify,
    validate_token,
    ...require('./ERC20_operations'),
    ...require('./ERC721_operations')
}