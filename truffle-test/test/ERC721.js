const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");

const ERC721_v2 = artifacts.require("ERC721_v2");

contract('ERC721_v2', (accounts) => {
  it('Admin could mint', async () => {
    const ERC721_Instance = await ERC721_v2.deployed();
    try {
        let owner = await ERC721_Instance.ownerOf.call(2000);
        throw new Error("Token Id already exists");
    } catch(e) {
        expect(e.message).to.include("invalid token ID");
    }
    await ERC721_Instance.mint(2000, "20000", {from: accounts[0]});
    owner = await ERC721_Instance.ownerOf.call(2000);
    expect(owner).to.be.equal(accounts[0])
  });

  it('Others could not mint', async () => {
    try {
      const ERC721_Instance = await ERC721_v2.deployed();
      await ERC721_Instance.mint(2000, "20000", {from: accounts[1]});
      throw new Error("Non-admin could mint");
    } catch(e){
      expect(e.message).to.include('revert');
    }

  });

  it('Admin could change admin', async () => {
    const ERC721_Instance = await ERC721_v2.deployed();
    await ERC721_Instance.change_admins(accounts[1], true, {from: accounts[0]});
    let is_admin = await ERC721_Instance.admins.call(accounts[1]);
    expect(is_admin).to.be.equal(true);
  });
});
