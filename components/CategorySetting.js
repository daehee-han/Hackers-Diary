import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from "react-native-modal";

export default class App extends Component {
    state = {
        isModalVisible : false,
        selected: "Web hacking - XSS"
    }
    render() {
        const Categories = []
        for(let i = 0; i < 50; i++) {
            Categories.push((
                <TouchableOpacity onPress={() => { this.setState({isModalVisible: true}); }}>
                    <View style={{ padding: 15, flexDirection: 'row', borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                        <View>
                            <Text style={{ fontSize: 18 }}>HIHI</Text>
                            <Text style={{ fontSize: 10 }}>카테고리에 있는 Feed : 100</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        }
        return (
            <ScrollView style={{height:Dimensions.get('screen').height-30}}>
                <View style={{padding : 20, marginBottom: 20}}>
                    <Text h4>카테고리 설정</Text>
                    <Text>카테고리를 추가하거나 삭제합니다.</Text>
                    <View>
                    </View>
                    <View style={{marginTop:10, borderColor: "#eee", borderWidth: 1}}>
                        {Categories}
                    </View>
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ width: 300, padding: 15, backgroundColor: "#fff", borderRadius: 10, alignSelf:"center" }}>
                        <Text style={{ fontSize: 21 }}>{this.state.selected}</Text>
                        <Text style={{ fontSize: 16 }}>정말로 삭제하시겠습니까?</Text>
                        <View style={[styles.button, {backgroundColor: "#ff5959", borderWidth: 0}]} onPress={() => { this.setState({ isModalVisible: false }) }}>
                            <Text style={{ alignSelf: "center", color: "#fff" }}>삭제하기</Text>
                        </View>
                        <TouchableOpacity onPress={() => { this.setState({isModalVisible: false}); }}>
                            <View style={styles.button} onPress={() => { this.setState({ isModalVisible: false }) }}>
                                <Text style={{ alignSelf: "center" }}>취소하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button : {
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft: 20,
        paddingRight : 20,
        borderRadius : 5,
        borderWidth : 1,
        borderColor : "#ccc",
        backgroundColor : "#fff",
        marginTop : 5,
    }
});
