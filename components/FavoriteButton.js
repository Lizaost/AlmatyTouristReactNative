import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {firebrick} from 'color-name';
import {images} from '../images';
import {styles} from '../styles';
import AsyncStorage from '@react-native-community/async-storage';
import TouchableItem from 'react-navigation-stack/src/vendor/views/TouchableItem';

// THIS COMPONENT IS NOT WORKING NOW
// I'm planning to finish this button by the exam and replace like button
// on PlacePage and TourPage by this FavoriteButton component.

export default class FavoriteButton extends React.Component {

    state = {
        itemId: this.props['itemId'],
        itemType: this.props['itemType'],
        isFavorite: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            itemId: this.props['itemId'],
            itemType: this.props['itemType'],
            isFavorite: false,
        };
    }

    componentDidMount() {
        this.loadFavoriteState();
    }

    loadFavoriteState = async () => {
        const value = await AsyncStorage.getItem('likes_list');
        if (value !== null) {
            let v = JSON.parse(value);
            let l = v.length;
            let index = -1;
            let isAlreadyLiked = false;
            for (let i = 0; i < l; i++) {
                if (v[i].type === this.state.itemType && v[i].itemId === this.state.itemId) {
                    index = i;
                    isAlreadyLiked = true;
                }
            }
            if (isAlreadyLiked) {
                console.log('Item is in favorites');
                this.setState({isFavorite: true})
            } else {
                console.log('Item is not in favorites');
                this.setState({isFavorite: false})
            }
        }
    };

    storeLikes = async (value) => {
        try {
            await AsyncStorage.setItem('likes_list', value);
        } catch (e) {
            console.log('Error saving value ' + value + ' with key likes_list: \n' + e);
        }
    };

    getLikes = async () => {
        try {
            const value = await AsyncStorage.getItem('likes_list');
            if (value !== null) {
                // value previously stored
                this.setState({loadedLikesList: value});
            }
        } catch (e) {
            console.log('Error loading likes_list from async storage: \n' + e);
        }
    };

    isAlreadyLiked = (like) => {
        return like.type === this.state.itemType && like.itemId === this.state.itemId;
    };

    updateLikes = async (like) => {
        try {
            console.log('Adding like to async storage ' + JSON.stringify(like));
            const value = await AsyncStorage.getItem('likes_list');
            if (value !== null) {
                // value previously stored
                let v = JSON.parse(value);
                let l = v.length;
                let index = -1;
                let isAlreadyLiked = false;
                for (let i = 0; i < l; i++) {
                    if (v[i].type === this.state.itemType && v[i].itemId === this.state.itemId) {
                        index = i;
                        isAlreadyLiked = true;
                    }
                }
                if (isAlreadyLiked) {
                    v.splice(index, 1); //remove this like from array if it exists
                    //alert('Removed this place from favorites list');
                    console.log('Removed like');
                    this.setState({isFavorite: false})
                } else {
                    v.push(like); //otherwise add like to the array
                    //alert('Added this place to favorites list');
                    console.log('Added like');
                    this.setState({isFavorite: true})
                }
                this.storeLikes(JSON.stringify(v)).then((res) => {
                    console.log('Stored likes');
                });
                //this.setState({loadedLikesList: value});
            } else {
                let likesList = [];
                likesList.push(like);
                console.log('SAVING FIRST LIKED ITEM:\n' + JSON.stringify(likesList));
                this.storeLikes(JSON.stringify(likesList)).then((res) => {
                    console.log('Stored likes');
                });
            }
        } catch (e) {
            console.log('Error loading likes_list from async storage: \n' + e);
        }
    };

    _onLikeButtonPressed() {
        console.log(JSON.stringify(this.state.isFavorite));
        console.log('Liked item with id ' + this.props.itemId);
        let like = {
            time: new Date(),
            type: this.state.itemType,
            itemId: this.state.itemId,
        };
        this.updateLikes(like);
    }


    render() {
        let image = this.state.isFavorite ? images.full_star : images.empty_star;
        let styles = this.props.style;
        return (
            <TouchableOpacity style={styles} onPress={() => this._onLikeButtonPressed()}>
                <Image style={[styles.favoriteButtonImage, {width: 30, height: 30}]} source={image}/>
            </TouchableOpacity>
        );
    }
}
