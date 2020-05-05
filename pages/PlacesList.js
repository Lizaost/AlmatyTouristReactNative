'use strict';

import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import PlaceCard from '../components/PlaceCard';
import getDatabaseConnection from '../db';

type Props = {};

export default class PlacesList extends Component<Props> {
    static navigationOptions = {
        title: 'Places List',
    };

    constructor(props) {
        super(props);
        this.state = {
            places: [],
            places_number: 0,
        };
        this.loadPlaces();
    }

    loadPlaces = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        //alert(JSON.stringify(temp));
                        this.setState({
                            places: temp,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No places found');
                    }
                });
        });
    };

    _onOpenPlacePressed = (placeId) => {
        alert(placeId);
        this.props.navigation.navigate(
            'PlacePage', {placeId: placeId});
    };

    render() {
        console.log('PlacesList.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    PLACES LIST
                </Text>
                <Button
                    onPress={() => this._onOpenPlacePressed(10)}
                    color='#48BBEC'
                    title='Open Place with id 10'
                />
                <Button
                    onPress={() => this._onOpenPlacePressed(11)}
                    color='#48BBEC'
                    title='Open Place with id 11'
                />
                <Button
                    onPress={() => this._onOpenPlacePressed(12)}
                    color='#48BBEC'
                    title='Open Place with id 12'
                />
                <FlatList
                    data = {this.state.places}
                    renderItem = {(item) => <PlaceCard item={item["item"]}/>}
                    keyExtractor = {item => item._id}/>
            </View>
        );
    }

}
