/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import main from './pages/main'
import detail from './pages/detail'

export default class App extends Component {
  screens = {
    'main' : main,
    'detail' : detail
  }
  state = {
    screen : this.screens['main'],
    position : {
      position : "absolute",
      left : 10,
      top : 10,
      backgroundColor :"#313131"
    }
  }
  changeScreen(key) {
    this.setState({
      screen : this.screens[key]
    })
  }
  move(){
    let timer = setInterval(() => {
      left = this.state.position.left + 1
      top = this.state.position.top + 1
      this.setState({
        position : {
          position : "absolute",
          left : left,
          top : top
        }
      })  
    }, 1);
    // left = this.state.position.left
    // top = this.state.position.top
    // if(left == 100 || top == 100) {
    // } else {
    //   this.setPosition(left+2, top+2)
    //   setTimeout(()=>{
    //     this.move()
    //   }, 0.0001);
    // }
  }

  setPosition(left, top) {
    left = this.state.position.left + 1
    top = this.state.position.top + 1
    this.setState({
      position : {
        position : "absolute",
        left : left,
        top : top
      }
    })  
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button title="Main" onPress={(e)=>{this.changeScreen('main')}}/>
        <Button title="Detail" onPress={(e)=>{this.changeScreen('detail')}}/>
        <Button title="Animation" onPress={(e)=>{this.move()}}/>
        <View style={this.state.position}><this.state.screen></this.state.screen></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
