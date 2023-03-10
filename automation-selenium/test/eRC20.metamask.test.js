// Generated by Selenium IDE
const { Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {LockToken, LockNative, UnlockToken, UnlockNative} = require('./common');
const {ConfirmMetamask, ConnectMetamask, SwitchNetwork, RegisterMetamask} = require("../utils/index");

const metamask_path = "C:/Users/admin/AppData/Local/Google/Chrome/User Data/Profile 3/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/10.23.0_0.crx";
// const profile_path = "C:\\Users\\admin\\AppData\\Local\\Google\\Chrome\\User Data";
let opts = new chrome.Options();
opts.addExtensions(metamask_path);

//Config for importing profile: Profile requires Headless to function, but Headless does not support extension
// opts.addArguments("--no-sandbox");
// opts.addArguments("--disable-dev-shm-usage");
// opts.addArguments("--user-data-dir=" + profile_path);
// opts.addArguments("--profile-directory=Profile 3");
// opts.setChromeBinaryPath("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");
// opts.headless();
// opts.windowSize({width: 2000, height: 1000});
// opts.addArguments('--ignore-certificate-errors');
// opts.addArguments('--allow-running-insecure-content');
// user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
// opts.addArguments('user-agent={' + user_agent + '}');

describe('ERC20', function() {
  this.timeout(100000)
  let handle
  let driver
  let vars
  before(async function() {
    driver = await new Builder().setChromeOptions(opts).forBrowser('chrome').build();
    vars = {}

    handle = await driver.getAllWindowHandles();

    await RegisterMetamask(driver, handle);
    
  })
  after(async function() {
    await driver.quit();
  })

  //expect, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id

  it('Abnormal: Lock Native token 1st time for wrong address', async function() {
    await LockNative("Error!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc4", driver, handle, null, ConfirmMetamask, ConnectMetamask, SwitchNetwork, "MBC", "0.00001", 0);
  })

  it('Abnormal: Lock Native token 1st time for wrong amount', async function() {
    await LockNative("Error!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "MBC", "100", 1);
  })
  

  it('Normal: Lock Native token 1st time', async function() {
    await LockNative("Success!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "MBC", "0.00001");
  })

  it('Abnormal: Unlock ERC20 token 1st time wrong address', async function() {
    await UnlockToken("Error!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc4", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "0.00001", 0);
  })

  it('Abnormal: Unlock ERC20 token 1st time wrong amount', async function() {
    await UnlockToken("Error!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "100", 0);
  })

  it('Normal: Unlock ERC20 token 1st time', async function() {
    await UnlockToken("Success!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "0.00001");
  })

  it('Abnormal: Lock ERC20 token 1st time wrong address', async function() {
    await LockToken("Error!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc4", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "0.00001", 0);
  })

  it('Abnormal: Lock ERC20 token 1st time wrong amount', async function() {
    await LockToken("Error!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "100", 2);
  })

  it('Normal: Lock ERC20 token 1st time', async function() {
    await LockToken("Success!", "ERC20", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "AGD", "0.00001");
  })

  it('Abnormal: Unlock Native token 1st time wrong address', async function() {
    await UnlockNative("Error!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc4", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "MBC", "0.00001", 0);
  })

  it('Abnormal: Unlock Native token 1st time wrong amount', async function() {
    await UnlockNative("Error!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "MBC", "100", 0);
  })

  it('Normal: Unlock Native token 1st time', async function() {
    await UnlockNative("Success!", "0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3", driver, handle, null, ConfirmMetamask, null, SwitchNetwork, "MBC", "0.00001");
  })

})