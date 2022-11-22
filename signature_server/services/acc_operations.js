const User = require('../model/accounts');
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const {create, getOne} = require('../repositories/index');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {mbc_bridge} = require('../config/index').Web3Instances;




//info_obj: {username, password, privateKey}
const register = async(info_obj) => {
    const acc = await mbc_bridge.eth.accounts.create(process.env.SYS_SECRET_KEY);
    info_obj["privateKey"] = acc.privateKey;
    // console.log(info_obj);
    await create(User, info_obj);
}

const get_address = async({username}) => {
    const user = await getOne(User, {username});
    const private_key = (crypto.AES.decrypt(user.privateKey, process.env.SYS_SECRET_KEY)).toString(crypto.enc.Utf8)
    const address = (await mbc_bridge.eth.accounts.privateKeyToAccount(private_key)).address;
    return(address);
}

const login = async({username, password}) => {
    const user = await getOne(User, {username});
    if (!user){
        throw new Error("No user is found")
    } 

    const valid = await bcrypt.compare(password, user.password); 

    if (!valid) {
        throw new Error("Invalid password")
    }

    const token = await user.genToken();
    return(token);
}

const validate_token = async(token) => {
    const decoded_username = (jwt.verify(token, process.env.SYS_SECRET_KEY)).username;
    const user = await getOne(User, {username: decoded_username});
    if (!user){
        throw new Error("No user is found or user is not logged in")
    }
    return(decoded_username)
}

module.exports = {
    login,
    register,
    validate_token,
    get_address
}

// test = async() => {
//     console.log(await login("Khang", "1234567"));
// }

// try{
//     test()
// }catch(e){
//     console.log(e)
// }

