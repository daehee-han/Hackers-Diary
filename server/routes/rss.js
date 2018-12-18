const Axios = require('axios').default;
const fs = require('fs');
const router = require('express').Router();
const Feeds = require('../models/feeds');

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

module.exports = router;
