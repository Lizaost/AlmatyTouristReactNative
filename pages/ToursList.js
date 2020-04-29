'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class ToursList extends Component<Props> {
    static navigationOptions = {
        title: 'Tours List',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('ToursList.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    TOURS LIST
                </Text>
            </View>
        );
    }

}
