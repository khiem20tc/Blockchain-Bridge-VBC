const {append} = require('../repositories/index');
const {NewNftRequests, NewFtRequests} = require('../model/index').requests;
const Logger = require('../utils/logger');
const pre_template = require('./template');

const template = (model) => pre_template(async(req) => {
    const body = req.body;
    const {from, to} = body;
    delete body.from;
    delete body.to;
    const updated = await append(model, from, to, body);
    return updated;
})

const nftController = template(NewNftRequests);
const ftController = template(NewFtRequests);


module.exports = {
    nftController,
    ftController
}