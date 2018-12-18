import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, TouchableNativeFeedback, Linking } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon } from "react-native-elements";
const SharedPreferences = require('react-native-shared-preferences');
import Axios from 'axios';
var timeAgo = require('node-time-ago');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const JEnum = require('../enum')

export default class App extends Component {
    state = {
        body: "Enim laboris ex do culpa ipsum. Incididunt ad ullamco elit adipisicing do officia elit proident sunt culpa. Officia est excepteur quis dolor ex eu est id ipsum ea do.\nExcepteur aliqua incididunt minim dolor magna enim est non velit cupidatat aute anim. Sit laborum ullamco mollit anim esse. Labore est laboris enim officia. Nostrud minim et excepteur eiusmod irure. Laboris quis nulla adipisicing ad laborum ex id anim dolore aute occaecat labore dolore qui. Mollit consequat mollit veniam eiusmod dolor minim pariatur velit mollit reprehenderit do veniam.\nAdipisicing tempor voluptate Lorem esse duis ex tempor eiusmod consequat excepteur nostrud duis laborum. Sunt ipsum aliqua duis ut eiusmod fugiat sint deserunt cupidatat officia duis aute laboris Lorem. Enim duis eu in velit deserunt tempor minim. Commodo irure dolor ex mollit labore amet ipsum voluptate laborum aute.\nFugiat fugiat nulla irure dolore id eu do consequat in do sunt exercitation. Cillum non dolor id exercitation pariatur. Cillum ullamco velit culpa reprehenderit anim. Esse consectetur adipisicing aute nostrud reprehenderit. Nostrud labore et ex officia laboris dolor esse cupidatat id deserunt sint pariatur qui. Labore duis adipisicing ipsum consequat non.\nDuis non anim ad sit duis adipisicing non officia deserunt. Aliqua labore fugiat et proident culpa laboris eu. Non adipisicing qui qui anim occaecat nostrud. Incididunt nostrud labore irure aliqua deserunt duis eu ut duis nostrud voluptate anim culpa. Labore mollit laborum occaecat sunt nulla irure nostrud mollit.\n가\n나다라"
    }
    like = (id) => {
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.likeRSS + "/" + value + "/" + id)
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                if(res.data.data) {
                    alert("좋아요를 누르셨습니다.");
                    return;
                }
                alert("좋아요를 취소하셨습니다.");
                return;
            });
        })
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.view}>
                    <Text style={{ fontSize: 23, marginTop: 20 }}>{this.props.data.feed.title}</Text>
                    <View>
                        <Text style={{ fontSize: 13, color: '#888', marginTop: 10 }}>{this.props.data.feed.author} > {(typeof this.props.data.feed.categories === "string") ? this.props.data.feed.categories.split(',')[0] : "카테고리 없음"}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 13, color: '#888' }}>{this.props.data.feed.creator} 님의 블로그</Text>
                        <Text style={{ fontSize: 13, color: '#888', marginLeft: 5, marginRight: 5 }}>/</Text>
                        <Text style={{ fontSize: 13, color: '#888' }}>{timeAgo(this.props.data.feed.pubDate)}</Text>
                    </View>
                    <View>
                        <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/06/24/15/45/code-820275_960_720.jpg' }} style={{ width: Dimensions.get('screen').width - 20, height: 200, marginTop: 20, marginBottom: 15 }} />
                    </View>
                    <Grid style={{ marginBottom: 15, flexDirection: 'row',  }}>
                    <Col>
                            <TouchableNativeFeedback onPress={() => { this.like(this.props.data.feed._id) }}>
                                <View style={styles.button}>
                                    <Icon name="heart" type="font-awesome" color="#999" size={20}/>
                                </View>
                            </TouchableNativeFeedback>
                        </Col>
                        <Col>
                            <TouchableNativeFeedback onPress={() => { Linking.openURL(this.props.data.feed.guid) }}>
                                <View style={styles.button}><Text style={{ fontSize:13.5, color: '#666', alignSelf:'center' }}>본문 보기</Text></View>
                            </TouchableNativeFeedback>
                        </Col>
                    </Grid>
                    <View>
                        <Text>{entities.decode(this.props.data.feed.contentSnippet)}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 10,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        margin : 5
    }
});
