const template = require('./validate_inputs');
const {joi_schema_login, joi_schema_register} = require('./joi_schema_acc');

const validate_register = template(joi_schema_register);
const validate_login = template(joi_schema_login);

module.exports = {
    validate_register,
    validate_login
}