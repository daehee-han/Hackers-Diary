import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SearchBar, Icon, Text } from 'react-native-elements';
const SharedPreferences = require('react-native-shared-preferences');
import TabNavigator from 'react-native-tab-navigator';
import Modal from "react-native-modal";

import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Detail from './pages/detail';
import Category from './pages/category';
import Like from './pages/like';
import Setting from './pages/setting';
import Follow from './pages/follow';

import CategorySetting from './components/CategorySetting';

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
                'detail' : Detail,
                'categorySetting' : CategorySetting,
            },
            screen: Login,
            hide: true,
            selectedTab : "timeline",
            isModal : false,
            modal : CategorySetting
        }
    }

    changeScreen = (key, data="") => {
        let hide = false;
        let isModal = false;
        if(key === "login" || key === "register") {
            hide = true;
        }
        if(key === "detail" || key === "categorySetting") {
            isModal = true;
            this.setState({
                modal: this.state.screens[key]
            })
            key = this.state.selectedTab;
        }
        this.setState({
            screen: this.state.screens[key],
            selectedTab : key,
            hide: hide,
            data: data,
            isModal: isModal,
        })
    }

    openModal = () => {
        this.changeScreen("categorySetting", {title:"카테고리 설정"})
        this.setState({
            isModal: true,
        })
    }

    closeModal = () => {
        this.setState({
            isModal: false,
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
                        <Image source={require('./images/logo2.png')} style={{height:20,marginTop:7,marginLeft:-40}} resizeMode="contain"/>
                        <View style={[styles.topButton, {marginLeft:-40}]}>
                            <TouchableOpacity onPress={this.openModal}>
                                <Icon name="playlist-add-check" color="#fff" style={{padding:12}} size={30}/>
                            </TouchableOpacity>
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
                            {/* <TabNavigator.Item
                                selected={this.state.selectedTab === 'follow'}
                                renderIcon={() => <Icon name="person" color="#999"/>}
                                renderSelectedIcon={() => <Icon name="person" color="#3498d8"/>}
                                onPress={() => this.setState({ selectedTab: 'follow' })}
                            ><View/></TabNavigator.Item> */}
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
                            <View style={[styles.modal, {height:Dimensions.get('screen').height-53}]}>
                                <View style={[styles.topMenu,{flexDirection: 'row', justifyContent: 'flex-start'}]}>
                                    <TouchableOpacity onPress={() => { this.setState({isModal:false}) }}>
                                        <Icon name="arrow-back" color="#fff"/>
                                    </TouchableOpacity>
                                    <Text style={{marginLeft:10,fontSize:16,color:"#fff"}}>{this.state.data.title}</Text>
                                </View>
                                <this.state.modal change={this.changeScreen} data={this.state.data}/>
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
