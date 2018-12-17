import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import Axios from 'axios';
const parseString = require('react-native-xml2js').parseString;

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
            // alert(res.data);
            parseString(res.data, (err, result) => {
                feeds = [];
                items = result.rss.channel[0].item;
                items.forEach(item => {
                    feeds.push({
                        title: item.title,
                        link: item.link,
                        description: item.description[0].replace(/<br\s*\/>/ig, " ").replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/ig, " ").slice(0, 200) + " ...",
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
                <View style={styles.card}>
                    <Text style={styles.title}>{feed.title}</Text>
                    <Text style={[styles.url, styles.introText]}>{feed.link}</Text>
                    <Text>
                        {feed.description}
                    </Text>
                    <View style={styles.cardIntro}>
                        <Text style={[styles.author, styles.introText]}>{feed.author} > {feed.category}</Text>
                        <Text style={[styles.pubDate, styles.introText]}>{feed.pubDate}</Text>
                    </View>
                </View>
            ));
        });

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.body}>
                        {feeds}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card : {
        padding : 10,
        backgroundColor : '#fff',
        marginTop : 10,
    },
    title : {
        fontSize : 17
    },
    cardIntro : {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    introText : {
        fontSize : 10,
        color : '#aaa',
    }
});
