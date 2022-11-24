const assert = require("assert");
const { expect } = require("chai");
const BN = require("bn.js");

const ERC20_v2 = artifacts.require("ERC20_v2");

contract('ERC20_v2', (accounts) => {
  it('Admin could mint', async () => {
    const ERC20_Instance = await ERC20_v2.deployed();
    const start_balance = await ERC20_Instance.balanceOf.call(accounts[0]);
    await ERC20_Instance.mint("20000", {from: accounts[0]});
    const end_balance = await ERC20_Instance.balanceOf.call(accounts[0]);
    const is_valid = ((end_balance.sub(start_balance)).sub(new BN("20000"))).isZero();
    expect(is_valid).to.be.equal(true);
  });

  it('Others could not mint', async () => {
    try {
      const ERC20_Instance = await ERC20_v2.deployed();
      await ERC20_Instance.mint("20000", {from: accounts[1]});
      throw new Error("Non-admin could mint");
    } catch(e){
      expect(e.message).to.include('revert');
    }

  });

  it('Admin could change admin', async () => {
    const ERC20_Instance = await ERC20_v2.deployed();
    await ERC20_Instance.change_admins(accounts[1], true, {from: accounts[0]});
  });
});
