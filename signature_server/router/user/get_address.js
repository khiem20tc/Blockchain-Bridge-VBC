const {Router} = require('express');
const {getAddressController} = require('../../controller/accController');


const get_add = Router();
get_add.post('/', getAddressController);

module.exports = get_add;