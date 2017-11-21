/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ScreenMenu from './app/components/screen_menu/ScreenMenu';
import ScreenPlayCards from './app/components/screen_play_cards/ScreenPlayCards';

const Navigation = StackNavigator({
    ScreenMenu: {screen: ScreenMenu},
    ScreenPlayCards: {screen: ScreenPlayCards},
});

export default Navigation;

/**
export default class App extends Component<{}> {

    render() {
        return (
            <View style={styles.container}>
                <ScreenMenu />
            </View>
        );
    }
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
