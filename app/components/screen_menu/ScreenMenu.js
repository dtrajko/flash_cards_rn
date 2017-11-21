/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';

export default class ScreenMenu extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Menu'
    }

    constructor() {
        super();
        this.state = {};
    }

    screenPlayCards() {

    }

    render() {
        var {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.container_top}>
                    <Text style={styles.flash_cards_text}>Flash Cards</Text>
                </View>
                <View style={styles.container_bottom}>
                    <TouchableHighlight onPress={() => navigate("ScreenPlayCards", {})}
                        underlayColor="white">
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>Play Cards</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
    },
    container_top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_bottom: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flash_cards_text: {
        color: '#2196F3',
        fontSize: 48,
        fontWeight: 'bold',
    },
    play_button: {
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
    },
    play_button_text: {
        padding: 10,
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    }
});

AppRegistry.registerComponent('ScreenMenu', () => ScreenMenu);
