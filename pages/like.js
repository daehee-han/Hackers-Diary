import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Feeds from '../components/feeds';
import Axios from 'axios';
const SharedPreferences = require('react-native-shared-preferences');
const JEnum = require('../enum')

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    getFeeds = (callback) => {
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.likeRSS, {
                headers: {
                    Cookie: "hacker=" + value + ";"
                }
            })
            .then(res => {
                callback(res);
            });
        })
    }
    render() {
        return (
            <Feeds getFeeds={this.getFeeds} change={this.props.change} data={this.props.data}/>
        );
    }
}
