/**
 * ScreenPlayCards class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight, Alert, Image} from 'react-native';
import FlashCard from '../flash_card/FlashCard';

export default class ScreenPlayCards extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Play Cards'
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section_flash_card}>
                    <FlashCard />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section_flash_card: {
        flex: 1,
        alignSelf: 'stretch',
    }
});

AppRegistry.registerComponent('ScreenPlayCards', () => ScreenPlayCards);
