// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');


const metamask_path = "C:/Users/admin/AppData/Local/Google/Chrome/User Data/Profile 3/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/10.22.2_0.crx";
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


let mnemonic = ['gym', 'lift', 'cruise', 'tonight', 'tool', 'wrong', 'lab', 'rice', 'truth', 'car', 'multiply', 'tilt'];
let mbc_network = ["MBC", "https://test.vbchain.vn", "4444", "VBC"];
let agd_network = ["AGD", "https://agridential.vbchain.vn/VBC001", "8888", "AGD"];

let WaitAndClick = async(driver, method, locator) => {
    await driver.wait(until.elementLocated(By[method](locator)), 25000);
    await driver.findElement(By[method](locator)).click();
}

let WaitAndSelect = async(driver, method_select, locator_select, method_opt, locator_opt) => {
  let select_element = await driver.findElement(By[method_select](locator_select));
  await select_element.click();
  await driver.wait(until.elementIsEnabled(await select_element.findElement(By[method_opt](locator_opt))), 25000);
  await select_element.findElement(By[method_opt](locator_opt)).click();
}

let AddNetworkInfo = async(driver, arr) => {
  const form_arr = await driver.findElements(By.xpath("//input[@class='form-field__input']"));
  for(let i = 0; i < 4; i++){
    await form_arr[i].sendKeys(arr[i]);
  }
  await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//button[text() = 'Save']"))), 25000);
  await driver.findElement(By.xpath("//button[text() = 'Save']")).click();
}


describe('ERC20', function() {
  this.timeout(100000)
  let handle
  let driver
  let vars
  before(async function() {
    driver = await new Builder().setChromeOptions(opts).forBrowser('chrome').build();
    vars = {}

    handle = await driver.getAllWindowHandles();
    await driver.switchTo().window(handle[0]);

    // await driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/welcome");

    //Login Metamask manually
    await WaitAndClick(driver, 'xpath', '//button[text()="Get started"]');
    await WaitAndClick(driver, 'xpath', '//button[text()="No thanks"]');
    await WaitAndClick(driver, 'xpath', '//button[text()="Import wallet"]');
    
    
    

    // // After this you will need to enter you wallet details

    await driver.wait(until.elementLocated(By.id('import-srp__srp-word-0')), 15000);
    for (let i = 0; i < 12; i++){
        let inputs = await driver.findElement(By.id('import-srp__srp-word-' + i.toString()));
        inputs.sendKeys(mnemonic[i]);
    }
    
    const password = await driver.findElement(By.id('password'));
    const confirm = await driver.findElement(By.id('confirm-password'));
    password.sendKeys("khangluong26052oo412");
    confirm.sendKeys("khangluong26052oo412");
    await driver.findElement(By.id('create-new-vault__terms-checkbox')).click();
    const import_btn = await driver.findElement(By.xpath('//button[text()="Import"]'));
    await driver.wait(until.elementIsEnabled(import_btn), 20000);
    await import_btn.click();
    await WaitAndClick(driver, 'xpath', '//button[text()="All done"]');

    await WaitAndClick(driver, "className", "box box--margin-top-1 box--margin-bottom-1 box--flex-direction-row typography chip__label typography--h7 typography--weight-normal typography--style-normal typography--color-text-alternative");
    await WaitAndClick(driver, "linkText", "Show/hide");
    await driver.wait(until.elementLocated(By.xpath('//div[@data-testid="advanced-setting-show-testnet-conversion"]')), 15000);
    const testnet_btn = (await driver.findElements(By.xpath("//div[@style='display: flex; width: 52px; align-items: center; justify-content: flex-start; position: relative; cursor: pointer; background-color: transparent; border: 0px; padding: 0px; user-select: none; -webkit-tap-highlight-color: transparent;']")))[4];
    await driver.executeScript("arguments[0].scrollIntoView()", testnet_btn);
    await testnet_btn.click();
    (await driver.findElements(By.xpath("//div[@class='tab-bar__tab__content']")))[5].click();

    await WaitAndClick(driver, "xpath", "//button[text()='Add a network']");
    await WaitAndClick(driver, "linkText", "Add a network manually");
    await AddNetworkInfo(driver, agd_network);

    await WaitAndClick(driver, "className", "box box--margin-top-1 box--margin-bottom-1 box--flex-direction-row typography chip__label typography--h7 typography--weight-normal typography--style-normal typography--color-text-alternative");
    await WaitAndClick(driver, "linkText", "Show/hide");
    (await driver.findElements(By.xpath("//div[@class='tab-bar__tab__content']")))[5].click();
    await WaitAndClick(driver, "xpath", "//button[text()='Add a network']");
    await WaitAndClick(driver, "linkText", "Add a network manually");
    await AddNetworkInfo(driver, mbc_network);
    await driver.switchTo().window(handle[1]);
  })
  after(async function() {
    await driver.quit();
  })
  it('Lock Native token 1st time', async function() {
    try{
    // Test name: Lock Native token 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006/")
    

    await driver.wait(until.elementLocated(By.id("receiverAddress")), 100000)
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent")).click()
    // 11 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 12 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 13 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.wait(until.elementLocated(By.id("fromNetwork")), 100000);
    const fromNetwork = await driver.findElement(By.id("fromNetwork"));
    await driver.executeScript("arguments[0].scrollIntoView()", fromNetwork);
    await driver.wait(until.elementIsVisible(fromNetwork), 100000);

    await driver.executeScript("arguments[0].click()", fromNetwork);
    // 15 | click | css=.inputBox > .sep_bottom:nth-child(1) > p:nth-child(1) | 
    await driver.findElement(By.css(".inputBox > .sep_bottom:nth-child(1) > p:nth-child(1)")).click()
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 100000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 100000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | 0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3
    await driver.findElement(By.id("senderAddress")).sendKeys("0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3")
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | 0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3
    await driver.findElement(By.id("receiverAddress")).sendKeys("0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3")
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    //Switch to Metamask page to Confirm

    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 100000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 100000)
    console.log(await driver.findElement(By.id("btnStatus")).getText());
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }} catch(e){
      console.log(e)
    }
  })
})