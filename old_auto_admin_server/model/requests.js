const mongoose = require('mongoose');

const FtRequestsSchema = mongoose.Schema({
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
    isDeleted: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 2
    },
    from_network: {
        type: String,
        required: true,
        match: /^(MBC|AGD)$/i
    },
    TxId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    is_native: {
        type: Boolean,
        required: true
    },
    amount: {
        type: String,
        required: true,
        min: 0
    }
})

const NftRequestsSchema = mongoose.Schema({
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
    isDeleted: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 2
    },
    from_network: {
        type: String,
        required: true,
        match: /^(MBC|AGD)$/i
    },
    TxId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    tokenIds: [{type: Number}]
})

const trim_TxId = function (next){
    if (this.isModified('TxId')){
        if (this.TxId.slice(0, 2) != "0x"){
            this.TxId = "0x" + this.TxId
        }
    }
    next();
}

FtRequestsSchema.pre('save', trim_TxId);
NftRequestsSchema.pre('save', trim_TxId);

const FtRequests = mongoose.model('FtRequests', FtRequestsSchema);
const NftRequests = mongoose.model('NftRequests', NftRequestsSchema);

module.exports = {
    FtRequests,
    NftRequests
}

// require('./db');

// test = async() => {
//     const nft_requests =  new NftRequests({
//         from: '0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3',
//         to: '0x2A17727eD9370E909a0665110ad1820158dcc1F6',
//         isDeleted: 0,
//         TxId: '0x29e2c1701cf8960041bd71b4aa0f43b13cd04cd2a52a35d5ce35d11a47c5c870',
//         from_network: 'MBC',
//         tokenIds: [20, 21]
//     });
//     await nft_requests.save(); 
//     console.log('done');
// }

// try{
//     test();
// }catch(e){
//     console.log(e);
// }

