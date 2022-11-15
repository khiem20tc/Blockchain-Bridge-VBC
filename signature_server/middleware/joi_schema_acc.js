const Joi = require('joi');

const joi_schema_login = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().required().min(7)
})

const joi_schema_register = joi_schema_login;

module.exports = {
    joi_schema_login,
    joi_schema_register
}