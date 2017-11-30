/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, ScrollView} from 'react-native';
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
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <ImageBackground source={require('../../../resources/images/wallpaper.jpg')} style={styles.backgroundImage}>
                        <View style={styles.container_top}>
                            <Text style={styles.flash_cards_text}>Flash Cards</Text>
                        </View>
                        <View style={styles.container_bottom}>
                            <TouchableOpacity onPress={() => navigate('ScreenPlayCards', {})}>
                                <View style={styles.play_button}>
                                    <Text style={styles.play_button_text}>Play Cards</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('ScreenLanguages', {})}>
                                <View style={[styles.play_button, styles.languages_button]}>
                                    <Text style={styles.play_button_text}>Languages</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigate('ScreenAbout', {})}>
                                <View style={[styles.play_button, styles.about_button]}>
                                    <Text style={styles.play_button_text}>About</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('ScreenMenu', () => ScreenMenu);
