require('dotenv').config();

const Web3 =  require('web3');
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker');
// const mnemonic1 = process.env.MNEMONIC1;
// const mnemonic2 = process.env.MNEMONIC2;

// class web3 {
//     constructor(){
//         this.mbc_bridge = null;
//         this.agd_bridge = null;
//         this.mbc_provider = null;
//         this.agd_provider = null
//     }

//     set_bridges(){
//         try {
//             let mbc_nonce = new NonceSubprovider();
//             let agd_nonce = new NonceSubprovider();
//             this.mbc_provider = new HDWalletProvider(mnemonic1, process.env.MBC_LINK);
//             this.agd_provider = new HDWalletProvider(mnemonic2, process.env.AGD_LINK);
//             this.mbc_provider.engine._providers[1] = mbc_nonce;
//             this.agd_provider.engine._providers[1] = agd_nonce;

//             this.mbc_bridge = new Web3(this.mbc_provider);
//             this.agd_bridge = new Web3(this.agd_provider);
//             return ({mbc_bridge: this.mbc_bridge, agd_bridge: this.agd_bridge, mbc_provider: this.mbc_provider, agd_provider: this.agd_provider})}
//         catch(e) {
//             console.log(e);
//         }
//     }


//     async reset_bridges(){
//         try {
//             console.log("MBC before: ", (await this.mbc_bridge.eth.getTransactionCount("0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3")));
//             console.log("AGD before: ", (await this.agd_bridge.eth.getTransactionCount("0xa8d0E581481E8Ef727f89792D266dE4D76519fA7")));
//             await this.mbc_provider.engine.stop();
//             await this.agd_provider.engine.stop();
//             this.mbc_bridge = null;
//             this.agd_bridge = null;
//             this.mbc_provider = null;
//             this.agd_provider = null;
//             this.set_bridges();
//             console.log("MBC after: ", (await this.mbc_bridge.eth.getTransactionCount("0x00F83Bf923DD1e044a23C9FF1c14f54cf0f3ffc3")));
//             console.log("AGD after: ", (await this.agd_bridge.eth.getTransactionCount("0xa8d0E581481E8Ef727f89792D266dE4D76519fA7")));
//             console.log("Done reset");
//         } catch(e){
//             console.log(e);
//         }        
//     }    
// }

//Sender's instance is created using ReactJS on Front End
// const new_web3 = new web3();

// let {mbc_bridge, agd_bridge} = new_web3.set_bridges();

const web3_mbc = new Web3(new Web3.providers.HttpProvider(process.env.MBC_LINK))
const web3_agd = new Web3(new Web3.providers.HttpProvider(process.env.AGD_LINK))

module.exports =  {
    mbc_bridge: web3_mbc,
    agd_bridge: web3_agd
};

// const num1 = web3_mbc.utils.toBN("10000")
// const num2 = web3_mbc.utils.toBN("10000")
// const cmp_val = num1.cmp(num2);
// console.log(num2.sub(num1));
// console.log((num2.sub(num1)).isZero());
// console.log(cmp_val);
// console.log(cmp_val == 1);