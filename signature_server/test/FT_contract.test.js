require('dotenv').config();
const request = require("supertest");
const {expect} = require("chai");
const {accounts} = require("../model/index");
const {validate_token} = require("../services/index");
const {mbc_bridge, agd_bridge} = require("../config/web3")

require("../server");

before(function (done) {
    setTimeout(done, 8000);

})

