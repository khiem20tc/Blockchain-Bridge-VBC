//ERC20
//lock: (from_contract_add, amount) + need user's approval for BRIDGE_CONTRACT
//unlock: (from, to_contract_add, amount) + admin's approval
//transfer: (from, amount) + admin's approval

//ADMIN:
//set_approval, increase_approval, decrease_approval
//params of all 3: froms, tos, amounts, is_natives

const {mbc_bridge, agd_bridge} = require('../config/index').Web3Instances;
const Joi = require('joi');



const user_address = Joi.string()
    .required()
    .custom((value, helpers) => {
        if(mbc_bridge.utils.isAddress(value) != true){
            return helpers.error('any.invalid');
        }
    });

const base = Joi.object({
    username: Joi.string().required(),
    bridge_name: Joi.string().required().valid("MBC", "AGD"),
    amount: Joi.string().required().pattern(new RegExp('^[0-9]+$'))
})
const joi_schema_lock_receive = base.keys({
    to: user_address
})

const joi_schema_unlock_transfer = base.keys({
    from: user_address
})



const joi_schema_request_approval = Joi.object({
    from: user_address,
    to: user_address,
    amount: Joi.string().required().pattern(new RegExp('^[0-9]+$')),
    is_native: Joi.boolean().required(),
    from_network: Joi.string().required().valid('MBC', 'AGD'),
    isDeleted: Joi.number().valid(0),
    TxId: Joi.string().required().pattern(new RegExp('^(0x)?[0-9|a-f|A-F]{64}$'))
})

const joi_schema_get_balance = Joi.object({
    username: Joi.string().required(),
    account: user_address,
    bridge_name: Joi.string().required().valid('MBC', 'AGD')
})

module.exports = {
    joi_schema_lock_receive,
    joi_schema_unlock_transfer,
    joi_schema_request_approval,
    joi_schema_get_balance
}