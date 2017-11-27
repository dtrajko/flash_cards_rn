/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, Switch} from 'react-native';
import styles from './ScreenLanguages_css';
import ImagesIndex from '../../../resources/images/images_index';
import SQLite from 'react-native-sqlite-storage';

export default class ScreenLanguages extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Language Settings'
    }

    constructor() {
        super();
        this.state = {
            db: this.openDb(),
            languageEnabledDe: false,
            languageEnabledFr: false,
        };
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

    changeSwitchState(language_name, value) {
        console.log('changeSwitchState language_name: ' + language_name + ', value: ' + value);
        switch (language_name) {
            case 'Deutsch':
                this.setState({ languageEnabledDe: value });
                this.setLanguageEnabledDb(language_name, value);
                break;
            case 'Français':
                this.setState({ languageEnabledFr: value });
                this.setLanguageEnabledDb(language_name, value);
                break;
        }
    }

    componentDidMount() {
        this.checkLanguagesEnabled();
    }

    utilityWriteQuery() {
        this.state.db.transaction((tx) => {
            let sql = "UPDATE terms SET picture = '1511660456.jpg' WHERE name = 'fork'";
            console.log('utilityWriteQuery sql: ' + sql);
            tx.executeSql(sql, [], this.successCB, this.errorCB);
        });
    }

    setLanguageEnabledDb(language_name, enabled_bool) {
        let enabled = enabled_bool ? 1 : 0;
        this.state.db.transaction((tx) => {
            let sql = "UPDATE languages SET enabled = " + enabled + " WHERE name = '" + language_name + "'";
            console.log('setLanguageEnabledDb sql: ' + sql);
            tx.executeSql(sql, [], this.successCB, this.errorCB);
        });
    }

    checkLanguagesEnabled() {
        this.state.db.transaction((tx) => {
            let sql = "SELECT enabled FROM languages WHERE name = 'Deutsch'";
            tx.executeSql(sql, [], (tx, results) => {
                let language_enabled = results.rows.item(0).enabled;
                let languageEnabledDe = (language_enabled == 1) ? true : false;
                this.setState({
                    languageEnabledDe: languageEnabledDe,
                });
                console.log('languageEnabledDe: ' + this.state.languageEnabledDe);
            });
        });
        this.state.db.transaction((tx) => {
            let sql = "SELECT enabled FROM languages WHERE name = 'Français'";
            tx.executeSql(sql, [], (tx, results) => {
                let language_enabled = results.rows.item(0).enabled;
                let languageEnabledFr = (language_enabled == 1) ? true : false;
                this.setState({
                    languageEnabledFr: languageEnabledFr,
                });
                console.log('languageEnabledFr: ' + this.state.languageEnabledFr);
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.languages_container}>

                    <View style={styles.language_row_view}>
                        <View style={styles.section_language_image}>
                            <Image
                                style={styles.flag_image}
                                source={ImagesIndex['flag_image_1507986518']} />
                        </View>
                        <View style={styles.section_language_text_view}>
                            <Text style={styles.section_language_text}>Deutsch</Text>
                        </View>
                        <View style={styles.section_language_switch}>
                            <Switch
                                onValueChange={(value, language_name) => this.changeSwitchState('Deutsch', value)}
                                value={this.state.languageEnabledDe}/>
                        </View>
                    </View>

                    <View style={styles.language_row_view}>
                        <View style={styles.section_language_image}>
                            <Image
                                style={styles.flag_image}
                                source={ImagesIndex['flag_image_1507986530']} />
                        </View>
                        <View style={styles.section_language_text_view}>
                            <Text style={styles.section_language_text}>Français</Text>
                        </View>
                        <View style={styles.section_language_switch}>
                            <Switch
                                onValueChange={(value, language_name) => this.changeSwitchState('Français', value)}
                                value={this.state.languageEnabledFr}/>
                        </View>
                    </View>

                </View>

                <View style={styles.remaining_space}>
                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('ScreenLanguages', () => ScreenLanguages);
