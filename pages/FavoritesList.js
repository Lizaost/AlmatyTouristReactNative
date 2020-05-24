'use strict';

import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';
import AsyncStorage from '@react-native-community/async-storage';
import TourCard from '../components/TourCard';
import FavoritesListItem from '../components/FavoritesListItem';
import CommentPlaceholder from '../components/CommentPlaceholder';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, setI18nConfig} from '../localization';

type Props = {};

export default class FavoritesList extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Favorites',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'Almaty Tourist' : navigation.state.params.title,
    });

    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    state = {
        selectedPlaceId: null,
        favorites: [],
        isLoaded: false,
    };

    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            selectedPlaceId: null,
            favorites: [],
            isLoaded: false,
        };
        this.getLikes();
        // Update likes list when returned back to this page. It will update list if I add/remove an item
        // from favorites opening item page from this page.
        this.props.navigation.addListener('willFocus', () => {
            this.getLikes();
        });
        this.setPageTitle(translate('favorites_list-page_title'));
    }

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig()
            .then(() => this.forceUpdate())
            .catch(error => {
                console.error(error);
            });
    };

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
            alert('Unknown item type: ' + JSON.stringify(item));
            alert('Something went wrong');
        }
    };

    render() {
        console.log('FavoritesList.render');
        console.log(this.state.favorites);
        let favoritesFlatList = this.state.isLoaded ?
            <FlatList
                data={this.state.favorites}
                renderItem={(item) => <FavoritesListItem
                    onpressHandler={() => this._onFavoriteItemPressed(item['item'])}
                    item={item['item']}
                    nav={this.props.navigation}/>}
                keyExtractor={item => item.type + item.itemId}/> :
            <Text style={styles.description}>
                {translate('list-loading')}
            </Text>;
        return (
            <View>
                {favoritesFlatList}
            </View>
        );
    }

}
