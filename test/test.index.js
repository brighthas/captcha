var request = require("supertest");
var should = require("should");
var captcha = require("../");

var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var validat_num;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser("keyboard cat"));
app.use(session());

app.use("/captcha", captcha);

app.get("/refresh",captcha.refresh,function(req,res){
    validat_num = req.session.validat_num;
    should.exist(req.session.validat_num);
    res.send(validat_num);
})

app.post("/validat",captcha.validat,function(req,res){
    res.send();
})

var agent = request.agent(app);

describe("captcha", function () {

    it("#pngnum", function (done) {
            agent.get("/captcha")
            .end(function (err, res) {
                should.exist(res.text);
                done()
            });
    });

    it("#refresh", function (done) {
        agent.get("/refresh").end(function(err,res){
            should.exist(res.text);
            done();
        });
    });

    it("#validat",function(done){
        agent.post("/validat").send({validat_num:validat_num}).end(function(){
            done();
        });
    })
});