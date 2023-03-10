// Generated by Selenium IDE
const { Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {LockToken, UnlockToken} = require('./common');

let opts = new chrome.Options();

const {Login} = require("../utils/index");

describe('ERC721', function() {
  this.timeout(100000)
  let driver
  let vars
  before(async function() {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(opts.headless()).build()
    vars = {}
  })
  after(async function() {
    await driver.quit();
  })

  //NORMAL & ABNORMAL CASES
  //token, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id
  // it('Abnormal: Lock ERC721 1st time for wrong address', async function() {
  //   await LockToken("Error!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d9", driver, null, Login, null, null, null, "MBC", "70");
  // })

  // it('Abnormal: Lock ERC721 token 1st time for wrong id', async function() {
  //   await LockToken("Error!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "MBC", "1234567");
  // })
  
  // it('Normal: Lock ERC721 token 1st time', async function() {
  //   await LockToken("Success!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "MBC", "70");
  // })

  it('Abnormal: Unlock ERC721 1st time for wrong address', async function() {
    await UnlockToken("Error!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d9", driver, null, Login, null, null, null, "AGD", "70");
  })

  it('Abnormal: Unlock ERC721 1st time for wrong amount', async function() {
    await UnlockToken("Error!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "AGD", "1234567");
  })

  it('Normal: Unlock ERC721 1st time', async function() {
    await UnlockToken("Success!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "AGD", "70");
  })

  it('Normal: Lock ERC721 1st time from other side', async function() {
    await LockToken("Success!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "AGD", "70");
  })
  
  it('Normal: Unlock ERC721 token 1st time from other side', async function() {
    await UnlockToken("Success!", "ERC721", "0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8", driver, null, Login, null, null, null, "MBC",  "70");
  })
})
