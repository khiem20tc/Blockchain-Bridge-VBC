const {verify_FT_request, verify_NFT_request} = require('../services/verify');
const {ERC20_signer, ERC721_multiple_signer} = require('../services/admin_sign');
const template = require('./template');

const signatureController = template(async(req) => {
    let params = req.body;
    const {is_NFT} = params;
    delete params.is_NFT;
    let verify_func;
    let signer;
    if (is_NFT){
        verify_func = verify_NFT_request;
        signer = ERC721_multiple_signer;
    } else {
        verify_func = verify_FT_request;
        signer = ERC20_signer;
    }
    const valid = await verify_func(params);
    if (valid == false){
        throw new Error("Invalid request");
    }
    const signature = await signer(params);
    return(signature)
})


module.exports = signatureController