/**
 * ScreenMenu class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import styles from './ScreenAbout_css';
import SQLite from 'react-native-sqlite-storage';

export default class ScreenAbout extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: About'
    }

    constructor() {
        super();
        this.state = {
            db: this.openDb(),
            version: '0.0.0',
        };
        // this.deleteExistingDb();
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
        return SQLite.openDatabase({name : 'flash_cards', version: '0.1.28', createFromLocation : '~flash_cards.sqlite'}, this.openCB, this.errorCB);
    }

    deleteExistingDb() {
        SQLite.deleteDatabase({name : 'flash_cards', location : 'default'})
        console.log("Sqlite database 'flash_cards' deleted from the default location.");
    }

    utilityWriteQuery() {
        this.state.db.transaction((tx) => {
            let sql = "UPDATE terms SET picture = '1511660456.jpg' WHERE name = 'fork'";
            console.log('utilityWriteQuery sql: ' + sql);
            tx.executeSql(sql, [], this.successCB, this.errorCB);
        });
    }

    componentDidMount() {
        this.getVersion();
    }

    getVersion() {
        this.state.db.transaction((tx) => {
            let sql = "SELECT value FROM settings WHERE name = 'version'";
            tx.executeSql(sql, [], (tx, results) => {
                console.log('results.rows.length = ' + results.rows.length);
                if (results.rows.length == 1) {
                    let version = results.rows.item(0).value;
                    this.setState({version: version});
                }
                console.log('getVersion: ' + version);
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.about_container}>

                    <View style={styles.about_row_view}>
                        <View style={styles.app_name_view}>
                            <Text style={styles.app_name_text}>Flash Cards</Text>
                        </View>
                    </View>

                    <View style={styles.about_row_view}>
                        <View style={styles.app_name_view}>
                            <Text style={styles.version_text}>Version: { this.state.version }</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.remaining_space}>
                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('ScreenAbout', () => ScreenAbout);
