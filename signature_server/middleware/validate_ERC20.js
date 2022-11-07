const {joi_schema_lock_receive, joi_schema_unlock_transfer, joi_schema_get_balance} = require('./joi_schema_ERC20');
const validate_input = require('./validate_inputs');


const validate_lock_receive = validate_input(joi_schema_lock_receive);
const validate_unlock_transfer = validate_input(joi_schema_unlock_transfer);
const validate_get_balance = validate_input(joi_schema_get_balance);

module.exports = {
    validate_lock_receive,
    validate_unlock_transfer,
    validate_get_balance
}