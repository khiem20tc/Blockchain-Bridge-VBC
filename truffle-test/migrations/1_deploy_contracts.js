const BridgeERC20 = artifacts.require("BridgeERC20");
const ERC20_v2 = artifacts.require("ERC20_v2");
const ERC721_v2 = artifacts.require("ERC721_v2");
const BridgeERC721 = artifacts.require("BridgeERC721_v3");


module.exports = function(deployer) {
  deployer.deploy(ERC20_v2, "Test", "Test", ["0x07575b4D2b2d403aC0E49e9Fc001B15779770049"]);
  deployer.deploy(BridgeERC20, ["0x07575b4D2b2d403aC0E49e9Fc001B15779770049"]); 
  deployer.deploy(ERC721_v2, "Test", "Test", ["0x07575b4D2b2d403aC0E49e9Fc001B15779770049"]);
  deployer.deploy(BridgeERC721, ["0x07575b4D2b2d403aC0E49e9Fc001B15779770049"]); 
};
