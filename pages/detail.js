import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Text>Detail Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view : {
        padding : 10,
        backgroundColor : "#fff"
    }
});
