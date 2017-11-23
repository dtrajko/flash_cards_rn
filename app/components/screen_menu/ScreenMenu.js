/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableHighlight, Alert, ImageBackground} from 'react-native';

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

                <ImageBackground source={require('../../../resources/images/wallpaper.jpg')} style={styles.backgroundImage}>

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

                </ImageBackground>

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
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#000',
        paddingBottom: 0,
        opacity: 0.5,
    },
    container_bottom: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
    },
    flash_cards_text: {
        color: '#FFF',
        fontSize: 60,
        fontWeight: 'bold',
        opacity: 2,
        padding: 0,
    },
    play_button: {
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        paddingBottom: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#3366cc',
        opacity: 0.8,
    },
    play_button_text: {
        padding: 10,
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center',
    }
});

AppRegistry.registerComponent('ScreenMenu', () => ScreenMenu);
