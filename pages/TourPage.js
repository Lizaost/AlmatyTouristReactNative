'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';

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

    loadTour = () => {
        let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
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
            </View>
        );
    }

}
