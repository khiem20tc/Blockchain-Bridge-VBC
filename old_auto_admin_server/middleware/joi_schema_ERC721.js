//ERC721
//lock_multiples(uint256[] memory tokenIds, address from_contract_add)
//unlock_multiples(uint256[] memory tokenIds, string[] memory tokenURIs, address to_contract_add)

//ADMIN:
//set_approval: to, uint256[] token_ids


const Joi = require('joi');
const {mbc_bridge} = require('../config/index').Web3Instances;

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
        tokenIds: Joi.array().items(
            Joi.number().required().min(0)
        )
})

const joi_schema_lock_multi = base.keys({
    to: user_address
})

const joi_schema_unlock_multi = base.keys({
    tokenURIs: Joi.array().items(
        Joi.string().required().min(1)
    ),
    from: user_address
})

const joi_schema_request_approval = Joi.object({
    from: user_address,
    to: user_address,
    isDeleted: Joi.number().valid(0),
    from_network: Joi.string().required().valid('MBC', 'AGD'),
    TxId: Joi.string().required().pattern(new RegExp('^(0x)?[0-9|a-f|A-F]{64}$')),
    tokenIds: Joi.array().items(Joi.number().required().min(0))
})

module.exports = {
    joi_schema_lock_multi,
    joi_schema_unlock_multi,
    joi_schema_request_approval
}