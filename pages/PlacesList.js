'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class PlacesList extends Component<Props> {
    static navigationOptions = {
        title: 'Places List',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

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
                    onPress={() => this._onOpenPlacePressed(42)}
                    color='#48BBEC'
                    title='Open Place with id 42'
                />
            </View>
        );
    }

}
