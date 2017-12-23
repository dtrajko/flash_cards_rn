/**
 * ScreenTerm class
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, FlatList, ListItem} from 'react-native';
import styles from './ScreenTerm_css';
import ImagesIndex from '../../../resources/images/images_index';
import SQLite from 'react-native-sqlite-storage';

export default class ScreenTerm extends Component<{}> {

    static navigationOptions = {
        title: 'Flash Cards: Term',
    }

    constructor(props) {
        super(props);
        this.state = {
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
        this.fetchAndProcessData(this.props.navigation.state.params.term_id);
    }

    fetchAndProcessData(term_id) {
        console.log('fetchAndProcessData term_id: ' + term_id);
        this.state.db.transaction((tx) => {
            let sql = "SELECT v.id v_id, v.translation, t.id t_id, t.name t_name, t.picture, l.name l_name, l.flag, l.enabled" +
                " FROM vocabulary v" +
                " INNER JOIN terms t ON v.term_id = t.id" +
                " INNER JOIN languages l ON v.language_id = l.id" +
                " WHERE term_id = " + term_id +
                " AND l.enabled = 1" +
                " ORDER BY v.id ASC";
            tx.executeSql(sql, [], (tx, results) => {
                var voc_items = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    // console.log(results.rows.item(i).translation);
                    let language_flag = results.rows.item(i).flag.substr(0, results.rows.item(i).flag.lastIndexOf('.')) || results.rows.item(i).flag;
                    voc_items.push({
                        key: results.rows.item(i).v_id,
                        translation: results.rows.item(i).translation,
                        t_name: results.rows.item(i).t_name,
                        picture: results.rows.item(i).picture,
                        l_name: results.rows.item(i).l_name,
                        language_flag: language_flag,
                        enabled: results.rows.item(i).enabled,
                    });
                }
                let term_picture = results.rows.item(0).picture.substr(0, results.rows.item(0).picture.lastIndexOf('.')) || results.rows.item(0).picture;
                console.log('fetchAndProcessData term_picture: ' + term_picture);
                console.log('fetchAndProcessData term_name: ' + results.rows.item(0).t_name);
                console.log('fetchAndProcessData translation 0: ' + voc_items[0].translation);
                this.setState({
                    term_picture: term_picture,
                    term_name: results.rows.item(0).t_name,
                    voc_items: voc_items,
                });
            });
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.section_term_picture}>
                    <Image
                        style={styles.term_image}
                        resizeMode={'contain'}
                        source={ImagesIndex['term_image_' + this.state.term_picture]} />
                </View>

                <View style={styles.section_term_name}>
                    <Text style={styles.section_term_name_text}>{ this.state.term_name }</Text>
                </View>

                <View style={styles.section_voc_items}>
                    <FlatList
                        contentContainerStyle={styles.flat_list_voc_items}
                        data={this.state.voc_items}
                        renderItem={({item}) =>
                            <View style={styles.flat_list_view}>
                                <Text
                                    style={styles.flat_list_voc_item}>{item.translation}</Text>
                                <Image
                                    style={styles.flag_image}
                                    source={ImagesIndex['flag_image_' + item.language_flag]} />
                                <Text style={styles.flat_list_voc_item_end}>&nbsp;</Text>
                            </View>}>
                    </FlatList>
                </View>

            </View>
        );
    }
}

AppRegistry.registerComponent('ScreenTerm', () => ScreenTerm);
