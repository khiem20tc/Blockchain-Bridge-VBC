const {Router} = require('express');
const {validate_lock_multi, validate_unlock_multi} = require('../../middleware/index').ERC721_validate;
const {lockMultiController, unlockMultiController, getTokenURIsController} = require('../../controller/ERC721Controller');

const ERC721_route = Router();
ERC721_route.post('/lock_multi', validate_lock_multi, lockMultiController);
ERC721_route.post('/unlock_multi', validate_unlock_multi, unlockMultiController);
ERC721_route.post('/get_URIs', getTokenURIsController);

module.exports = ERC721_route;