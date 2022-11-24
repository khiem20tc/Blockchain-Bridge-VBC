const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");
const Web3 = require("web3");
const {ERC20_signer} = require('../../signature_server/services/admin_sign')

const web3 = new Web3("http://127.0.0.1:7545");

const BridgeERC20 = artifacts.require("BridgeERC20");

contract("BridgeERC20", (accounts) => {
    it("Send native token to contract", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, true));
        await BridgeERC20_Instance.receive_native(accounts[0], {from: accounts[0], value: "2000"});
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, true));
        const valid = ((initialTracking.sub(afterTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })

    it("Lock native token", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();

    })
})