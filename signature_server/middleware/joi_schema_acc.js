const Joi = require('joi');

const joi_schema_login = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().required().min(7)
})

const joi_schema_register = joi_schema_login.keys({
    privateKey: Joi.string().required().pattern(new RegExp('^(0x)?[0-9|a-f|A-F]{64}$'))
})

module.exports = {
    joi_schema_login,
    joi_schema_register
}