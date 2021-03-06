var XLSX = require('xlsx');
var express = require('express');
var multer = require('multer');
var router = express.Router();
var TITLE = "2017 燈會志工系統";
var storage = multer.diskStorage({
  //destination: function (request, file, callback) {
   // callback(null);
  //},
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('xls');

var model = require("./../model/volunteer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: TITLE});
});

router.get("/join",(req,res,next)=>{
  res.render('join', { title: '加入志工 | ' + TITLE });
});

router.get("/join/group",(req,res,next)=>{
  res.render('join_group', { title: '團體報名 | 加入志工 | ' + TITLE });
});

router.get("/read/excel",(req,res,next)=>{
  const workbook = XLSX.readFile('fake.xlsx');
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  let a1 = worksheet['A2'];
  let a2 = worksheet['B2'];
  let a3 = worksheet['C2'];
  let a4 = worksheet['D2'];
  let a5 = worksheet['E2'];
  console.log(a1.v,a2.v,a3.w,a4.v,a5.v);
  res.render('read_excel', { title: '讀xls' + TITLE });
});

router.post('/join/group/csv', function(request, response) {
  upload(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file);
  response.end('Your File Uploaded');
  console.log('Photo Uploaded');
  })
  
  var { name,birthday,identify,mobilenumber} = req.body;

  console.log([ name,birthday,identify,mobilenumber]);

  model.insert_item({
      name:name,
      birthday:birthday,
      identify:identify,
      mobilenumber:mobilenumber,
  }).then(()=>{},(err)=>{
    console.log(err);
  });

  res.send("送出完成:"+name);
});

router.get("/join/group/csv",(req,res,next)=>{
  res.render('join_group_csv', { title: 'xls表單' + TITLE });
});

router.post("/join/group_submiting",(req,res,next)=>{

  //請修改這裡

  //"Name":"123","IdNumber":"","Birthday":"","Address":"","TelephoneNumber
  
  //return res.send(req.body);

  var { unitcategory,unitname,name,occupation,telephonenumber,mobilenumber,email,address,group,dates,time,day,people } = req.body;

  console.log([ unitcategory,unitname,name,occupation,telephonenumber,mobilenumber,email,address,group,dates,time,day,people]);

  var labels = {
    1:"志工服務組(聯合服務台)",
    2:"環保組(環境保護局)",
    3:"交通運輸組(建設處)",
    4:"行政協調組(行政處)",
    5:"燈區服務(民政處)",
    6:"宣傳行銷組(新聞行銷處)",
    7:"醫療救護組/菸害防制(衛生局)",
    8:"在地特色燈區組 (文化觀光局)",
    9:"節目表演組(表藝中心)",
    10:"科技資訊組(綜規處)"
  };

  var groups = [];
  for(var i = 1 ; i <= 10 ; ++i){
    if(req.body["group"+i]){
      groups.push({
        label:labels[i],
        index:req.body["group"+i]
      });  
    }
  } 

  var group_result= [];
  for(var i = 1; i <= 10; ++i)
  {
    for(var j = groups.length-1; j >= 0; --j){
      if (i == groups[j].index){
        group_result.push(groups[j].label);
      }
    }
  }

  model.insert_group_item({
      unitcategory:unitcategory,
      unitname:unitname,
      name:name,
      occupation:occupation,
      telephonenumber:telephonenumber,
      mobilenumber:mobilenumber,
      email:email,
      address:address,
      group:group_result.join(","),
      dates:dates,
      time:time,
      day:day,
      people:people
  }).then(()=>{},(err)=>{
    console.log(err);
  });
  
  res.send("送出完成:"+name);
});

router.get("/join/single",(req,res,next)=>{
  res.render('join_single', { title: '個人報名 | 加入志工 | ' + TITLE });
});

router.post("/join/single_submiting",(req,res,next)=>{

  //請修改這裡

  //"Name":"123","IdNumber":"","Birthday":"","Address":"","TelephoneNumber
  
  //return res.send(req.body);

  var { name,sex,identify,birthday,address,telephonenumber,mobilenumber,email,expertise,group,occupation,hasbook,dates,time,day } = req.body;

  console.log([ name,sex,identify,birthday,address,telephonenumber,mobilenumber,email,expertise,group,occupation,hasbook,dates,time,day]);

  var labels = {
    1:"志工服務組(聯合服務台)",
    2:"環保組(環境保護局)",
    3:"交通運輸組(建設處)",
    4:"行政協調組(行政處)",
    5:"燈區服務(民政處)",
    6:"宣傳行銷組(新聞行銷處)",
    7:"醫療救護組/菸害防制(衛生局)",
    8:"在地特色燈區組 (文化觀光局)",
    9:"節目表演組(表藝中心)",
    10:"科技資訊組(綜規處)"
  };

  var groups = [];
  for(var i = 1 ; i <= 10 ; ++i){
    if(req.body["group"+i]){
      groups.push({
        label:labels[i],
        index:req.body["group"+i]
      });  
    }
  } 

  var group_result= [];
  for(var i = 1; i <= 10; ++i)
  {
    for(var j = groups.length-1; j >= 0; --j){
      if (i == groups[j].index){
        group_result.push(groups[j].label);
      }
    }
  }

  model.insert_item({
      name:name,
      sex:sex,
      identify:identify,
      birthday:birthday,
      address:address,
      telephonenumber:telephonenumber,
      mobilenumber:mobilenumber,
      email:email,
      expertise:expertise,
      group:group_result.join(","),
      occupation:occupation,
      hasbook:hasbook,
      dates:dates,
      time:time,
      day:day
  }).then(()=>{},(err)=>{
    console.log(err);
  });
  
  res.send("送出完成:"+name+sex);
  // res.render('join_single', { title: '個人報名 | 加入志工 | ' + TITLE });
});

module.exports = router;

