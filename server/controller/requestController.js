const {create} = require('../repositories/index');
const {NftRequests, FtRequests} = require('../model/index').requests;
const Logger = require('../utils/logger');
const pre_template = require('./template');

const template = (model) => pre_template(async(req) => {
    await create(model, req.body);
    return true;
})

const nftController = template(NftRequests);
const ftController = template(FtRequests);


module.exports = {
    nftController,
    ftController
}