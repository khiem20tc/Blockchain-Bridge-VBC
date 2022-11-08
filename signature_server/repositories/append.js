const {getOne, updateEntry, create} = require('./base_crud');
// const {NewFtRequests, NewNftRequests} = require('../model/requests');
// require('../model/db');

//fields_list: The fields that are lists

// const null_arr = ["Null"] 
const append = async(model, from, to, update_obj) => {
    let fields_list = Object.keys(update_obj);
    let entry = await getOne(model, {from, to});
    if (entry == null){
        // for (let i = 0; i < fields_list.length; i++){
        //     update_obj[fields_list[i]] = null_arr.concat(update_obj[fields_list[i]])
        // }
        await create(model, {from, to, ...update_obj});
        return(true);
    }
    for (let i = 0; i < fields_list.length; i++){
        let append_values = update_obj[fields_list[i]];
        let original_array = entry[fields_list[i]];
        if (fields_list[i].includes("TxIds")){
            for (let x = 0; x < append_values.length; x++){
                if (original_array.includes(append_values[x])){
                    throw new Error("Not unique values")
                }
            }
        }
        update_obj[fields_list[i]] = original_array.concat(append_values);
    }
    const updated = await updateEntry(model, {from, to}, update_obj);
    console.log(updated);
    return updated;
}

module.exports = append;

// append(NewNftRequests, "0x123", "0x123",
// {withdraw_from_networks: ["MBC"], withdraw_TxIds: ["0x30ba90a36dcda6d78c69eae46be6a97a0769cccb2d0e14fe758f280a1a22a21f"], withdraw_tokenIds: ["48"]});