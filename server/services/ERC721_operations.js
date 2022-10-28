const {registeredFunc} = require('./registered_operations');

const {AddressERC721} = require('../config/index').ERC721Info;

//ERC721
//lock_multiples(uint256[] memory tokenIds, address from_contract_add) + need user's approval
//unlock_multiples(uint256[] memory tokenIds, string[] memory tokenURIs, address to_contract_add)

//setApprovalForAll: (operator: address, approved: bool)
// UPDATE: Check isApprovedForAll => setApprovalForAll 

const lock_multiples = async({username, bridge_name, tokenIds, to}) => {
    return (await registeredFunc("lock_multiples", [tokenIds, AddressERC721, to], bridge_name, username, "NFT"));
}

const unlock_multiples = async({username, bridge_name, from, tokenIds, tokenURIs}) => {
    return (await registeredFunc("unlock_multiples", [from, tokenIds, tokenURIs, AddressERC721], bridge_name, username, "NFT"));
}



module.exports = {
    lock_multiples,
    unlock_multiples
}