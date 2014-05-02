var r = require("random-word")("0123456789abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ");
var PW = require("png-word");
var pw = PW(PW.GREEN);
var router = require("express").Router();


router.refresh = function(req,res,next){
    req.session.validat_num = r.random(4);
    next();
}

router.get("/",router.refresh,function(req,res){

    pw.createPNG(req.session.validat_num, function (pngnum) {
        res.send(pngnum)
    });

})

router.validat = function(req,res,next){

    if (
        !(req.body.validat_num && req.session.validat_num &&
            req.session.validat_num.toLocaleLowerCase() === req.body.validat_num.toLocaleLowerCase())
        ) {
        router.refresh(req,res,function(){});
        next({validat_num:"验证码错误 "});
    } else {
        next();
    }

}


module.exports = router;