const {joi_schema_lock_multi, joi_schema_unlock_multi} = require('./joi_schema_ERC721');
const validate_input = require('./validate_inputs');


const validate_lock_multi = validate_input(joi_schema_lock_multi);
const validate_unlock_multi = validate_input(joi_schema_unlock_multi);

module.exports = {
    validate_lock_multi,
    validate_unlock_multi
}