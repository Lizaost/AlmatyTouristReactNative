'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../styles.js';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};

export default class FavoritesList extends Component<Props> {
    static navigationOptions = {
        title: 'Favorites List',
    };

    state = {
        selectedPlaceId: null,
        favorites: [],
        isLoaded: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
            favorites: [],
            isLoaded: false,
        };
        this.getLikes();
    }

    getLikes = async () => {
        try {
            const value = await AsyncStorage.getItem('likes_list');
            if (value !== null) {
                // value previously stored
                this.setState({
                    favorites: JSON.parse(value),
                    isLoaded: true,
                });
            }
        } catch (e) {
            console.log('Error loading likes_list from async storage: \n' + e);
        }
    };

    render() {
        console.log('FavoritesList.render');
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    FAVORITES LIST
                </Text>
                <Text style={styles.description}>
                    {this.state.isLoaded ? JSON.stringify(this.state.favorites) : 'LOADING'}
                </Text>
            </View>
        );
    }

}
