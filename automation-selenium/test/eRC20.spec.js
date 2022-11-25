// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('ERC20', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Lock Native token 1st time', async function() {
    // Test name: Lock Native token 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006/login")
    // 2 | runScript | window.localStorage.clear() | 
    await driver.executeScript("window.localStorage.clear()")
    // 3 | waitForElementEditable | id=lgUsername | 30000
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.id("lgUsername"))), 30000)
    // 4 | setWindowSize | 1070x824 | 
    await driver.manage().window().setRect({ width: 1070, height: 824 })
    // 5 | click | id=lgUsername | 
    await driver.findElement(By.id("lgUsername")).click()
    // 6 | type | id=lgUsername | testtest
    await driver.findElement(By.id("lgUsername")).sendKeys("testtest")
    // 7 | click | id=lgPassword | 
    await driver.findElement(By.id("lgPassword")).click()
    // 8 | type | id=lgPassword | 1234567
    await driver.findElement(By.id("lgPassword")).sendKeys("1234567")
    // 9 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent")).click()
    // 11 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 12 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 13 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent")).click()
    // 15 | click | css=.inputBox > .sep_bottom:nth-child(1) > p:nth-child(1) | 
    await driver.findElement(By.css(".inputBox > .sep_bottom:nth-child(1) > p:nth-child(1)")).click()
    // 16 | click | id=senderAddress | 
    await driver.findElement(By.id("senderAddress")).click()
    // 17 | type | id=senderAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("senderAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 18 | click | id=receiverAddress | 
    await driver.findElement(By.id("receiverAddress")).click()
    // 19 | type | id=receiverAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("receiverAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 20 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 21 | assertText | id=btnStatus | Success!
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
  })

  it('Unlock ERC20 1st time', async function() {
    // Test name: Unlock ERC20 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006/login")
    // 2 | runScript | window.localStorage.clear() | 
    await driver.executeScript("window.localStorage.clear()")
    // 3 | waitForElementEditable | id=lgUsername | 30000
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.id("lgUsername"))), 30000)
    // 4 | setWindowSize | 1070x824 | 
    await driver.manage().window().setRect({ width: 1070, height: 824 })
    // 5 | click | id=lgUsername | 
    await driver.findElement(By.id("lgUsername")).click()
    // 6 | type | id=lgUsername | testtest
    await driver.findElement(By.id("lgUsername")).sendKeys("testtest")
    // 7 | click | id=lgPassword | 
    await driver.findElement(By.id("lgPassword")).click()
    // 8 | type | id=lgPassword | 1234567
    await driver.findElement(By.id("lgPassword")).sendKeys("1234567")
    // 9 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent")).click()
    // 11 | select | css=.large_div:nth-child(3) > .large_input_transparent | label=VMBC
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'VMBC']")).click()
    }
    // 12 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 13 | select | css=.large_div:nth-child(2) > .large_input_transparent | label=Draw
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'Draw']")).click()
    }
    // 14 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 15 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 16 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent")).click()
    // 17 | click | css=.inputBox > .sep_bottom:nth-child(1) > p:nth-child(1) | 
    await driver.findElement(By.css(".inputBox > .sep_bottom:nth-child(1) > p:nth-child(1)")).click()
    // 18 | click | id=senderAddress | 
    await driver.findElement(By.id("senderAddress")).click()
    // 19 | type | id=senderAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("senderAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 20 | click | id=receiverAddress | 
    await driver.findElement(By.id("receiverAddress")).click()
    // 21 | type | id=receiverAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("receiverAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 22 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 23 | assertText | id=btnStatus | Success!
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 24 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
  })

  it('Lock ERC20 1st time', async function() {
    // Test name: Lock ERC20 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006/login")
    // 2 | runScript | window.localStorage.clear() | 
    await driver.executeScript("window.localStorage.clear()")
    // 3 | waitForElementEditable | id=lgUsername | 30000
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.id("lgUsername"))), 30000)
    // 4 | setWindowSize | 782x831 | 
    await driver.manage().window().setRect({ width: 782, height: 831 })
    // 5 | click | id=lgUsername | 
    await driver.findElement(By.id("lgUsername")).click()
    // 6 | type | id=lgUsername | testtest
    await driver.findElement(By.id("lgUsername")).sendKeys("testtest")
    // 7 | click | id=lgPassword | 
    await driver.findElement(By.id("lgPassword")).click()
    // 8 | type | id=lgPassword | 1234567
    await driver.findElement(By.id("lgPassword")).sendKeys("1234567")
    // 9 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent")).click()
    // 11 | select | css=.large_div:nth-child(3) > .large_input_transparent | label=VMBC
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(3) > .large_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'VMBC']")).click()
    }
    // 12 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 13 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 14 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 15 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent")).click()
    // 16 | select | css=.col-lg-5:nth-child(1) .small_input_transparent | label=AGD
    {
      const dropdown = await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'AGD']")).click()
    }
    // 17 | click | css=.inputBox > .sep_bottom:nth-child(1) > p:nth-child(1) | 
    await driver.findElement(By.css(".inputBox > .sep_bottom:nth-child(1) > p:nth-child(1)")).click()
    // 18 | click | id=senderAddress | 
    await driver.findElement(By.id("senderAddress")).click()
    // 19 | type | id=senderAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("senderAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 20 | click | id=receiverAddress | 
    await driver.findElement(By.id("receiverAddress")).click()
    // 21 | type | id=receiverAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("receiverAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 22 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 23 | assertText | id=btnStatus | Success!
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 24 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
  })
  
  it('Unlock Native token 1st time', async function() {
    // Test name: Unlock Native token 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get("http://localhost:3006/login")
    // 2 | runScript | window.localStorage.clear() | 
    await driver.executeScript("window.localStorage.clear()")
    // 3 | waitForElementEditable | id=lgUsername | 30000
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.id("lgUsername"))), 30000)
    // 4 | setWindowSize | 784x824 | 
    await driver.manage().window().setRect({ width: 784, height: 824 })
    // 5 | click | id=lgUsername | 
    await driver.findElement(By.id("lgUsername")).click()
    // 6 | type | id=lgUsername | testtest
    await driver.findElement(By.id("lgUsername")).sendKeys("testtest")
    // 7 | click | id=lgPassword | 
    await driver.findElement(By.id("lgPassword")).click()
    // 8 | type | id=lgPassword | 1234567
    await driver.findElement(By.id("lgPassword")).sendKeys("1234567")
    // 9 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 10 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent")).click()
    // 11 | select | css=.large_div:nth-child(2) > .large_input_transparent | label=Draw
    {
      const dropdown = await driver.findElement(By.css(".large_div:nth-child(2) > .large_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'Draw']")).click()
    }
    // 12 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 13 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys("0.00001")
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent")).click()
    // 15 | select | css=.col-lg-5:nth-child(1) .small_input_transparent | label=AGD
    {
      const dropdown = await driver.findElement(By.css(".col-lg-5:nth-child(1) .small_input_transparent"))
      await dropdown.findElement(By.xpath("//option[. = 'AGD']")).click()
    }
    // 16 | click | id=senderAddress | 
    await driver.findElement(By.id("senderAddress")).click()
    // 17 | type | id=senderAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("senderAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 18 | click | id=receiverAddress | 
    await driver.findElement(By.id("receiverAddress")).click()
    // 19 | type | id=receiverAddress | 0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8
    await driver.findElement(By.id("receiverAddress")).sendKeys("0xC3DDDE3D73927C503632ff13f9C6D8B20D67c2d8")
    // 20 | click | css=.submit_bar | 
    await driver.findElement(By.css(".submit_bar")).click()
    // 21 | assertText | id=btnStatus | Success!
    assert(await driver.findElement(By.id("btnStatus")).getText() == "Success!")
    // 22 | click | css=.center:nth-child(8) | 
    await driver.findElement(By.css(".center:nth-child(8)")).click()
    // 23 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
  })
})
