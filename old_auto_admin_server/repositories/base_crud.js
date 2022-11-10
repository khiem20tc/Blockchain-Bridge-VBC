//Need to connect to db first
const {NftRequests, FtRequests} = require('../model/index').requests;


//username, password, privateKey
const create = async(model, new_obj) => {
    const new_entry = new model(new_obj);
    await new_entry.save();
}

const getOne = async(model, filter_obj) => {
    const entry = await model.findOne({...filter_obj, isDeleted: 0});
    return(entry); 
}

const getOneAndProcess = async(model, filter_obj) => {
    const entry = await model.findOne({...filter_obj, isDeleted: 1});
    return(entry); 
}

const getAll = async(model) => {
    const all = await model.find({isDeleted: 0});
    return(all);
}

const getAllAndProcess = async(model) => {
    await model.updateMany({isDeleted: 0}, {isDeleted: 1});
    const all = await model.find({isDeleted: 1});
    return(all);
}

const updateEntry = async(model, filter_obj, update_obj) => {
    const updated = await model.findOneAndUpdate({...filter_obj, isDeleted: 0}, update_obj, {new: true});
    return(updated)
}

const deleteEntry = async(model, filter_obj) => {
    await model.deleteOne(filter_obj);
}

const deleteAll = async(model) => {
    await model.updateMany({isDeleted: 1}, {isDeleted: 2})
}

const cleanAll = async(model) => {
    await model.deleteMany({isDeleted: 2})
}


module.exports = {
    create,
    getOne,
    getOneAndProcess,
    getAllAndProcess,
    getAll,
    updateEntry,
    deleteEntry,
    deleteAll,
    cleanAll
}