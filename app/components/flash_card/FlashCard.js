/**
 * ScreenPlayCards class
 * gets flash card from http://flash_cards.dtrajko-vm/cards/json
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TouchableHighlight, Alert, Image} from 'react-native';

export default class FlashCard extends Component<{}> {

    constructor() {
        super();
        this.state = {};
        // voc_options = this.getMoviesFromApiAsync();
        // Alert.alert(voc_options.toString());
    }

    getMoviesFromApiAsync() {
        return fetch('http://flash_cards.dtrajko-vm/cards/json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.voc_options;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    onPressButton() {
        Alert.alert('Button pressed');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.section_picture}>
                    <Image
                        style={styles.term_image}
                        source={require('../../../resources/images/terms/1509173535.jpg')} />
                </View>

                <View style={styles.section_language}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image
                                style={styles.flag_image}
                                source={require('../../../resources/images/flags/1507986530.jpg')} />
                        </View>
                        <View style={styles.section_language_text_view}>
                            <Text style={styles.section_language_text}>Français</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section_buttons}>

                    <TouchableHighlight onPress={this.onPressButton}
                        underlayColor="white">
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>die Schachtel</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton}
                        underlayColor="white">
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>die Gebäude</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton}
                        underlayColor="white">
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>die Uhr</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton}
                        underlayColor="white">
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>das Fahrrad</Text>
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
    },
    section_picture: {
        flex: 8,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    section_language: {
        flex: 2,
        backgroundColor: '#EEE',
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 6,
    },
    flag_image: {
        width: 90,
        height: 50,
    },
    section_language_text_view: {
        marginLeft: 10,
        paddingTop: 10,
    },
    section_language_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section_buttons: {
        flex: 12,
        alignSelf: 'stretch',
        marginTop: 10,
    },
    play_button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 16,
        margin: 4,
        marginTop: 0,
    },
    play_button_text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

AppRegistry.registerComponent('FlashCard', () => FlashCard);
