import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
const parseString = require('react-native-xml2js').parseString;
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export default class App extends Component {
    constructor(props) {
        // props.isFlex = (props.isFlex === undefined) ? true : props.isFlex;
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
        parseString(res.data, (err, result) => {
            feeds = [];
            items = result.rss.channel[0].item;
            items.forEach(item => {
                feeds.push({
                    _id: "IDIDIDID",
                    title: item.title,
                    link: item.link,
                    description: item.description[0].replace(/\n/ig," ").replace(/<br\s*\/>/ig, " ").replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/ig, " ").slice(0, 100) + " ...",
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
    }
    render() {
        const feeds = [];

        this.state.feeds.forEach(feed => {
            feeds.push((
                <TouchableWithoutFeedback
                    onPress={() => { this.props.change('detail', { id: feed._id, title: '"울지않는 벌새" 블로그' }) }}
                >
                    <View style={styles.card}>
                        <Text style={styles.title}>{feed.title}</Text>
                        <Text style={[styles.url, styles.introText]}>{(feed.guid) ? feed.guid : feed.link}</Text>
                        <Text style={{color:"#888",margin:10}}>
                            {entities.decode(feed.description)}
                        </Text>
                        <View style={styles.cardIntro}>
                            <Text style={[styles.author, styles.introText]}>{feed.author} > {feed.category}</Text>
                            <Text style={[styles.pubDate, styles.introText]}>{feed.pubDate}</Text>
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
