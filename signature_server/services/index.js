const { adminFunc } = require('./admin_operations');
const { registeredFunc } = require('./registered_operations');
const {login, register, validate_token, get_address} = require('./acc_operations');
const verify = require('./verify');
const getTokenURIS = require('./get_ERC721_uri');

module.exports = {
    adminFunc,
    registeredFunc,
    login,
    register,
    get_address,
    verify,
    validate_token,
    getTokenURIS,
    ...require('./ERC20_operations'),
    ...require('./ERC721_operations')
}