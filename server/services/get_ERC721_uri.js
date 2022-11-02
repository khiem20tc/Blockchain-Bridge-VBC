const index = require('../config/index');
require('dotenv').config();

async function checkBridge(bridge_name){
    const private_key = process.env.KEY3
    if (bridge_name === "MBC"){
        web3 = index.Web3Instances.mbc_bridge;
    } else {
        web3 = index.Web3Instances.agd_bridge;
    }

    const user_contract = await new web3.eth.Contract(index.UserAbiERC721, process.env.ERC721_ADDRESS);
    const Acc = await web3.eth.accounts.privateKeyToAccount(private_key);
    return ({Acc, user_contract});
}


const getTokenURI = async(user_contract, Acc, tokenId) => {
    const tokenURI = await user_contract.methods.tokenURI(tokenId).call({
        from: Acc.address,
        gas: '8000000'
    })
    return(tokenURI)
}

const getTokenURIS = async({bridge_name, tokenIds}) => {
    const {Acc, user_contract} = await checkBridge(bridge_name)

    let tokenURI
    let token_uris_arr = []
    for (let i = 0; i < tokenIds.length; i++){
      tokenURI = await getTokenURI(user_contract, Acc, tokenIds[i]);
      token_uris_arr.push(tokenURI);
    }
    return(token_uris_arr)
}

module.exports = getTokenURIS;