const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");
const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const BridgeERC20 = artifacts.require("BridgeERC20");

contract("BridgeERC20", (accounts) => {
    it("Send native token to contract", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const Initial_Tracking = "";
    })
})