
import React, { Component } from 'react';
import { StyleSheet, Button,Text, View, Dimensions, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Detail from './pages/detail';
import Category from './pages/category';
import Like from './pages/like';
import Setting from './pages/setting';
import Follow from './pages/follow';

import { SearchBar, Icon } from 'react-native-elements';
const SharedPreferences = require('react-native-shared-preferences');
import TabNavigator from 'react-native-tab-navigator';

export default class App extends Component {

    constructor(props) {
        super(props);
        SharedPreferences.getItem("isLogin", (value) => {
            this.changeScreen('timeline');
        })
        this.state = {
            screens : {
                'login' : Login,
                'register' : Register,
                'timeline' : Main,
                'category' : Category,
                'like' : Like,
                'follow' : Follow,
                'setting' : Setting,
                'detail' : Detail
            },
            screen: Login,
            hide: true,
            selectedTab : "timeline",
            isModal : false
        }
    }

    changeScreen = (key, data="") => {
        let hide = false;
        let isModal = false;
        if(key === "login") {
            hide = true;
        } else if(key === "register") {
            register = true;
        }
        if(key === "detail") {
            isModal = true;
            key = this.state.selectedTab;
        }
        this.setState({
            screen: this.state.screens[key],
            selectedTab : key,
            hide: hide,
            data: data,
            isModal: isModal
        })
    }

    render() {
        if(this.state.hide) {
            return (
                <View style={styles.view}>
                    <this.state.screen change={this.changeScreen} data={this.state.data}/>
                </View>
            );
        } else {
            CurrentScreen = this.state.screens[this.state.selectedTab]
            return (
                <View style={styles.view}>
                    <View style={styles.topMenu}>
                        <View style={styles.topButton}>
                            <Image source={require('./images/logo.png')} style={{width:32,height:32}} resizeMode="contain"/>
                        </View>
                        <View style={styles.logo}>
                            <SearchBar
                                onChangeText={() => { }}
                                onClearText={() => { }}
                                placeholder='검색'
                                lightTheme
                                containerStyle={{
                                    backgroundColor: '#3498d8',
                                    borderColor: '#3498d8',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0,
                                    padding: 0,
                                    marginTop : -15,
                                    marginBottom : 0,
                                    width: Dimensions.get('window').width - 90
                                }}
                                inputStyle={{
                                    borderWidth: 0,
                                    backgroundColor: '#3498d8',
                                    color: '#fff',
                                    borderBottomColor: "#24648B",
                                    borderBottomWidth: 1,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginBottom : 0
                                }}
                                placeholderTextColor="#eee"
                                icon={{ color: '#145D8B' }}
                            />
                        </View>
                        <View style={styles.topButton}>
                            <Image source={require('./images/logo.png')} style={{width:32,height:32}} resizeMode="contain"/>
                        </View>
                    </View>
                    <View style={{marginTop:49}}>
                        <TabNavigator>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'timeline'}
                                renderIcon={() => <Icon name="image" type="font-awesome" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="image" type="font-awesome" color="#3498d8"/>}
                                badgeText="1"
                                onPress={() => this.setState({ selectedTab: 'timeline' })}
                            ><View/></TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'like'}
                                renderIcon={() => <Icon name="heart" type="font-awesome" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="heart" type="font-awesome" color="#ff5959"/>}
                                onPress={() => this.setState({ selectedTab: 'like' })}
                            ><View/></TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'category'}
                                renderIcon={() => <Icon name="table-large" type="material-community" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="table-large" type="material-community" color="#3498d8"/>}
                                onPress={() => this.setState({ selectedTab: 'category' })}
                            ><View/></TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'follow'}
                                renderIcon={() => <Icon name="person" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="person" color="#3498d8"/>}
                                onPress={() => this.setState({ selectedTab: 'follow' })}
                            ><View/></TabNavigator.Item>
                            <TabNavigator.Item
                                selected={this.state.selectedTab === 'setting'}
                                renderIcon={() => <Icon name="settings" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="settings" color="#3498d8"/>}
                                onPress={() => this.setState({ selectedTab: 'setting' })}
                            ><View/></TabNavigator.Item>
                        </TabNavigator>
                    </View>
                    <View>
                        <View style={styles.innerContent}>
                            <CurrentScreen change={this.changeScreen} data={this.state.data}/>
                        </View>
                    </View>
                    {
                        this.state.isModal ? (
                            <View style={[styles.modal, {height:Dimensions.get('screen').height-64.7}]}>
                                <View style={[styles.topMenu,{flexDirection: 'row', justifyContent: 'flex-start'}]}>
                                    <TouchableWithoutFeedback onPress={() => { this.setState({isModal:false}) }}>
                                        <Icon name="arrow-back" color="#fff"/>
                                    </TouchableWithoutFeedback>
                                    <Text style={{marginLeft:10,fontSize:16,color:"#fff"}}>"울지않는 벌새" 블로그</Text>
                                </View>
                                <Detail change={this.changeScreen} data={this.state.data}/>
                            </View>
                        ) : (
                            <View>
                            </View>
                        )
                    }
                </View>
            );    
        }
    }
}

const styles = StyleSheet.create({
    modal : {
        backgroundColor:"#fff",
        width:Dimensions.get('screen').width,
        position:'absolute',
        top:0,
        left:0,
        paddingBottom:20
    },
    view : {
        backgroundColor : '#f2f2f2',
    },
    topMenu : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        padding : 10,
        backgroundColor : '#3498d8'
    },
    contents : {
        padding : 10,
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
    },
    innerContent: {
        height: Dimensions.get('screen').height - 176,
        backgroundColor: "#eee"
    }
});
