//Not tested
const {getOne, updateEntry} = require('./base_crud');

const append = async(model, filter_obj, fields_list, update_obj) => {
    let entry = await getOne(model, filter_obj);
    let update_obj = {};
    for (let i = 0; i < fields_list.length; i++){
        let append_values = update_obj[fields_list[i]];
        let original_array = entry[fields_list[i]];
        for (let x = 0; x < append_values.length; x++){
            if (original_array.includes(append_values[x])){
                throw new Error("Not unique values")
            }
        }
        update_obj[fields_list[i]] = original_array.concat(append_values);
    }
    const updated = await updateEntry(model, filter_obj, update_obj);
    return updated;
}

module.exports = append;