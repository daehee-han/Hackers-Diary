
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import login from './pages/login';
import main from './pages/main';
import detail from './pages/detail';
import SideBar from './components/SideBar';
import { Drawer, Icon } from 'react-native-elements';

export default class App extends Component {
    screens = {
        'login' : login,
        'main': main,
        'detail': detail,
    }
    state = {
        screen: this.screens['main'],
        login : true,
        loginScreen : login
    }
    changeScreen(key) {
        this.setState({
            screen: this.screens[key]
        })
    }

    render() {
        if(this.state.login) {
            return (
                <View style={styles.view}>
                    <this.state.loginScreen/>
                </View>
            );    
        } else {
            return (
                <View style={styles.view}>
                    <View style={styles.topMenu}>
                        <View style={styles.topButton}>
                            <Icon name="menu" color="white"/>
                        </View>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>Hacker's Diary</Text>
                        </View>
                        <View style={styles.topButton}>
                            <Icon name="search" color="white"/>
                        </View>
                    </View>
                    <View style={styles.contents}>
                        <ScrollView style={{ height: Dimensions.get('window').height - 104 }}>
                            <this.state.screen></this.state.screen>
                            <View style={styles.footer}>
                                <View>
                                    <Text style={{ color: '#ffffff' }}>Copyright (c) Hacker's Diary & Blogger</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#ffffff' }}>Thanks to kjkwak12@gmail.com</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );    
        }
    }
}

const styles = StyleSheet.create({
    view : {
        backgroundColor : '#f2f2f2',
    },
    topMenu : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        padding : 10,
        backgroundColor : '#3498d8'
    },
    topButton : {
        backgroundColor : '#2980b9',
        padding : 10
    },
    contents : {
        padding : 10,
    },
    logo : {
        marginTop : 10
    },
    logoText : {
        fontSize : 20,
        color : '#fff',
    },
    footer : {
        justifyContent : "center",
        padding : 10,
        marginTop : 10,
        backgroundColor : '#313131',
    }
});
