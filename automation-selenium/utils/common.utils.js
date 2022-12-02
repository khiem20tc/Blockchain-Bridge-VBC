const {By, Key, until} = require('selenium-webdriver');

let WaitAndClick = async(driver, method, locator) => {
    await driver.wait(until.elementLocated(By[method](locator)), 5000);
    await driver.findElement(By[method](locator)).click();
}

let WaitAndSelect = async(driver, method_select, locator_select, method_opt, locator_opt) => {
  await driver.wait(until.elementLocated(By[method_select](locator_select)), 5000);
  let select_element = await driver.findElement(By[method_select](locator_select));
  await driver.executeScript("arguments[0].scrollIntoView()", select_element);
  await driver.wait(until.elementIsVisible(select_element), 5000);
  await driver.executeScript("arguments[0].click()", select_element);
  await driver.wait(until.elementLocated(By[method_opt](locator_opt)), 5000);
  await driver.wait(until.elementIsEnabled(await select_element.findElement(By[method_opt](locator_opt))), 25000);
  await select_element.findElement(By[method_opt](locator_opt)).click();
}

module.exports = {
    WaitAndClick,
    WaitAndSelect
}