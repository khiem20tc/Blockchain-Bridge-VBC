const {registeredFunc} = require('./registered_operations');

const {AddressERC20} = require('../config/index').ERC20Info;

//ERC20
//lock: (from_contract_add, amount) + need user's approval for BRIDGE_CONTRACT
//unlock: (from, to_contract_add, amount) + admin's approval
//transfer_native: (from, amount) + admin's approval
//receive_native: () + with eth.

//allowance(owner: address, spender: address)
// Then, increaseAllowance(Bridge_Contract_add, addedValue)

const lock = async({username, bridge_name, amount, to}) => {
    return(await registeredFunc("lock", false, [AddressERC20, amount, to], bridge_name, username, "FT"));
}

const receive_native = async({username, bridge_name, amount, to}) => {
    return (await registeredFunc("receive_native", false, [to], bridge_name, username, "FT", amount));
}

const unlock = async({username, bridge_name, from, amount}) => {
    return (await registeredFunc("unlock", true, [from, AddressERC20, amount], bridge_name, username, "FT"));
}

const transfer_native = async({username, bridge_name, from, amount}) => {
    return (await registeredFunc("transfer_native", true, [from, amount], bridge_name, username, "FT"));
    
}

// const getBalance = async({username, bridge_name, account}) => {
//     return(await registeredFunc("balanceOf", false, [account], bridge_name, username, "FT"));
// }

module.exports = {
    lock,
    receive_native,
    unlock,
    transfer_native,
    // getBalance
}