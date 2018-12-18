const Axios = require('axios').default;
const router = require('express').Router();
const Feeds = require('../models/feeds');
const Category = require('../models/category');
const CateFeed = require('../models/cateFeed');

let Parser = require('rss-parser');
let parser = new Parser();

router.get('/:token/:category', async (req, res) => {
    const token = req.params.token;
    const category = req.params.category;

    const data = await req.tokenGet(token)
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
        feed: category
    }

    CateFeed.find({
        username : username,
        category : category
    }).then(async (rows) => {

        const output = []
        for(let i=0;i<rows.length;i++) {
            output.push(await Feeds.findById(rows[i].feed).exec())
        }
        res.send({
            status: true,
            data: output
        })

    }).catch(e => {
        console.log(e);
        res.send({status:false, message:"에러 발생"})            
        return;
    })

});

router.get('/:token/:category/:feed', async (req, res) => {

    const token = req.params.token;
    const category = req.params.category;
    const feed = req.params.feed;

    const data = await req.tokenGet(token)
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
        feed: category
    }

    CateFeed.findOne({
        username : username,
        feed : feed
    }).then(async (row) => {
        if(row) {
            await CateFeed.deleteOne({
                username : username,
                feed : feed
            }).exec();
        }
        CateFeed.create({
            username: username,
            category: category,
            feed: feed
        }).then(() =>{
            res.send({status:true, message:"성공"})            
            return;
        }).catch(e => {
            console.log(e);
            res.send({status:false, message:"에러 발생"})            
            return;
        })
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

router.get('/:token/:category', async (req, res) => {
    const data = await req.tokenGet(req.params.token)
    const category = req.params.category
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
        category: category
    }

    Category.findOne(query).then((row) => {
        res.send({
            status : true,
            data : row
        })
        return;
    }).catch(e => {
        console.log(e);
        res.send({status:false, message:"에러 발생"})            
        return;
    })
})


module.exports = router;
