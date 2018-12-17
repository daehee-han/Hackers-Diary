import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button } from 'react-native';

export default class App extends Component {
    logout = () => {
        alert("Logout");
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", width:300, alignSelf:"center" }}>
                <TouchableOpacity onPress={() => { this.logout() }}>
                    <View style={styles.button}>
                        <Text style={{ alignSelf: "center", color: "#fff" }}>로그아웃</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        paddingTop : 20,
        paddingBottom : 20,
        paddingLeft : 40,
        paddingRight : 40,
        backgroundColor: "#ff5959",
        borderRadius:5,
        
    }
});
