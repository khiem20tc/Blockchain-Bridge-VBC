const {Router} = require('express');
// const lock_route = require('./lock.route');
// const unlock_route = require('./unlock.route');
// const transfer_route = require('./transfer.route');
// const nft_request = require('./nft_request');
// const ft_request = require('./ft_request');
const ERC20 = require('../ERC20/index');
const ERC721 = require('../ERC721/index');
const signature = require('./signature');


const route = Router();




// route.use('/nft_request', nft_request);
// route.use('/ft_request', ft_request);
route.use('/ERC20', ERC20);
route.use('/ERC721', ERC721);
route.use('/signature', signature);

module.exports = route;