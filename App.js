
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import main from './pages/main'
import detail from './pages/detail'

export default class App extends Component {
    screens = {
        'main': main,
        'detail': detail
    }
    state = {
        screen: this.screens['main'],
    }
    changeScreen(key) {
        this.setState({
            screen: this.screens[key]
        })
    }

    render() {
        return (
            <View>
                <View style={styles.topMenu}>
                    <View style={styles.topButton}></View>
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>Hacker's Diary</Text>
                    </View>
                    <View style={styles.topButton}></View>
                </View>
                <View style={styles.contents}>
                    <this.state.screen></this.state.screen>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topMenu : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        padding : 10,
        backgroundColor : '#3498d8'
    },
    topButton : {
        width : 40,
        height : 40,
        backgroundColor : '#2980b9',
        padding : 5
    },
    contents : {
        padding : 10,
    },
    logo : {
        marginTop : 2
    },
    logoText : {
        fontSize : 20,
        color : '#fff',
    }
});
