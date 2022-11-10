require('dotenv').config();
const config_consts = {
    BridgeERC20Info: require('./bridge_ERC20'),
    BridgeERC721Info: require('./bridge_ERC721'),
    ERC20Info: require('./ERC20_contract'),
    ERC721Info: require('./ERC721_contract'),
    UserAbiERC20: require('./user_abi_ERC20'),
    UserAbiERC721: require('./user_abi_ERC721'),
    Web3Instances: require('./web3'),
    Contracts: require('./contracts'),
    Mbc_key: process.env.MNEMONIC1,
    Agd_key: process.env.MNEMONIC2
}

module.exports = config_consts;