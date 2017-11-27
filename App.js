/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ScreenMenu from './app/components/screen_menu/ScreenMenu';
import ScreenPlayCards from './app/components/screen_play_cards/ScreenPlayCards';
import ScreenLanguages from './app/components/screen_languages/ScreenLanguages';

const App = StackNavigator({
    ScreenMenu: {screen: ScreenMenu},
    ScreenPlayCards: {screen: ScreenPlayCards},
    ScreenLanguages: {screen: ScreenLanguages},
});

export default App;
