var express = require('express');
var router = express.Router();
var TITLE = "2017 燈會志工系統";

var model = require("./../model/volunteer");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: TITLE});
});

router.get("/join",(req,res,next)=>{
  res.render('join', { title: '加入志工 | ' + TITLE });
});


router.get("/join/single",(req,res,next)=>{
  res.render('join_single', { title: '個人報名 | 加入志工 | ' + TITLE });
});

router.post("/join/single_submiting",(req,res,next)=>{

  //請修改這裡

  
  console.log(req.body);

  // model.insert_item({
  //     name:"test",
  //     sex:"1"
  // });
  res.send(req.body);
  // res.render('join_single', { title: '個人報名 | 加入志工 | ' + TITLE });
});



module.exports = router;
