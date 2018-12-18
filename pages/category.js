import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, ScrollView } from 'react-native';
import Feeds from '../components/feeds';
const SharedPreferences = require('react-native-shared-preferences');
import Axios from 'axios';
const JEnum = require('../enum')

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category : "select",
            categories : []
        }
    
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

    getFeeds = (callback) => {
        SharedPreferences.getItem("token", (value) => {
            Axios.get(JEnum.cateFeed + "/" + value + "/" + this.state.category)
            .then(res => {
                callback(res);
                return;
            });
        })        
    }

    render() {

        const Pickers = []
        for(let i=0;i<this.state.categories.length;i++) {
            Pickers.push((
                <Picker.Item label={this.state.categories[i].category} value={this.state.categories[i]._id} />
            ))
        }


        return (
            <View>
                <ScrollView>
                    <View
                        style={{
                            margin: 10,
                            marginBottom: 0,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 5
                        }}
                    >
                        <Picker
                            selectedValue={this.state.category}
                            onValueChange={(value) => { this.setState({ category: value }) }}
                        >
                            <Picker.Item label="카테고리를 선택해주세요." value="select" />
                            {Pickers}
                        </Picker>
                    </View>
                    {
                        (this.state.category === "select") ? (
                            <View
                                style={
                                    {
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 100
                                    }
                                }
                            >
                                <Text style={styles.text}>카테고리를 선택해주세요.</Text>
                            </View>
                        ) : (
                                <View>
                                    <Feeds getFeeds={this.getFeeds} change={this.props.change} data={this.props.data} isFlex={false} test={this.state.category} />
                                </View>
                            )
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
