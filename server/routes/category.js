const Axios = require('axios').default;
const fs = require('fs');
const router = require('express').Router();
const Feeds = require('../models/feeds');
const Likes = require('../models/like');
const Category = require('../models/category');

let Parser = require('rss-parser');
let parser = new Parser();

router.post('/new/:token', async (req, res) => {
    const data = await req.tokenGet(req.params.token)
    if(!!!data) {
        res.send({
            status : false,
            message: "로그인 세션이 종료된것으로 보입니다. 다시 로그인해주세요."
        })
        return;
    }     
    const username = data.data.username;
    const query = {
        username: username,
        category: req.body.category
    }

    Category.create(query).then(() => {
        res.send({
            status : true,
            message : "카테고리 추가 성공"
        })
        
        return;
    }).catch(e => {
        console.log(e);
        res.send({status:false, message:"에러 발생"})            
        return;
    })
})


router.get('/remove/:token/:id', async (req, res) => {
    const data = await req.tokenGet(req.params.token)
    if(!!!data) {
        res.send({
            status : false,
            message: "로그인 세션이 종료된것으로 보입니다. 다시 로그인해주세요."
        })
        return;
    }     
    const username = data.data.username;
    const query = {
        username: username,
        _id : req.params.id
    }

    Category.deleteOne(query).then(() => {
        res.send({
            status : true,
            message : "카테고리 삭제 성공"
        })
        return;
    }).catch(e => {
        console.log(e);
        res.send({status:false, message:"에러 발생"})            
        return;
    })
})

router.get('/:token', async (req, res) => {
    const data = await req.tokenGet(req.params.token)
    if(!!!data) {
        res.send({
            status : false,
            message: "로그인 세션이 종료된것으로 보입니다. 다시 로그인해주세요."
        })
        return;
    }     
    const username = data.data.username;
    const query = {
        username: username,
    }

    Category.find(query).then((rows) => {
        res.send({
            status : true,
            data : rows
        })
        return;
    }).catch(e => {
        console.log(e);
        res.send({status:false, message:"에러 발생"})            
        return;
    })
})

module.exports = router;
