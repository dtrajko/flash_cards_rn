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
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#2196F3',
        paddingBottom: 30,
    },
    container_bottom: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
    },
    flash_cards_text: {
        color: '#EEE',
        fontSize: 60,
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
