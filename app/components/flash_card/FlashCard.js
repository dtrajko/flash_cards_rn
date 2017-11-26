/**
 * ScreenPlayCards class
 * gets flash card from http://flash_cards.dtrajko-vm/cards/json
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, Text, View, ScrollView, TouchableOpacity, Alert, Image} from 'react-native';
import ImagesIndex from '../../../resources/images/images_index';
import styles from './FlashCard_css';
import SQLite from 'react-native-sqlite-storage';
import Modal from 'react-native-modal';


export default class FlashCard extends Component<{}> {

    constructor() {
        super();
        this.state = {
            db: this.openDb(),
            fetchDbTermStarted: false,
            fetchDbLanguageStarted: false,
            fetchDbVocRandomStarted: false,
            fetchDbVocCorrectStarted: false,
            fetchDbTermComplete: false,
            fetchDbLanguageComplete: false,
            fetchDbVocRandomComplete: false,
            fetchDbVocCorrectComplete: false,
            processFetchedDataComplete: false,
            isModalVisible: false,
            isAnswerCorrect: false,
            modalMessage: '',
        }
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

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

    componentDidMount() {
        this.updateScore(0); // reset the score
        this.fetchAndProcessData();
    }

    componentDidUpdate() {
        this.fetchAndProcessData();
    }

    resetSemaphores() {
        this.setState({
            fetchDbTermStarted: false,
            fetchDbLanguageStarted: false,
            fetchDbVocRandomStarted: false,
            fetchDbVocCorrectStarted: false,
            fetchDbTermComplete: false,
            fetchDbLanguageComplete: false,
            fetchDbVocRandomComplete: false,
            fetchDbVocCorrectComplete: false,
            processFetchedDataComplete: false,
        });
    }

    fetchAndProcessData() {

        console.log('fetchAndProcessData');

        if (!this.state.fetchDbTermStarted && !this.state.fetchDbTermComplete) {
            this.fetchDbTerm();
        }

        if (!this.state.fetchDbLanguageStarted && !this.state.fetchDbLanguageComplete) {
            this.fetchDbLanguage();
        }

        if (!this.state.fetchDbVocRandomStarted && !this.state.fetchDbVocRandomComplete) {
            this.fetchDbVocRandom();
        }

        if (!this.state.fetchDbVocCorrectStarted && !this.state.fetchDbVocCorrectComplete) {
            this.fetchDbVocCorrect();
        }

        if (this.state.fetchDbTermComplete &&
            this.state.fetchDbLanguageComplete &&
            this.state.fetchDbVocRandomComplete &&
            this.state.fetchDbVocCorrectComplete &&
            !this.state.processFetchedDataComplete) {
            this.processFetchedData();
        }
    }

    fetchDbTerm() {
        this.setState({ fetchDbTermStarted: true });
        this.state.db.transaction((tx) => {
            // get random term
            tx.executeSql("SELECT * FROM terms ORDER BY RANDOM() LIMIT 1", [], (tx, results) => {
                let term = results.rows.item(0);
                let term_id = term.id;
                let term_name = term.name;
                let term_picture = term.picture.substr(0, term.picture.lastIndexOf('.')) || term.picture;
                this.setState({
                    term_id: term_id,
                    term_name: term_name,
                    term_picture: term_picture,
                    fetchDbTermComplete: true,
                });
                console.log('fetchDbTerm::fetchDbTermComplete');
            });
        });
    }

    fetchDbLanguage() {
        this.setState({ fetchDbLanguageStarted: true });
        this.state.db.transaction((tx) => {
            // get random language
            tx.executeSql("SELECT * FROM languages WHERE enabled = 1 ORDER BY RANDOM() LIMIT 1", [], (tx, results) => {
                let language = results.rows.item(0);
                let language_id = language.id;
                let language_flag = language.flag.substr(0, language.flag.lastIndexOf('.')) || language.flag;
                let language_name = language.name;
                this.setState({
                    language_id: language_id,
                    language_flag: language_flag,
                    language_name: language_name,
                    fetchDbLanguageComplete: true,
                });
                console.log('fetchDbLanguage::fetchDbLanguageComplete');
            });
        });
    }

    fetchDbVocRandom() {
        this.setState({ fetchDbVocRandomStarted: true });
        this.state.db.transaction((tx) => {
            // get 4 random vocabulary entries
            let sql = "SELECT v.* FROM vocabulary v" +
                " JOIN languages l ON v.language_id = l.id" +
                " WHERE l.enabled = 1" +
                " AND l.name = '" + this.state.language_name + "'" +
                " ORDER BY RANDOM() LIMIT 4";
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
                    fetchDbVocRandomComplete: true,
                });
                console.log('fetchDbVocRandom::fetchDbVocRandomComplete');
            });
        });
    }

    fetchDbVocCorrect() {
        this.setState({ fetchDbVocCorrectStarted: true });
        this.state.db.transaction((tx) => {
            // get the correct entry
            let sql = "SELECT v.* FROM vocabulary v" +
                " JOIN languages l ON v.language_id = l.id" +
                " JOIN terms t ON v.term_id = t.id" +
                " WHERE l.enabled = 1 " +
                " AND l.name = '" + this.state.language_name + "'" +
                " AND t.name = '" + this.state.term_name + "'" +
                " LIMIT 1";
            // console.log('voc_entry_correct_translation query: ' + sql);
            tx.executeSql(sql, [], (tx, results) => {
                let voc_entry_correct = results.rows.item(0);
                let voc_entry_correct_id = voc_entry_correct.id;
                let voc_entry_correct_translation = voc_entry_correct.translation;
                this.setState({
                    voc_entry_correct_id: voc_entry_correct_id,
                    voc_entry_correct_translation: voc_entry_correct_translation,
                    fetchDbVocCorrectComplete: true,
                });
                console.log('fetchDbVocCorrect::fetchDbVocCorrect');
            });
        });
    }

    processFetchedData() {
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
            voc_entry_0_id: voc_options_result[0][0],
            voc_entry_1_id: voc_options_result[1][0],
            voc_entry_2_id: voc_options_result[2][0],
            voc_entry_3_id: voc_options_result[3][0],
            voc_entry_0_translation: voc_options_result[0][1],
            voc_entry_1_translation: voc_options_result[1][1],
            voc_entry_2_translation: voc_options_result[2][1],
            voc_entry_3_translation: voc_options_result[3][1],
            processFetchedDataComplete: true,
        });
        console.log('processFetchedData::processFetchedDataComplete');
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

    checkAnswer(term_id, language_id, vocabulary_id) {
        // check the submitted answer
        this.state.db.transaction((tx) => {
            // check the answer
            let sql = "SELECT id FROM vocabulary" +
                " WHERE term_id = '" + term_id + "'" +
                " AND language_id = '" + language_id + "'" +
                " AND id = '" + vocabulary_id + "'" +
                " LIMIT 1";
            // console.log('checkAnswer sql: ' + sql);
            tx.executeSql(sql, [], (tx, results) => {
                if (results.rows.length == 1) {
                    this.updateScore(+1);
                    // Alert.alert('Your answer is correct!');
                    this.setState({
                        isAnswerCorrect: true,
                        modalMessage: 'Your answer is correct!'
                    });
                    this._showModal();
                } else {
                    this.updateScore(-1);
                    // Alert.alert('Your answer is incorrect.');
                    this.setState({
                        isAnswerCorrect: false,
                        modalMessage: 'Your answer is incorrect.'
                    });
                    this._showModal();
                }
            });
        });
        this.resetSemaphores();
    }

    updateScore(outcome) {
        this.state.db.transaction((tx) => {
            // get settings
            let sql = "SELECT * FROM settings ORDER BY name ASC";
            tx.executeSql(sql, [], (tx, results) => {
                let score = results.rows.item(0).value;
                let score_total = results.rows.item(1).value;
                if (outcome == 1) {
                    // success, increment score by 1
                    score++;
                    if (score > score_total) {
                        score_total = score;
                    }
                } else if (outcome == -1) {
                    // failure, decrement score by 1
                    score--;
                    if (score < 0) {
                        score = 0;
                    }
                } else if (outcome == 0) {
                    score = 0;
                }
                let sql_score = "UPDATE settings SET value = '" + score + "' WHERE name = 'score'";
                tx.executeSql(sql_score);
                console.log('sql_score: ' + sql_score);
                let sql_score_total = "UPDATE settings SET value = '" + score_total + "' WHERE name = 'score_total'";
                tx.executeSql(sql_score_total);
                console.log('sql_score_total: ' + sql_score_total);
                this.setState({
                    score: score,
                    score_total: score_total,
                });
            });
        });
    }

    modalPopupStyle() {
        if (this.state.isAnswerCorrect) {
            return styles.modal_popup_correct;
        } else {
            return styles.modal_popup_incorrect;
        }
    }

    modalPopupTextStyle() {
        if (this.state.isAnswerCorrect) {
            return styles.modal_popup_text_correct;
        } else {
            return styles.modal_popup_text_incorrect;
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.section_score}>
                    <Text style={styles.section_score_text}>Score: {this.state.score} | Best score: {this.state.score_total}</Text>
                </View>

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

                    <TouchableOpacity onPress={this.checkAnswer.bind(this, this.state.term_id, this.state.language_id, this.state.voc_entry_0_id)}>
                        <View style={styles.option_button}>
                            <Text style={styles.option_button_text}>{this.state.voc_entry_0_translation}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.checkAnswer.bind(this, this.state.term_id, this.state.language_id, this.state.voc_entry_1_id)}>
                        <View style={styles.option_button}>
                            <Text style={styles.option_button_text}>{this.state.voc_entry_1_translation}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.checkAnswer.bind(this, this.state.term_id, this.state.language_id, this.state.voc_entry_2_id)}>
                        <View style={styles.option_button}>
                            <Text style={styles.option_button_text}>{this.state.voc_entry_2_translation}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.checkAnswer.bind(this, this.state.term_id, this.state.language_id, this.state.voc_entry_3_id)}>
                        <View style={styles.option_button}>
                            <Text style={styles.option_button_text}>{this.state.voc_entry_3_translation}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}>
                    <View style={[styles.modal_popup, this.modalPopupStyle()]}>
                        <Text style={[styles.modal_popup_text, this.modalPopupTextStyle()]}>{this.state.modalMessage}</Text>
                        <TouchableOpacity onPress={() => {this._hideModal()}}>
                            <View style={styles.modal_popup_button}>
                                <Text style={styles.modal_popup_button_text}>NEXT ►</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
        );
    }
}

AppRegistry.registerComponent('FlashCard', () => FlashCard);
