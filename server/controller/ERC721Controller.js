const template = require('./template');
const {lock_multiples, unlock_multiples} = require('../services/index');

const lockMultiController = template(async(req) => {
    return(await lock_multiples(req.body));
})

const unlockMultiController = template(async(req) => {
    return(await unlock_multiples(req.body));
})




module.exports = {
    lockMultiController,
    unlockMultiController
}