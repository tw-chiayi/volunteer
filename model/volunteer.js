
var knex = require("./_conn");


var build = (d) => d ;

module.exports = {
  insert_item(data){
    //{name,sex,birthday,address,telephonenumber,mobilenumber,email,expertise,group,occupation,YesNo,Dates,Time,Day,identify}
    return knex("form_join").insert(data).then(build);
    
  }
};
