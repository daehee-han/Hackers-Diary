import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Axios from 'axios';
var parseString = require('react-native-xml2js').parseString;

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            feeds : []
        }

        this.getFeeds();
    }
    getFeeds() {
        Axios.get("http://tribal1012.tistory.com/rss")
        .then(res => {
            parseString(res.data, (err, result) => {
                feeds = [];
                items = result.rss.channel[0].item;
                items.forEach(item => {
                    feeds.push({
                        title: item.title,
                        link: item.link,
                        description: item.description,
                        category: item.category,
                        author: item.author,
                        guid: item.guid,
                        pubDate: item.pubDate
                    })
                });
                this.setState({
                    feeds : feeds
                })
            }); // parseString End
        }); // Axios End
    }
    render() {
        feeds = [];

        this.state.feeds.forEach(feed => {
            feeds.push((
                <View style={styles.feed}>
                    <Text>{feed.title}</Text>
                    <Text>{feed.link}</Text>
                    <View style={styles.cardIntro}>
                        <Text>{feed.author}</Text>
                        <Text>{feed.category}</Text>
                        <Text>{feed.pubDate}</Text>
                    </View>
                </View>
            ));
        });

        return (
            <React.Fragment>
                <Text style={styles.h1}>Main Page</Text>
                <View>
                    {feeds}
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    h1 : {
        fontSize : 20,
    },
    feed : {
        padding : 10,
    },
    cardIntro : {
        flexDirection : 'row',
    },
});
