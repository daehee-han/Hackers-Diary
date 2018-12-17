import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Feeds from '../components/feeds';
import Axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    getFeeds = (callback) => {
        Axios.get("http://mungsul.tistory.com/rss")
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