import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
const mnemonic1 = "gym lift cruise tonight tool wrong lab rice truth car multiply tilt";
const mnemonic2 = "merit foam soon couple cloth bronze column snake solar order resist voice";


window.ethereum.request({method: "eth_requestAccounts"});
const mbc_provider = new HDWalletProvider(mnemonic1, "https://test.vbchain.vn");
const agd_provider = new HDWalletProvider(mnemonic2, "https://agridential.vbchain.vn/VBC001");
const sender = new Web3(window.ethereum);
const mbc_bridge = new Web3(mbc_provider);
const agd_bridge = new Web3(agd_provider);

export default {
    sender,
    mbc_bridge,
    agd_bridge
};
