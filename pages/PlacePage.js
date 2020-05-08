'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text, Button, Image} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import getDatabaseConnection from '../db';

import AsyncStorage from '@react-native-community/async-storage';
import FavoriteButton from '../components/FavoriteButton';
import {images} from '../images';

type Props = {};

export default class PlacePage extends Component<Props> {
    static navigationOptions = {
        title: 'Place',
    };

    state = {
        selectedPlaceId: null,
        place: {},
        placeLoaded: false,
        loadedLikesList: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
            place: {},
            placeLoaded: false,
            loadedLikesList: null,
        };
        this.loadPlace();
    }

    loadPlace = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        const {placeId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places WHERE _id=' + placeId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        // let temp = [];
                        // for (let i = 0; i < len; ++i) {
                        //     temp.push(results.rows.item(i));
                        // }
                        // //alert(JSON.stringify(temp));
                        this.setState({
                            place: results.rows.item(0),
                            placeLoaded: true,
                        });
                        console.log('Loaded place\n' + JSON.stringify(results.rows.item(0)));
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No place found');
                    }
                });
        });
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
                    if (v[i].type === 'place' && v[i].itemId === this.state.place._id) {
                        index = i;
                        isAlreadyLiked = true;
                    }
                }
                if (isAlreadyLiked) {
                    v.splice(index, 1); //remove this like from array if it exists
                    alert('Added this place to favorites list');
                    console.log('Removed like');
                } else {
                    v.push(like); //otherwise add like to the array
                    alert('Removed this place from favorites list');
                    console.log('Added like');
                }
                console.log(JSON.stringify(v));
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
        //console.log('Liked place with id ' + this.state.place._id);
        console.log(
            JSON.stringify(this.state),
        );
        let like = {
            time: new Date(),
            type: 'place',
            itemId: this.state.place._id,
        };
        this.updateLikes(like);
    }

    render() {
        console.log('PlacePage.render');
        const {placeId} = this.props.navigation.state.params;
        let coverImageName = 'place_photo_placeholder';
        if (this.state.placeLoaded) {
            if (this.state.place.cover_image.length > 1 && images.hasOwnProperty(this.state.place.cover_image)) {
                coverImageName = this.state.place.cover_image;
            }
        }
        let pageContents = (<View>
            <View style={styles.itemPageHeader}>
                <Image source={images[coverImageName]} style={styles.itemPageCover}/>
            </View>
            <View style={styles.itemPageBody}>
                <Text style={styles.itemPageName}>{this.state.place.name}</Text>
                <Text style={styles.itemPageDescription}>{this.state.place.description}</Text>
                <View style={styles.itemPageInfoSection}>
                    <View style={styles.itemPageInfoRow}>
                        <Text style={styles.itemPageInfoTitle}>Address</Text>
                        <Text style={styles.itemPageInfoContent}>{this.state.place.address}</Text>
                    </View>
                </View>

            </View>
            <FavoriteButton style={styles.itemPageFavoriteButton} itemType={"place"} itemId={placeId}/>
        </View>);

        return (
            <ScrollView style={styles.itemPageContainer}>
                {this.state.placeLoaded ? pageContents : <Text style={styles.loader}>'LOADING...'</Text>}
            </ScrollView>
        );
    }

}
