const Joi = require('joi');

const joi_schema_adminFunc = Joi.object({
    bridge_name: Joi.string()
        .required()
        .valid("MBC", "AGD"),
    token: Joi.string()
        .required()
        .valid("FT", "NFT")
})

const joi_schema_registeredFunc = joi_schema_adminFunc.keys({
    private_key: Joi
        .string()
        .required()
        .pattern(new RegExp('^(0x)?[0-9|a-f|A-F]{40}$'))
})

module.exports = {
    joi_schema_adminFunc,
    joi_schema_registeredFunc
}