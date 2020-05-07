'use strict';

import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';
import AsyncStorage from '@react-native-community/async-storage';
import TourCard from '../components/TourCard';
import FavoritesListItem from '../components/FavoritesListItem';

type Props = {};

export default class FavoritesList extends Component<Props> {
    static navigationOptions = {
        title: 'Favorites',
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

    _onFavoriteItemPressed = (item) => {
        if (item.type === 'place') {
            console.log('Opening place page for a place with id = ' + item.itemId);
            this.props.navigation.navigate(
                'PlacePage', {placeId: item.itemId});
        } else if (item.type === 'tour') {
            console.log('Opening tour page for a tour with id = ' + item.itemId);
            this.props.navigation.navigate(
                'TourPage', {tourId: item.itemId});
        } else {
            alert("Unknown item type: " + JSON.stringify(item));
            alert("Something went wrong");
        }
    };

    render() {
        console.log('FavoritesList.render');
        console.log(this.state.favorites);
        let favoritesFlatList = this.state.isLoaded ?
            <FlatList
                data={this.state.favorites}
                renderItem={(item) => <FavoritesListItem onpressHandler={() => this._onFavoriteItemPressed(item["item"])} item={item['item']}/>}
                keyExtractor={item => item.type + item.itemId}/> :
            <Text style={styles.description}>
                LOADING
            </Text>;
        return (
            <View>
                {favoritesFlatList}
            </View>
        );
    }

}
