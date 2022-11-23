const BridgeERC20 = artifacts.require("BridgeERC20");
const ERC20_v2 = artifacts.require("ERC20_v2");


module.exports = function(deployer) {
  deployer.deploy(ERC20_v2, "Test", "Test", ["0x05c6FB739eBE6bDa5B2516bEBB9B0df53A2dc7e9"]);
  deployer.deploy(BridgeERC20, ["0x05c6FB739eBE6bDa5B2516bEBB9B0df53A2dc7e9"]);  
};
