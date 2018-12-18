import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

var timeAgo = require('node-time-ago');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            isFlex : true
        }
        this.state = {
            feeds : []
        }
        props.getFeeds(this.getFeeds);
    }
    getFeeds = (res) => {
        this.setState({ feeds: res.data.data });
    }
    render() {
        const feeds = [];

        this.state.feeds.forEach(feed => {
            feeds.push((
                <TouchableWithoutFeedback
                    onPress={() => { this.props.change('detail', { id: feed._id, title: '"' + feed.author + '" 블로그', feed: feed }) }}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>{feed.title}</Text>
                        <Text style={[styles.url, styles.introText]}>{(feed.guid) ? feed.guid : feed.link}</Text>
                        <Text style={{color:"#888",margin:10}}>
                            {entities.decode(feed.contentSnippet.slice(0, 150))}
                        </Text>
                        <View style={styles.cardIntro}>
                            <Text style={[styles.author, styles.introText]}>{feed.author} > {(typeof feed.categories === "string") ? feed.categories.split(',')[0] : "카테고리 없음"}</Text>
                            <Text style={[styles.pubDate, styles.introText]}>{timeAgo(feed.pubDate)}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ));
        });

        return (
            <View>
                {
                    (this.props.isFlex === false) ? (
                        <View>
                            {feeds}
                            <View style={{ height: 5 }}></View>
                        </View>
                   ) : (
                        <View>
                            <ScrollView>
                                <View>
                                    {feeds}
                                </View>
                                <View style={{ height: 5 }}></View>
                            </ScrollView>
                        </View>
                    )
                }
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
    },
    url : {
        
    }
});
