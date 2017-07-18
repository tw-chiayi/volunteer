var express = require('express');
var router = express.Router();

var TITLE = "2017 燈會志工系統";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: TITLE});
});

router.get("/join",(req,res,next)=>{
  res.render('join', { title: '加入志工 | ' + TITLE });
})

module.exports = router;
