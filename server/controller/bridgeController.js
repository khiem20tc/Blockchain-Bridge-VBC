const {lock, unlock, transfer} = require('../services/index');
const template = require('./template');


const lockController = template(async (req) => {
        const {bridge_name, user, user_contract, amount} = req.body;
        await lock(bridge_name, user, user_contract, amount);
        return true;
    })


const unlockController = template(async (req) => {
        const {bridge_name, user, user_contract, amount} = req.body;
        await unlock(bridge_name, user, user_contract, amount);
        return true;
    })

const transferController = template(async (req) => {
        const {bridge_name, user, amount} = req.body;
        await transfer(bridge_name, user, amount);
        return true;
    })


module.exports = {
    lockController, 
    unlockController,
    transferController
}