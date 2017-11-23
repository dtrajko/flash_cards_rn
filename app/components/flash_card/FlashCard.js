/**
 * ScreenPlayCards class
 * gets flash card from http://flash_cards.dtrajko-vm/cards/json
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, Text, View, TouchableNativeFeedback, Alert, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import ImagesIndex from '../../../resources/images/images_index';
import styles from './FlashCard_css';

export default class FlashCard extends Component<{}> {

    constructor() {
        super();
        const responseJson = this.getCardDataFromApiAsync();
        this.state = {
            db: this.openDb(),
        }
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }

    openDb() {
        return SQLite.openDatabase('../../../resources/db/flash_cards.db', '1.0', 'Flash Cards Database', 20, this.openCB, this.errorCB);
    }

    queryDb() {
        this.state.db.transaction((tx) => {
            tx.executeSql("SELECT * FROM terms", [], (tx, results) => {
                console.log("Query completed");

                // Get rows with Web SQL Database spec compliance.
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    console.log(`Term name: ${row.name}, Term picture: ${row.picture}`);
                }
            });
        });
    }

    componentDidMount() {
        this.queryDb();
    }

    getCardDataFromApiAsync() {
        return fetch('https://raw.githubusercontent.com/dtrajko/flash_cards_rn/master/resources/flash_card.json')
        .then((response) => response.json())
        .then((responseJson) => {
            var picture_with_ext = responseJson.term.picture;
            var flag_with_ext = responseJson.language.flag;

            this.setState({picture: picture_with_ext.substr(0, picture_with_ext.lastIndexOf('.')) || picture_with_ext});
            this.setState({flag: flag_with_ext.substr(0, flag_with_ext.lastIndexOf('.')) || flag_with_ext});
            this.setState({language: responseJson.language.name});
            this.setState({voc_option_0: responseJson.voc_options[0].translation});
            this.setState({voc_option_1: responseJson.voc_options[1].translation});
            this.setState({voc_option_2: responseJson.voc_options[2].translation});
            this.setState({voc_option_3: responseJson.voc_options[3].translation});
            console.log('term_image_' + this.state.picture);
            return responseJson;
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
                        source={ImagesIndex['term_image_' + this.state.picture]} />
                </View>

                <View style={styles.section_language}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image
                                style={styles.flag_image}
                                source={ImagesIndex['flag_image_' + this.state.flag]} />
                        </View>
                        <View style={styles.section_language_text_view}>
                            <Text style={styles.section_language_text}>{this.state.language}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section_buttons}>

                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_option_0}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_option_1}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_option_2}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_option_3}</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('FlashCard', () => FlashCard);
