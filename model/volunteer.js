
var knex = require("./_conn");


var build = (d) => d ;

module.exports = {
  insert_item(data){
    //{name,sex,birthday,address,telephonenumber,mobilenumber,email,expertise,group,occupation,YesNo,Dates,Time,Day,identify}
    return knex("form_join").insert(data).then(build);},
    
    insert_group_item(data){
    return knex("form_join_group").insert(data).then(build);},

    insert_group_item(data){
    return knex("read_excel").insert(data).then(build);
  }
};
