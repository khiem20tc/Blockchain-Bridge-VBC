require('dotenv').config();
const {mbc_bridge, agd_bridge} = require('../config/index').Web3Instances;

const mbc_admin = mbc_bridge.eth.accounts.privateKeyToAccount(process.env.MNEMONIC1);
const agd_admin = agd_bridge.eth.accounts.privateKeyToAccount(process.env.MNEMONIC2);
 