/**
 * ScreenPlayCards class
 * gets flash card from http://flash_cards.dtrajko-vm/cards/json
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, Text, View, ScrollView, TouchableNativeFeedback, Alert, Image} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import ImagesIndex from '../../../resources/images/images_index';
import styles from './FlashCard_css';

let term_picture = '';

export default class FlashCard extends Component<{}> {

    constructor() {
        super();
        this.state = {
            iteration: 0,
            db: this.openDb(),
            stateIsSet: false,
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
        return SQLite.openDatabase({name: 'flash_cards.db', createFromLocation: '~flash_cards.db',
            location: 'Library'}, this.openCB, this.errorCB);
    }

    onPressButton() {

    }

    componentDidMount() {

        this.setState({ stateIsSet: false });

        this.state.db.transaction((tx) => {
            // get random term
            tx.executeSql("SELECT * FROM terms ORDER BY RANDOM() LIMIT 1", [], (tx, results) => {
                let term = results.rows.item(0);
                let term_name = term.name;
                let term_picture = term.picture.substr(0, term.picture.lastIndexOf('.')) || term.picture;
                this.setState({
                    term_name: term_name,
                    term_picture: term_picture,
                });
            });
        });

        this.state.db.transaction((tx) => {
            // get random language
            tx.executeSql("SELECT * FROM languages WHERE enabled = 1 ORDER BY RANDOM() LIMIT 1", [], (tx, results) => {
                let language = results.rows.item(0);
                let language_flag = language.flag.substr(0, language.flag.lastIndexOf('.')) || language.flag;
                let language_name = language.name;
                this.setState({
                    language_flag: language_flag,
                    language_name: language_name,
                });
            });
        });

        this.state.db.transaction((tx) => {

            // get 4 random vocabulary entries
            let sql = "SELECT v.* FROM vocabulary v" +
                " JOIN languages l ON v.language_id = l.id" +
                " WHERE l.enabled = 1 ORDER BY RANDOM() LIMIT 4";
            tx.executeSql(sql, [], (tx, results) => {

                this.setState({
                    voc_entry_0_id: results.rows.item(0).id,
                    voc_entry_1_id: results.rows.item(1).id,
                    voc_entry_2_id: results.rows.item(2).id,
                    voc_entry_3_id: results.rows.item(3).id,
                    voc_entry_0_translation: results.rows.item(0).translation,
                    voc_entry_1_translation: results.rows.item(1).translation,
                    voc_entry_2_translation: results.rows.item(2).translation,
                    voc_entry_3_translation: results.rows.item(3).translation,
                });
            });
        });

        this.state.db.transaction((tx) => {
            // get the correct entry
            let sql = "SELECT v.* FROM vocabulary v" +
                " JOIN languages l ON v.language_id = l.id" +
                " JOIN terms t ON v.term_id = t.id" +
                " WHERE l.enabled = 1 " +
                " AND l.name = '" + this.state.language_name + "'" +
                " AND t.name = '" + this.state.term_name + "'" +
                " LIMIT 1";
            console.log('voc_entry_correct_translation query: ' + sql);
            tx.executeSql(sql, [], (tx, results) => {
                let voc_entry_correct = results.rows.item(0);
                let voc_entry_correct_id = voc_entry_correct.id;
                let voc_entry_correct_translation = voc_entry_correct.translation;

                this.setState({
                    voc_entry_correct_id: voc_entry_correct_id,
                    voc_entry_correct_translation: voc_entry_correct_translation,
                });

                this.setState({ stateIsSet: true });
            });
        });
    }

    prepareVocOptions(voc_option_correct, voc_options_random) {
        var voc_options_result = [];
        var correct_in_array = false;
        for (var value_random in voc_options_random) {
            voc_options_result[value_random] = voc_options_random[value_random];
            if (voc_options_random[value_random][0] == voc_option_correct[0]) {
                correct_in_array = true;
            }
        };
        if (!correct_in_array) {
            voc_options_result = [];

            var index_to_replace = Math.floor(Math.random() * voc_options_random.length);
            console.log('prepareVocOptions voc_options_random.length: ' + voc_options_random.length);
            console.log('prepareVocOptions index_to_replace: ' + index_to_replace);
            var index_counter = 0;
            for (var value_random in voc_options_random) {
                if (index_counter == index_to_replace) {
                    voc_options_result[value_random] = voc_option_correct;
                } else {
                    voc_options_result[value_random] = voc_options_random[value_random];
                }
                index_counter++;
            };
        }
        for (var value_result in voc_options_result) {
            voc_options_result[value_result][2] = false;
            if (voc_options_result[value_result][0] == voc_option_correct[0]) {
                voc_options_result[value_result][2] = true;
            }
        };
        return voc_options_result;
    }

    componentDidUpdate() {
        if (this.state.stateIsSet) {
            // test prepareVocOptions()
            var voc_option_correct = [ this.state.voc_entry_correct_id, this.state.voc_entry_correct_translation ];
            var voc_options_random = [
                [ this.state.voc_entry_0_id, this.state.voc_entry_0_translation ],
                [ this.state.voc_entry_1_id, this.state.voc_entry_1_translation ],
                [ this.state.voc_entry_2_id, this.state.voc_entry_2_translation ],
                [ this.state.voc_entry_3_id, this.state.voc_entry_3_translation ],
            ];
            var voc_options_result = this.prepareVocOptions(voc_option_correct, voc_options_random);
            // console.log('componentDidUpdate voc_options_result: ' + JSON.stringify(voc_options_result));
            this.setState({
                voc_entry_0_translation: voc_options_result[0][1],
                voc_entry_1_translation: voc_options_result[1][1],
                voc_entry_2_translation: voc_options_result[2][1],
                voc_entry_3_translation: voc_options_result[3][1],
                stateIsSet: false,
            });
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.section_picture}>
                    <Image
                        style={styles.term_image}
                        resizeMode={'contain'}
                        source={ImagesIndex['term_image_' + this.state.term_picture]} />
                </View>

                <View style={styles.section_language}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View>
                            <Image
                                style={styles.flag_image}
                                source={ImagesIndex['flag_image_' + this.state.language_flag]} />
                        </View>
                        <View style={styles.section_language_text_view}>
                            <Text style={styles.section_language_text}>{this.state.language_name}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section_buttons}>

                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_entry_0_translation}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_entry_1_translation}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_entry_2_translation}</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.onPressButton}>
                        <View style={styles.play_button}>
                            <Text style={styles.play_button_text}>{this.state.voc_entry_3_translation}</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('FlashCard', () => FlashCard);
