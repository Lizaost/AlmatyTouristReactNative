'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class TourPage extends Component<Props> {
    static navigationOptions = {
        title: 'Tour Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('TourPage.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    TOUR PAGE
                </Text>
            </View>
        );
    }

}
