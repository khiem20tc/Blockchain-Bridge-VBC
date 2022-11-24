const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");
const Web3 = require("web3");


const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const BridgeERC721 = artifacts.require("BridgeERC721_v3");
const ERC721_v2 = artifacts.require("ERC721_v2");
const test_admin_pk = "433b7aaddddedc342fa3d65897cace8b2d237484a78a00055187aa2ed79b0c6a";

const ERC721_single_signer = async({from, to, tokenId, accounts, mbc_key, mbc_contract}) => {

    const admin = web3.eth.accounts.privateKeyToAccount(mbc_key);

    const nonce = await mbc_contract.NumTransact.call(from, to, tokenId, false, {from: accounts[0]});
    const hash = web3.utils.soliditySha3({t: 'string', v: "unlock_multiples"}, 
    {t: 'address', v: from},
    {t: 'address', v: to},
    {t: 'uint256', v: tokenId},
    {t: 'uint256', v: nonce});
    const signature = (await admin.sign(hash)).signature;
    return(signature);
}

const ERC721_multiple_signer = async({from, to, tokenIds, accounts, mbc_key, mbc_contract}) => {
    let signatures = [];

    for (let i = 0; i < tokenIds.length; i++){
        let signature = await ERC721_single_signer({from, to, tokenId: tokenIds[i], accounts, mbc_key, mbc_contract});
        signatures.push(signature);
    }
    return(signatures);
}

const ERC721_lock = async(BridgeERC721_Instance, ERC721_Instance, accounts) => {
    await ERC721_Instance.mint(2000, "2000", {from: accounts[0]});
    await ERC721_Instance.mint(3000, "3000", {from: accounts[0]});
    await ERC721_Instance.setApprovalForAll(BridgeERC721_Instance.address, true, {from: accounts[0]});
    await BridgeERC721_Instance.lock_multiples([2000, 3000], ERC721_Instance.address, accounts[0], {from: accounts[0]});
}

const check_owner = async(BridgeERC721_Instance, ERC721_Instance, address) => {
    let owner = await ERC721_Instance.ownerOf.call(2000);
    expect(owner).to.be.equal(address);
    owner = await ERC721_Instance.ownerOf.call(3000);
    expect(owner).to.be.equal(address);
}

contract("BridgeERC721", (accounts) => {

    it("Lock ERC721 token", async() => {
        const BridgeERC721_Instance = await BridgeERC721.deployed();
        const ERC721_Instance = await ERC721_v2.deployed();
        
        await ERC721_lock(BridgeERC721_Instance, ERC721_Instance, accounts);
        await check_owner(BridgeERC721_Instance, ERC721_Instance, BridgeERC721_Instance.address);
    })



    it("Unlock ERC721 token", async() => {
        const BridgeERC721_Instance = await BridgeERC721.deployed();
        const ERC721_Instance = await ERC721_v2.deployed();
        const signatures = await ERC721_multiple_signer({from: accounts[0], to: accounts[0], tokenIds: [2000, 3000], mbc_key: test_admin_pk, mbc_contract: BridgeERC721_Instance, accounts});
        
        await BridgeERC721_Instance.unlock_multiples(accounts[0], [2000, 3000], ["2000", "3000"], ERC721_Instance.address, signatures, {from: accounts[0]});
        await check_owner(BridgeERC721_Instance, ERC721_Instance, accounts[0]);
    })    


})