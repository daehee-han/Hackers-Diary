
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import login from './pages/login';
import register from './pages/register';
import main from './pages/main';
import detail from './pages/detail';
import SideBar from './components/SideBar';
import { Drawer, Icon } from 'react-native-elements';
const SharedPreferences = require('react-native-shared-preferences');

export default class App extends Component {

    constructor(props) {
        super(props);
        SharedPreferences.getItem("isLogin", (value) => {
            this.changeScreen('main');
        })
        this.state = {
            screens : {
                'login' : login,
                'register' : register,
                'main': main,
                'detail': detail,
            },
            screen: main,
            login : true,
            register : false,
            loginScreen : login,
            registerScreen : register
        }
    }

    changeScreen = (key) => {
        let login = false;
        let register = false;
        if(key === "login") {
            login = true;
        } else if(key === "register") {
            register = true;
        }
        this.setState({
            screen: this.state.screens[key],
            login: login,
            register: register
        })
    }

    render() {
        if(this.state.login) {
            return (
                <View style={styles.view}>
                    <this.state.loginScreen change={this.changeScreen}/>
                </View>
            );    
        } else if(this.state.register) {
            return (
                <View style={styles.view}>
                    <this.state.registerScreen change={this.changeScreen}/>
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
                            <this.state.screen change={this.changeScreen}/>
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
