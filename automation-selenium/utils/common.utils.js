let WaitAndClick = async(driver, method, locator) => {
    await driver.wait(until.elementLocated(By[method](locator)), 25000);
    await driver.findElement(By[method](locator)).click();
}

let WaitAndSelect = async(driver, method_select, locator_select, method_opt, locator_opt) => {
  await driver.wait(until.elementLocated(By[method_select](locator_select)), 15000);
  let select_element = await driver.findElement(By[method_select](locator_select));
  await select_element.click();
  await driver.wait(until.elementLocated(By[method_opt](locator_opt)), 15000);
  await driver.wait(until.elementIsEnabled(await select_element.findElement(By[method_opt](locator_opt))), 25000);
  await select_element.findElement(By[method_opt](locator_opt)).click();
}

module.exports = {
    WaitAndClick,
    WaitAndSelect
}