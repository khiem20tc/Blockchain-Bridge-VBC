const {Router} = require('express');
const signatureController = require('../../controller/signatureController');

const signature = Router();
signature.post('/', signatureController);

module.exports = signature;