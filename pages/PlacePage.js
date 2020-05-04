'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';

type Props = {};

export default class PlacePage extends Component<Props> {
    static navigationOptions = {
        title: 'Place Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
            place: {},
            placeLoaded: false,
        };
        this.loadPlace();
    }

    loadPlace = () => {
        let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        const {placeId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places WHERE _id=' + placeId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        alert(str);
                        // let temp = [];
                        // for (let i = 0; i < len; ++i) {
                        //     temp.push(results.rows.item(i));
                        // }
                        // //alert(JSON.stringify(temp));
                        this.setState({
                            place: results.rows.item(0),
                            placeLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No place found');
                    }
                });
        });
    };

    render() {
        console.log('PlacePage.render');
        const {placeId} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    PLACE PAGE
                </Text>
                <Text style={styles.description}>
                    placeId = {placeId}
                </Text>
                <Text style={styles.description}>
                    name = {this.state.placeLoaded ? this.state.place.name : "LOADING..."}
                </Text>
            </View>
        );
    }

}
