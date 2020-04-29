'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class AboutCityPage extends Component<Props> {
    static navigationOptions = {
        title: 'About City Page',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('AboutCityPage.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    ABOUT CITY PAGE
                </Text>
            </View>
        );
    }

}
