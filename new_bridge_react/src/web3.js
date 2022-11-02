import Web3 from 'web3';



// const mbc_provider = new HDWalletProvider(mnemonic1, "https://test.vbchain.vn");
// const agd_provider = new HDWalletProvider(mnemonic2, "https://agridential.vbchain.vn/VBC001");

// const mbc_bridge = new Web3(mbc_provider);
// const agd_bridge = new Web3(agd_provider);

const create_user = () => {
    window.ethereum.request({method: "eth_requestAccounts"});
    const user = new Web3(window.ethereum);
    return(user);
}

export default 
    create_user
    // mbc_bridge,
    // agd_bridge
;
