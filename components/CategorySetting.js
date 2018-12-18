import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from "react-native-modal";
const SharedPreferences = require('react-native-shared-preferences');
import Axios from 'axios';
const JEnum = require('../enum')

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible : false,
            title : "",
            categories : [],
            selected:{}
        }
        this.loadCategory();
    }
    loadCategory = () => {
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.category + "/" + value)
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                this.setState({
                    categories : res.data.data ? res.data.data : []
                })
                return;
            });
        })        
    }
    newCategory = () => {
        SharedPreferences.getItem("token", (value) => {
            Axios.post(JEnum.newCategory + "/" + value, {category: this.state.title})
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                alert("카테고리를 추가하였습니다.");
                this.setState({
                    title : ""
                })
                this.loadCategory();
                return;
            });
        })
    }
    removeCategory = () => {
        const id = this.state.selected._id;
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.removeCategory + "/" + value + "/" + id)
            .then(res => {
                if(!res.data.status) {
                    alert(res.data.message);
                    return;
                }
                alert("카테고리를 삭제하였습니다.");
                this.loadCategory();
                this.setState({
                    isModalVisible: false
                })
                return;
            });
        })
    }
    render() {
        
        const Categories = []
        for(let i = 0; i < this.state.categories.length; i++) {
            Categories.push((
                <TouchableOpacity onPress={() => { this.setState({isModalVisible: true, selected:this.state.categories[i]}); }}>
                    <View style={{ padding: 15, flexDirection: 'row', borderBottomColor: "#eee", borderBottomWidth: 1 }}>
                        <View>
                            <Text style={{ fontSize: 18 }}>{this.state.categories[i].category}</Text>
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
                    <View style={{borderWidth:1, borderColor:"#eee", padding:10, marginTop:10,}}>
                        <Text style={{fontSize:10, fontWeight:"bold"}}>카테고리 명</Text>
                        <TextInput
                            placeholder="카테고리 명"
                            style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, padding: 5, borderBottomColor: "#aaa" }}
                            onChangeText={(text) => this.setState({ title: text })}
                            value={this.state.text}
                        />
                        <TouchableOpacity onPress={() => { this.newCategory(); }}>
                            <View style={styles.button}>
                                <Text style={{ alignSelf: "center" }}>카테고리 생성</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10, borderColor: "#eee", borderWidth: 1}}>
                        {Categories}
                    </View>
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ width: 300, padding: 15, backgroundColor: "#fff", borderRadius: 10, alignSelf:"center" }}>
                        <Text style={{ fontSize: 21 }}>{this.state.selected.category}</Text>
                        <Text style={{ fontSize: 16 }}>정말로 삭제하시겠습니까?</Text>
                        <TouchableOpacity onPress={() => { this.removeCategory() }}>
                            <View style={[styles.button, {backgroundColor: "#ff5959", borderWidth: 0}]}>
                                <Text style={{ alignSelf: "center", color: "#fff" }}>삭제하기</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({isModalVisible: false}); }}>
                            <View style={styles.button}>
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
