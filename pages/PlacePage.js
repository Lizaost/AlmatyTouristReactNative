'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class PlacePage extends Component<Props> {
    static navigationOptions = {
        title: 'Place Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

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
            </View>
        );
    }

}
