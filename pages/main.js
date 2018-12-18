import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Feeds from '../components/feeds';
import Axios from 'axios';
const JEnum = require('../enum')

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    getFeeds = (callback) => {
        Axios.get(JEnum.recentRSS)
        .then(res => {
            callback(res);
        });
    }
    render() {
        return (
            <Feeds getFeeds={this.getFeeds} change={this.props.change} data={this.props.data}/>
        );
    }
}
