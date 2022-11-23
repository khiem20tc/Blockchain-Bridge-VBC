const mbc_link = "https://test.vbchain.vn";
const private_key = "0xfbcc37cf7b304ad62315ce2bc2d52508bf3a446d2d8e4a944aeda78ee21d24c4";
const {BridgeAbiERC20, BridgeAddressERC20} = require('../signature_server/config/bridge_ERC20');
const {AbiERC20, AddressERC20} = require('../signature_server/config/ERC20_contract');

const Web3 = require("web3");



const provider = new Web3.providers.HttpProvider(mbc_link);
const web3 = new Web3(provider);
const BridgeERC20 = new web3.eth.Contract(BridgeAbiERC20, BridgeAddressERC20)

async function check(){
    const sender_acc = web3.eth.accounts.privateKeyToAccount(private_key); 
    console.log(sender_acc);
    // const nonce = await BridgeERC20.methods.Nonces('0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758', '0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758', true, false).call({
    //         from: sender_acc.address,
    //         gas: "8000000"
    //     });
    // console.log(nonce);
    // const hash = web3.utils.soliditySha3({t: 'string', v: 'transfer_native'}, 
    // {t: 'address', v: '0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758'},
    // {t: 'address', v: '0x8FBF5A7505d323D0b957c0aF3FaB8Ceea9226758'},
    // {t: 'uint256', v: '100'},
    // {t: 'uint256', v: nonce});

    // const signed = await sender_acc.sign(hash);
    // console.log(signed);

    //SIGNING ALGORITHM:
    // const encode_method = ERC721.methods.name().encodeABI();
    // console.log(encode_method);
    // const signed_raw = await sender_acc.signTransaction({
    //     to: "0xCf5D54837b07bd9215666D647C0A88754bD3F98c",
    //     gas: "8000000",
    //     data: encode_method
    // });
    // console.log(signed_raw);
    // const raw_transaction = signed_raw.rawTransaction;
    // const result = await web3.eth.sendSignedTransaction(raw_transaction);

    //CALLING VIEW FUNCTIONS:
    // const return_val = await ERC721.methods.name().call({
    //     from: sender_acc.address,
    //     gas: "8000000"
    // });
    // console.log(return_val);
    
}

check()