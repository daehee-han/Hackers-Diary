import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Icon, Text } from 'react-native-elements';

export default class App extends Component {
    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={this.props.close()}>
                        <Icon name="arrow-back" style={{ padding: 10 }} />
                    </TouchableWithoutFeedback>
                    <Text h4 style={{ marginLeft: 10, marginTop: -5 }}>카테고리 설정</Text>
                </View>
                <Text>카테고리를 추가하거나 삭제합니다.</Text>
                <ScrollView>
                    <View style={{ padding: 15, }}>
                        <Text style={{ fontSize: 18 }}>HIHI</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
