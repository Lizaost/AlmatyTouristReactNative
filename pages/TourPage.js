'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import getDatabaseConnection from '../db';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};

export default class TourPage extends Component<Props> {
    static navigationOptions = {
        title: 'Tour Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
            tour: {},
            tourLoaded: false,
        };
        this.loadTour();
    }

    storeLikes = async (value) => {
        try {
            await AsyncStorage.setItem("likes_list", value);
        } catch (e) {
            console.log("Error saving value " + value +" with key likes_list: \n" + e)
        }
    };

    getLikes = async () => {
        try {
            const value = await AsyncStorage.getItem("likes_list");
            if(value !== null) {
                // value previously stored
                this.setState({loadedLikesList: value});
            }
        } catch(e) {
            console.log("Error loading likes_list from async storage: \n" + e)
        }
    };

    updateLikes = async (like) => {
        try {
            console.log("Adding like to async storage " + JSON.stringify(like));
            const value = await AsyncStorage.getItem("likes_list");
            if(value !== null) {
                // value previously stored
                let v = JSON.parse(value);
                v.push(like);
                console.log("ADDING ONE MORE LIKE:\n" + JSON.stringify(v));
                this.storeLikes(JSON.stringify(v)).then((res) => {console.log("Stored likes")});
                //this.setState({loadedLikesList: value});
            } else {
                let likesList = [];
                likesList.push(like);
                console.log("SAVING FIRST LIKED ITEM:\n" + JSON.stringify(likesList));
                this.storeLikes(JSON.stringify(likesList)).then((res) => {console.log("Stored likes")});
            }
        } catch(e) {
            console.log("Error loading likes_list from async storage: \n" + e)
        }
    };

    _onLikeButtonPressed(){
        //TODO REMOVE DUPLICATES FROM SAVED LIKED ITEMS
        console.log("Liked place with id " + this.state.tour._id);
        let like = {time: new Date(),
            type: "tour",
            itemId: this.state.tour._id};
        this.updateLikes(like);
    }

    loadTour = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        const {tourId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours WHERE _id=' + tourId,
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
                            tour: results.rows.item(0),
                            tourLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No tour found');
                    }
                });
        });
    };

    render() {
        console.log('TourPage.render');
        const {tourId} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    TOUR PAGE
                </Text>
                <Text style={styles.description}>
                    tourId = {tourId}
                </Text>
                <Text style={styles.description}>
                    name = {this.state.tourLoaded ? this.state.tour.name : "LOADING..."}
                </Text>
                <Button
                    onPress={() => this._onLikeButtonPressed()}
                    color='#48BBEC'
                    title='LIKE THIS TOUR'
                />
            </View>
        );
    }

}
