/**
 * ScreenSearch class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, TextInput, FlatList} from 'react-native';
import styles from './ScreenSearch_css';
import ImagesIndex from '../../../resources/images/images_index';
import SQLite from 'react-native-sqlite-storage';

var initial_keyword = '';

export default class ScreenSearch extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Search'
    }

    constructor(props) {
        super(props);
        this.state = {
            keyword: initial_keyword,
            results: [],
            db: this.openDb(),
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
        return SQLite.openDatabase({name : 'flash_cards', createFromLocation : '~flash_cards.sqlite'}, this.openCB, this.errorCB);
    }

    componentDidMount() {
    }

    emptySearchField() {
        this.setState({keyword: ''});
    }

    updateSearchResults(keyword) {
        // alert('updateSearchResults: ' + keyword);
        this.setState({keyword: keyword});
        var arr_results = new Array();
        if (keyword == '') {
            this.setState({
                results: arr_results,
                keyword: initial_keyword,
            });
            return;
        }
        this.state.db.transaction((tx) => {
            // get the correct entry
            let sql = "SELECT v.id, v.translation, t.name, v.language_id, v.term_id" +
                " FROM vocabulary v" +
                " JOIN terms t ON v.term_id = t.id" +
                " WHERE v.translation LIKE '%" + this.state.keyword + "%'" +
                " OR t.name LIKE '%" + this.state.keyword + "%'" +
                " ORDER BY v.translation ASC";
            console.log('updateSearchResults query: ' + sql);
            tx.executeSql(sql, [], (tx, results) => {
                var len = results.rows.length;
                console.log('updateSearchResults len: ' + len);
                for (let i = 0; i < len; i++) {
                    console.log(results.rows.item(i).translation);
                    arr_results.push({key: results.rows.item(i).translation + ' (' + results.rows.item(i).name +')'});
                }
                this.setState({
                    results: arr_results,
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.search_field_container}>
                    <TextInput style={styles.search_text_input}
                            placeholder='search'
                            placeholderTextColor='#BBB'
                            autoCapitalize='none'
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onChangeText={(keyword) => this.updateSearchResults(keyword)}
                            value={this.state.keyword}
                          />
                </View>

                <View style={styles.search_results_container}>
                    <FlatList
                    data={this.state.results}
                      renderItem={({item}) => <Text style={styles.search_results_item}>{item.key}</Text>}>
                    </FlatList>
                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('ScreenSearch', () => ScreenSearch);

/*
<View style={styles.search_results_item}>
    <Text style={styles.search_results_item}>{item.key}</Text>
</View>>
*/
