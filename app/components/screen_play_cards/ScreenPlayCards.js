/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class ScreenPlayCards extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Play Cards'
    }

    render() {
        return (
            <View>
                <Text>Screen Play Cards</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ScreenPlayCards', () => ScreenPlayCards);
