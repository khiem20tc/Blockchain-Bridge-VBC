import Web3 from 'web3';




const create_user = () => {
    window.ethereum.request({method: "eth_requestAccounts"});
    const user = new Web3(window.ethereum);
    return(user);
}

export default 
    create_user
;
