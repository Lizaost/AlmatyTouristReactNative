'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';
// import {openDatabase} from 'react-native-sqlite-storage';

type Props = {};

export default class StartPage extends Component<Props> {
    static navigationOptions = {
        title: 'Almaty Tourist Start Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedItemType: null,
            selectedItemId: null,
        };
    }

    // _onTestDatabaseConnectionPressed = () => {
    //     let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'SELECT * FROM tours',
    //             [],
    //             (tx, results) => {
    //                 let len = results.rows.length;
    //                 //console.log('len',len);
    //                 if (len > 0) {
    //                     alert(results.rows.item(0).title);
    //
    //                 } else {
    //                     alert('No tours found');
    //
    //                 }
    //             });
    //     });
    // };

    _onOpenToursListPressed = () => {
        this.props.navigation.navigate(
            'ToursList');
    };
    _onOpenPlacesListPressed = () => {
        this.props.navigation.navigate(
            'PlacesList');
    };

    render() {
        console.log('StartPage.render');

        return (

            <View style={styles.container}>
                <Text style={styles.description}>
                    START PAGE
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
            </View>
        );
    }

}
