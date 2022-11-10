const {NftRequests, FtRequests} = require('../model/index').requests;
const {verify, adminFunc} = require('../services/index');
const {getAllAndProcess, deleteAll} = require('../repositories/index');


const checkERC20 = async() => {
    const requests = await getAllAndProcess(FtRequests);
    if (requests.length == 0){
        return false
    }

    let approved =  {
        MBC: [[], [], [], []],
        AGD: [[], [], [], []]
    };
    for (let i = 0; i < requests.length; i ++){
        let request = requests[i]
        let TxId = request.TxId;
        let from_network = request.from_network;
        let to_network = "MBC"
        if (from_network == "MBC"){
            to_network = "AGD"
        }
        let valid = await verify(TxId, from_network, false)
        if (valid){
            approved[to_network][0].push(request.from);
            approved[to_network][1].push(request.to);
            approved[to_network][2].push(request.amount);
            approved[to_network][3].push(!request.is_native);
        }
    };

    await adminFunc("increase_approvals", approved.MBC, "MBC", "FT");
    await adminFunc("increase_approvals", approved.AGD, "AGD", "FT");

    await deleteAll(FtRequests);
    console.log("Verified FT transactions")
}

const checkERC721 = async() => {
    const requests = await getAllAndProcess(NftRequests);
    if (requests.length == 0){
        return false
    }

    let approved =  {
        MBC: [[], []],
        AGD: [[], []]
    };
    for (let i = 0; i < requests.length; i ++){
        const request = requests[i];
        let TxId = request.TxId;
        let from_network = request.from_network;
        let to_network = "MBC"
        if (from_network == "MBC"){
            to_network = "AGD"
        }
        let valid = await verify(TxId, from_network, true);
        console.log("Valid:", valid);
        if (valid){  
            approved[to_network][0].push(request.to);
            approved[to_network][1].push(request.tokenIds);
        }
    };

    console.log(approved);

    await adminFunc("set_multiple_approvals", approved.MBC, "MBC", "NFT");
    await adminFunc("set_multiple_approvals", approved.AGD, "AGD", "NFT");

    await deleteAll(NftRequests);
    console.log("Verified NFT transactions")
}

const combinedCheck = async() => {
    try {
        await checkERC20();
        await checkERC721();
    } catch(e){
        console.log(e);
        if (e.code == -32001){
            console.log('Reset connection');
            // await new_web3.reset_bridges();
        }
    }  
}

const start_admin = async() => {
    setInterval(combinedCheck, 30000)
}

start_admin();