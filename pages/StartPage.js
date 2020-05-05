'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, Button} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};

export default class StartPage extends Component<Props> {
    static navigationOptions = {
        title: 'Almaty Tourist Start Page',
    };

    state = {
        selectedItemType: null,
        selectedItemId: null,
        all_tours: [],
        tours_number: 0,
        likes: []
    };

    constructor(props) {
        super(props);
        this.getLikes();
    }

    getLikes = async () => {
        try {
            const value = await AsyncStorage.getItem("likes_list");
            if(value !== null) {
                // value previously stored
                this.setState({likes: JSON.parse(value)});
            }
        } catch(e) {
            console.log("Error loading likes_list from async storage: \n" + e)
        }
    };

    _onTestDatabaseConnectionPressed = () => {
        let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours',
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({tours_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        alert(str);
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        this.setState({
                            all_tours: temp,
                        });
                    } else {
                        alert('No tours found');
                    }
                });
        });
    };

    _onOpenToursListPressed = () => {
        this.props.navigation.navigate(
            'ToursList');
    };
    _onOpenPlacesListPressed = () => {
        this.props.navigation.navigate(
            'PlacesList');
    };
    _onOpenFavoritesListPressed = () => {
        this.props.navigation.navigate(
            'FavoritesList');
    };

    render() {
        console.log('StartPage.render');

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.description}>
                        START PAGE
                    </Text>
                    <Text style={styles.description}>
                        item_string = {JSON.stringify(this.state.all_tours)}
                    </Text>
                    <Text style={styles.description}>
                        ---------------------
                    </Text>
                    <Text style={styles.description}>
                        item_string = {JSON.stringify(this.state.likes)}
                    </Text>
                    <Button
                        onPress={this._onOpenToursListPressed}
                        color='#48BBEC'
                        title='Open tours list'
                    />
                    <Button
                        onPress={this._onOpenPlacesListPressed}
                        color='#48BBEC'
                        title='Open places list'
                    />
                    <Button
                        onPress={this._onOpenFavoritesListPressed}
                        color='#48BBEC'
                        title='Open favorites list'
                    />
                    <Button
                        onPress={this._onTestDatabaseConnectionPressed}
                        color='#48BBEC'
                        title='TEST DATABASE CONNECTION'
                    />
                </View>
            </ScrollView>
        );
    }

}
