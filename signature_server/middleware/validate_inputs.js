//require('dotenv').config();
const Logger = require('../utils/logger');

const validate_input = (Schema, type="POST") => async(req, res, next) => {
    try {
        let check
        if (type == "POST"){
            check = req.body
        } else {
            check = req.query
        }
        const value = await Schema.validateAsync(check);
        if (process.env.NODE_ENV != "testing"){
            Logger.info(value);
        }
        next()
    } catch(e) {
        if (process.env.NODE_ENV !== "testing"){
            Logger.error(e);
        }
        res.status(400).send(false);
    }
}


module.exports = validate_input