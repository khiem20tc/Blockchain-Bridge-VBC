const {login, register, validate_token, get_address} = require('../services/index');
const template = require('./template');

const registerController = template(async(req) => {
    await register(req.body);
    return true;
})

const loginController = template(async(req) => {
    const token = await login(req.body);
    return token;
})

const validateTokenController = template(async(req) => {
    const valid = await validate_token(req.body.token);
    return valid
})

const getAddressController = template(async(req) => {
    const address = get_address(req.body);
    return address
})

module.exports = {
    loginController,
    registerController,
    validateTokenController,
    getAddressController
}