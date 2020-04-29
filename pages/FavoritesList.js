'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class FavoritesList extends Component<Props> {
    static navigationOptions = {
        title: 'Favorites List',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('FavoritesList.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    FAVORITES LIST
                </Text>
            </View>
        );
    }

}
