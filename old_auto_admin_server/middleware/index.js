module.exports = {
    input: require('./validate_inputs'),
    acc: require('./validate_acc'),
    ERC20_schema: require('./joi_schema_ERC20'),
    ERC721_schema: require('./joi_schema_ERC721'),
    ERC20_validate: require('./validate_ERC20'),
    ERC721_validate: require('./validate_ERC721'),
    request_approval: require('./validate_requests'),
    FuncCall_schema: require('./joi_schema_func')
};