const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");
const Web3 = require("web3");
const { Mbc_key } = require("../../signature_server/config");


const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const BridgeERC20 = artifacts.require("BridgeERC20");
const ERC20_v2 = artifacts.require("ERC20_v2");
const test_admin_pk = "433b7aaddddedc342fa3d65897cace8b2d237484a78a00055187aa2ed79b0c6a";

const ERC20_signer = async({from, to, amount, is_native, mbc_key, mbc_contract, accounts}) => {

    if (is_native){
        method_name = "transfer_native"
    } else {
        method_name = "unlock"
    }

    const admin = web3.eth.accounts.privateKeyToAccount(mbc_key);

    const nonce = await mbc_contract.TrackingAmounts.call(from, to, is_native, false, {from: accounts[0]});
    const hash = web3.utils.soliditySha3({t: 'string', v: method_name}, 
    {t: 'address', v: from},
    {t: 'address', v: to},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce});
    const signature = (await admin.sign(hash)).signature;
    return(signature);
}

const ERC20_lock = async(BridgeERC20_Instance, ERC20_Instance, accounts) => {
    await ERC20_Instance.mint("2000", {from: accounts[0]});
    await ERC20_Instance.approve(BridgeERC20_Instance.address, "2000", {from: accounts[0]});
    await BridgeERC20_Instance.lock(ERC20_Instance.address, "2000", accounts[0], {from: accounts[0]});
}

contract("BridgeERC20", (accounts) => {
    it("Send native token to contract", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, true));
        await BridgeERC20_Instance.receive_native(accounts[0], {from: accounts[0], value: "2000"});
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, true));
        const valid = ((afterTracking.sub(initialTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })

    it("Lock ERC20 token", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const ERC20_Instance = await ERC20_v2.deployed();
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, true));
        await ERC20_lock(BridgeERC20_Instance, ERC20_Instance, accounts);
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, true));
        const valid = ((afterTracking.sub(initialTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })

    it("Unlock ERC20 token", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const ERC20_Instance = await ERC20_v2.deployed();
        //Lock:
        await ERC20_lock(BridgeERC20_Instance, ERC20_Instance, accounts);
        const signature = await ERC20_signer({from: accounts[0], to: accounts[0], amount: "2000", is_native: false, mbc_key: test_admin_pk, mbc_contract: BridgeERC20_Instance, accounts});
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, false));
        await BridgeERC20_Instance.unlock(accounts[0], ERC20_Instance.address, "2000", signature, {from: accounts[0]});
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, false));
        const valid = ((afterTracking.sub(initialTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })

    it("Unlock ERC20 token", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        const ERC20_Instance = await ERC20_v2.deployed();
        //Lock:
        await ERC20_lock(BridgeERC20_Instance, ERC20_Instance, accounts);
        const signature = await ERC20_signer({from: accounts[0], to: accounts[0], amount: "2000", is_native: false, mbc_key: test_admin_pk, mbc_contract: BridgeERC20_Instance, accounts});
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, false));
        await BridgeERC20_Instance.unlock(accounts[0], ERC20_Instance.address, "2000", signature, {from: accounts[0]});
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], false, false));
        const valid = ((afterTracking.sub(initialTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })

    it("Unlock native", async() => {
        const BridgeERC20_Instance = await BridgeERC20.deployed();
        //Lock
        await BridgeERC20_Instance.receive_native(accounts[0], {from: accounts[0], value: "2000"});
        const signature = await ERC20_signer({from: accounts[0], to: accounts[0], amount: "2000", is_native: true, mbc_key: test_admin_pk, mbc_contract: BridgeERC20_Instance, accounts});
        const initialTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, false));
        await BridgeERC20_Instance.transfer_native(accounts[0], "2000", signature, {from: accounts[0]});
        const afterTracking = new BN(await BridgeERC20_Instance.TrackingAmounts.call(accounts[0], accounts[0], true, false));
        const valid = ((afterTracking.sub(initialTracking)).sub(new BN("2000"))).isZero();
        expect(valid).to.be.equal(true);
    })
})