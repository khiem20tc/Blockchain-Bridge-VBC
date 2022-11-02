const template = require('./template');
const {lock_multiples, unlock_multiples, getTokenURIS} = require('../services/index');

const lockMultiController = template(async(req) => {
    return(await lock_multiples(req.body));
})

const unlockMultiController = template(async(req) => {
    return(await unlock_multiples(req.body));
})

const getTokenURIsController = template(async(req) => {
    return(await getTokenURIS(req.body));
})



module.exports = {
    lockMultiController,
    unlockMultiController,
    getTokenURIsController
}