const Logger = require('../utils/logger');

const template = (mainFunc) => async(req, res) => {
    try {
        const val = await mainFunc(req);
        Logger.info(val);
        res.status(201).send(val)
    } catch(e){
        Logger.error(e);
        res.status(400).send(false);
    }
};


module.exports = template