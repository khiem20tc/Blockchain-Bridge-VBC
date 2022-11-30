const { By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

let WaitAndClick = async(driver, method, locator) => {
    await driver.wait(until.elementLocated(By[method](locator)), 25000);
    await driver.findElement(By[method](locator)).click();
  }
  
  let WaitAndSelect = async(driver, method_select, locator_select, method_opt, locator_opt) => {
    await driver.wait(until.elementLocated(By[method_select](locator_select)), 15000);
    let select_element = await driver.findElement(By[method_select](locator_select));
    await select_element.click();
    await driver.wait(until.elementIsEnabled(await select_element.findElement(By[method_opt](locator_opt))), 25000);
    await select_element.findElement(By[method_opt](locator_opt)).click();
  }

let LockNative = async(address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network) => {
    // Test name: Lock Native token 1st time
    // Step # | name | target | value
    await driver.get("http://localhost:3006");

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle);
        }
    }

    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }

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
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 100000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 100000);
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

let UnlockERC20 = async(address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network) => {
    // Test name: Unlock ERC20 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006");

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }
    
    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }
    
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await WaitAndClick(driver, "css", ".large_div:nth-child(3) > .large_input_transparent");
    // 11 | select | css=.large_div:nth-child(3) > .large_input_transparent | label=VMBC
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent"));
      await driver.wait(until.elementIsEnabled(await dropdown.findElement(By.xpath("//option[@value = 'VMBC']"))), 10000);
      await dropdown.findElement(By.xpath("//option[@value = 'VMBC']")).click();
    }
    // 12 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 13 | select | css=.large_div:nth-child(2) > .large_input_transparent | label=Draw
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent"))
      await driver.wait(until.elementIsEnabled(await dropdown.findElement(By.xpath("//option[@value = 'Draw']"))), 10000);
      await dropdown.findElement(By.xpath("//option[@value = 'Draw']")).click()
    }


    // 14 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 15 | type | id=amountEther | 0.00001
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
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 100000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 100000)
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

let LockERC20 = async(address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network) => {
    // Test name: Lock ERC20 1st time
    // Step # | name | target | value
    await driver.get("http://localhost:3006");

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }

    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }

    await driver.wait(until.elementLocated(By.id("receiverAddress")), 100000)
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await WaitAndSelect(driver, "css", ".large_div:nth-child(3) > .large_input_transparent", "xpath", "//option[@value = 'VMBC']");
    // 11 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    await WaitAndSelect(driver, 'css', ".large_div:nth-child(2) > .large_input_transparent", "xpath", "//option[@value = 'Deposit']");
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
    await driver.wait(until.elementIsEnabled(await fromNetwork.findElement(By.xpath("//option[@value = 'AGD']"))), 10000);
    await fromNetwork.findElement(By.xpath("//option[@value = 'AGD']")).click();
    
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 100000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 100000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await senderAddress.sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await receiverAddress.sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle);
        await ConfirmMetamask(driver, handle);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 100000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 100000)
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

let UnlockNative = async(address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network) => {
    // Test name: Unlock Native token 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006");

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }
    
    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }
    
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await WaitAndSelect(driver, "css", ".large_div:nth-child(3) > .large_input_transparent", "xpath", "//option[@value = 'MBC']");
    // 12 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 13 | select | css=.large_div:nth-child(2) > .large_input_transparent | label=Draw
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent"))
      await driver.wait(until.elementIsEnabled(await dropdown.findElement(By.xpath("//option[@value = 'Draw']"))), 10000);
      await dropdown.findElement(By.xpath("//option[@value = 'Draw']")).click()
    }


    // 14 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 15 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.wait(until.elementLocated(By.id("fromNetwork")), 100000);
    const fromNetwork = await driver.findElement(By.id("fromNetwork"));
    await driver.executeScript("arguments[0].scrollIntoView()", fromNetwork);
    await driver.wait(until.elementIsVisible(fromNetwork), 100000);

    await driver.executeScript("arguments[0].click()", fromNetwork);
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//option[@value = 'AGD']"))), 25000);
    await driver.findElement(By.xpath("//option[@value = 'AGD']")).click();

    
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 100000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 100000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].scrollIntoView()", final_submit);
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 100000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 100000);
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

module.exports = {
    LockERC20,
    LockNative,
    UnlockERC20,
    UnlockNative
}