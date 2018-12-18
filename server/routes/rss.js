const Axios = require('axios').default;
const fs = require('fs');
const router = require('express').Router();
const Feeds = require('../models/feeds');
const Likes = require('../models/like');

let Parser = require('rss-parser');
let parser = new Parser();

router.get('/update', async (req, res) => {

    let rss = fs.readFileSync('./rss.txt').toString().split(/\n/g)
    const targets = []
    for(let i=0;i<rss.length;i++) {
        if(!!rss[i]) {
            targets.push(rss[i])
        }
    }

    for(let j=0;j<targets.length;j++) {
        try {
            let feed = await parser.parseURL(targets[j]);
            for(let i=0;i<feed.items.length;i++) {
                feed.items[i].pubDate = (new Date(feed.items[i].pubDate)).getTime();
                feed.items[i].isoDate = (new Date(feed.items[i].isoDate)).getTime();
                Feeds.create(feed.items[i]).then(() => {}).catch(()=>{});
                // console.log(feed.items[i]);
            }
        } catch(error) {
            console.log(error);
        }
    }

    res.send({
        status: true
    })

})

router.get('/recent', (req, res) => {
    Feeds.find().sort({pubDate:-1}).limit(100).then(rows => {
        res.send({status:true, data:rows});
    })
})

router.get('/like', (req, res) => {
    console.log(req.cookies.hacker);
    console.log(req.cookies.hacker);
    console.log(req.cookies.hacker);
    console.log(req.cookies.hacker);
    console.log(req.cookies.hacker);
    Feeds.find().sort({pubDate:-1}).limit(100).then(rows => {
        res.send({status:true, data:rows});
    })
})

router.get('/like/:token/:id', async (req, res) => {
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
        feed: req.params.id
    }
    Likes.findOne(query).then(row => {
        if(!row) {
            Likes.create(query).then(() => {
                res.send({
                    status:true,
                    message: "",
                    data: true
                })
                return;
            }).catch(e => {
                console.log(e);
                res.send({status:false, message:"에러 발생"})            
                return;
            })
            return;
        } 
        Likes.deleteOne(query).then(() => {
            res.send({
                status:true,
                message: "",
                data: false
            })
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

module.exports = router;
