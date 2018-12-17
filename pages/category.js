import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, ScrollView } from 'react-native';
import Feeds from '../components/feeds';
import Axios from 'axios';

export default class App extends Component {

    state = {
        category: "select"
    }

    getFeeds = (callback) => {
        Axios.get("http://mungsul.tistory.com/rss")
        .then(res => {
            callback(res);
        });
    }

    render() {
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
                            <Picker.Item label="Steve" value="steve" />
                            <Picker.Item label="Ellen" value="ellen" />
                            <Picker.Item label="Maria" value="maria" />
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
                                    <Feeds getFeeds={this.getFeeds} change={this.props.change} data={this.props.data} isFlex={false} />
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
