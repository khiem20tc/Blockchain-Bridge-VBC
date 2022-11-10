const {Router} = require('express');
const {ERC721_request_approval} = require('../../middleware/index').request_approval;
const {nftController} = require('../../controller/requestController')


const nft_request = Router();
nft_request.post('/', ERC721_request_approval, nftController)

module.exports = nft_request