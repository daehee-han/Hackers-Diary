import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, TouchableNativeFeedback, Linking, Picker } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import { Icon } from "react-native-elements";
const SharedPreferences = require('react-native-shared-preferences');
import Axios from 'axios';
var timeAgo = require('node-time-ago');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const JEnum = require('../enum')

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : []
        }
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.category + "/" + value)
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                this.setState({
                    categories : res.data.data ? res.data.data : []
                })
                return;
            });
        })        
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

    setCategory = (id) => {
        this.setState({
            category : id
        })
        if(id === "select") return;
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.cateFeed + "/" + value + "/" + id + "/" + this.props.data.feed._id)
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                alert("카테고리 적용이 되었습니다.")
                return;
            });
        })
    }

    render() {

        const Pickers = []
        for(let i=0;i<this.state.categories.length;i++) {
            Pickers.push((
                <Picker.Item label={this.state.categories[i].category} value={this.state.categories[i]._id} />
            ))
        }

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
                    <Grid style={{ marginBottom: 8, flexDirection: 'row',  }}>
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
                    <View
                        style={{
                            margin: 10,
                            marginTop: 0,
                            marginBottom: 10,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 5
                        }}
                    >
                        <Picker
                            selectedValue={this.state.category}
                            onValueChange={(value) => { this.setCategory(value) }}
                        >
                            <Picker.Item label="카테고리를 선택해주세요." value="select" />
                            {Pickers}
                        </Picker>
                    </View>
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
