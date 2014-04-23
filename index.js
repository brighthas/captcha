var r = require("random-word")("0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ");
var PW = require("png-word");
var pw = PW(PW.GREEN);
var router = require("express").Router();

router.get("/",function(req,res){

    if (!req.session.validat_num) {
        router.refresh(req,res,function(){})
    }

    pw.createPNG(req.session.validat_num, function (pngnum) {
        res.send(pngnum)
    });

})

router.validat = function(req,res,next){

    if (
        !(req.body.validat_num && req.session.validat_num &&
            req.session.validat_num.toLocaleLowerCase() === req.body.validat_num.toLocaleLowerCase())
        ) {
        next({error:"验证码错误 "});
    } else {
        next();
    }

}

router.refresh = function(req,res,next){
    req.session.validat_num = r.random(4);
    next();
}

module.exports = router;