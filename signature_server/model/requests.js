const mongoose = require('mongoose');

const NewFtRequestsSchema = mongoose.Schema({
    from: {
        type: String,
        required: true,
        lowercase: true
    },
    to: {
        type: String,
        required: true,
        lowercase: true
    },
    deposit_amounts: [{
        type: String,
        min: -1
    }],
    deposit_from_networks: [{
        type: String,
        match: /^(MBC|AGD)$/i
    }],
    deposit_TxIds: [{
        type: String,
        lowercase: true,
    }],
    deposit_is_native: [{
        type: Boolean,
    }],
    withdraw_amounts: [{
        type: String,
        min: -1
    }],
    withdraw_from_networks: [{
        type: String,
        match: /^(MBC|AGD)$/i
    }],
    withdraw_TxIds: [{
        type: String,
        lowercase: true,
    }],
    withdraw_is_native: [{
        type: Boolean,
    }]
})

const NewNftRequestsSchema = mongoose.Schema({
    from: {
        type: String,
        required: true,
        lowercase: true
    },
    to: {
        type: String,
        required: true,
        lowercase: true
    },
    deposit_from_network: [{
        type: String,
        match: /^(MBC|AGD)$/i
    }],
    deposit_TxIds: [{
        type: String,
        lowercase: true,
    }],
    deposit_tokenIds: [{type: Number}],

    withdraw_from_network: [{
        type: String,
        match: /^(MBC|AGD)$/i
    }],
    withdraw_TxIds: [{
        type: String,
        lowercase: true,
    }],
    withdraw_tokenIds: [{type: Number}]
})

const trim = function(string){
    if(string.slice(0,2) !== "0x"){
        let new_str = "0x" + string
        return new_str
    }
    return string
}

const trim_arr = function(arr){
    for (let i = 0; i < arr.length; i++){
        arr[i] = trim(arr[i])
    }
    return(arr)
}

const trim_TxIds = function(next){
    if (this.isModified('deposit_TxIds')){
        this.deposit_TxIds = trim_arr(this.deposit_TxIds)
    }
    if (this.isModified('withdraw_TxIds')){
        this.withdraw_TxIds = trim_arr(this.withdraw_TxIds)
    }
    next();
}


NewFtRequestsSchema.pre('save', trim_TxIds);
NewNftRequestsSchema.pre('save', trim_TxIds);

const NewFtRequests = mongoose.model('NewFtRequests', NewFtRequestsSchema);
const NewNftRequests = mongoose.model('NewNftRequests', NewNftRequestsSchema);

module.exports = {
    NewFtRequests,
    NewNftRequests
}

// require('./db');

// test = async() => {
//     const nft_requests =  new NewNftRequests({
//         from: '0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3',
//         to: '0x2A17727eD9370E909a0665110ad1820158dcc1F6',
//         deposit_tokenIds: [0, 1],
//         deposit_TxIds: ["000", "100"],
//         deposit_from_network: ['MBC', 'AGD'],
//         withdraw_tokenIds: [-1],
//         withdraw_TxIds: ["0x0"],
//         withdraw_from_network: ["MBC"]
//     });
//     await nft_requests.save(); 
//     console.log('done');
// }

// try{
//     test();
// }catch(e){
//     console.log(e);
// }
