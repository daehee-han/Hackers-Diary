const router = require('express').Router();
const Accounts = require('../models/accounts');
const ValidCheck = require("../validCheck");
const Util = require("../util");

router.get('/', async (req, res) => {
    const token = (await req.tokenGet(req.token)).isLogin;
    if(token) {
      res.send({
          isLogin : true,
          token : req.token
      })
      return;
    }
    res.send({
        isLogin : false,
        token : req.token
    })
})

router.post('/register', (req, res) => {

    console.log(req.body)

    var username = req.body.username.trim();
    var password = req.body.password.trim();
    var email = req.body.email.trim().toLowerCase();

    if(!username, !password, !email) {
        res.send({
            status : false,
            message : "모든 값을 입력해주세요."
        })
        return;
    }

    if(!ValidCheck("email", email)) {
        res.send({
            status : false,
            message : "이메일 주소 형식이 올바르지 않습니다."
        })
        return;
    }

    if(!ValidCheck("username", username)) {
        res.send({
            status : false,
            message : "아이디는 4~20 자로, 영소문자와 숫자, 언더바만 가능합니다."
        })
        return;
    }

    password = Util.passwordHash(password)

    Accounts.findOne({username: username})
    .then(account => {
        if(account) {
            res.send({
                status : false,
                message : "이미 존재하는 Username 입니다."
            })
            return;
        }
        Accounts.findOne({email: email})
        .then(account => {
            if(account) {
                res.send({
                    status : false,
                    message : "이미 존재하는 Email 입니다."
                })
                return;
            }    
            Accounts.create({username:username, password:password, email:email})
            .then(function() {
                res.send({
                    status : true,
                    message : "회원가입 성공"
                })
            })
        })
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send({
            status : false,
            message : "알 수 없는 에러 발생."
        })
        return;
    })
});

router.post('/login', function(req, res) {
    var username = req.body.username.trim()
    var password = req.body.password.trim()
    password = Util.passwordHash(password)
    Accounts.findOne({
        username: username,
        password: password
    }).then(async (account) => {
        if(account === null) {
            res.send({
                status : false,
                message : "존재하지 않는 계정입니다."
            })
            return;
        }
        await req.tokenSet(req.token, {
            isLogin: true,
            username: username,
        });
        res.send({
            status: true,
            message: "로그인 성공",
            token: req.token
        })
    }).catch(function(err) {
        console.log(err);
        res.status(500).send({
            status : false,
            message : "알 수 없는 에러 발생."
        })
        return;
    })
});

router.get("/logout", function(req, res) {
    req.session.destroy();
    res.send(returnCode['accounts']['Logout'])
});

module.exports = router;
