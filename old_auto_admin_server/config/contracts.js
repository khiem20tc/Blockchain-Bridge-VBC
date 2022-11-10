const {BridgeAbiERC20, BridgeAddressERC20} = require('./bridge_ERC20');
const {BridgeAbiERC721, BridgeAddressERC721} = require('./bridge_ERC721');
const {mbc_bridge, agd_bridge} = require('./web3');

try{
    module.exports = {
        MBC: {
            FT: new mbc_bridge.eth.Contract(BridgeAbiERC20, BridgeAddressERC20),
            NFT: new mbc_bridge.eth.Contract(BridgeAbiERC721, BridgeAddressERC721)
        },
        AGD: {
            FT: new agd_bridge.eth.Contract(BridgeAbiERC20, BridgeAddressERC20),
            NFT: new agd_bridge.eth.Contract(BridgeAbiERC721, BridgeAddressERC721)
        }
    }
} catch(e){
    console.log(e);
}