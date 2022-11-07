const Logger = require('../utils/logger');

const validate_input = (Schema) => async(req, res, next) => {
    try {
        const value = await Schema.validateAsync(req.body)
        Logger.info(value);
        next()
    } catch(e) {
        Logger.error(e);
        res.status(400).send(false);
    }
}


module.exports = validate_input