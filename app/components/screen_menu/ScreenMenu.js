/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableHighlight, Alert, ImageBackground} from 'react-native';
import styles from './ScreenMenu_css';

export default class ScreenMenu extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Menu'
    }

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../../../resources/images/wallpaper.jpg')} style={styles.backgroundImage}>

                    <View style={styles.container_top}>
                        <Text style={styles.flash_cards_text}>Flash Cards</Text>
                    </View>
                    <View style={styles.container_bottom}>
                        <TouchableHighlight onPress={() => navigate('ScreenPlayCards', {})}>
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

AppRegistry.registerComponent('ScreenMenu', () => ScreenMenu);
