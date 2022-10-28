const ERC20_request_approval_schema = require('./joi_schema_ERC20').joi_schema_request_approval;
const ERC721_request_approval_schema = require('./joi_schema_ERC721').joi_schema_request_approval;
const validate_input = require('./validate_inputs');

const ERC20_request_approval = validate_input(ERC20_request_approval_schema);
const ERC721_request_approval = validate_input(ERC721_request_approval_schema);

module.exports= {
    ERC20_request_approval,
    ERC721_request_approval
}
