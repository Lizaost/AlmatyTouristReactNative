'use strict';

import React, {Component} from 'react';
import {View, Text, Button, Image, ScrollView, FlatList} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import getDatabaseConnection from '../db';
import AsyncStorage from '@react-native-community/async-storage';
import {images} from '../images';
import FavoriteButton from '../components/FavoriteButton';
import PlaceCardSmall from '../components/PlaceCardSmall';
import Comment from '../components/Comment';
import CommentInput from '../components/CommentInput';
import TourCardSmall from '../components/TourCardSmall';
import Rating from '../components/Rating';

type Props = {};

export default class TourPage extends Component<Props> {
    static navigationOptions = {
        title: 'Tour',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
            tour: {},
            tourLoaded: false,
            tourPlaces: [],
            tourPlacesLoaded: false,
            comments: [],
            commentsLoaded: false,
            rating: 0,
            ratingLoaded: false,
        };
        this.loadTour();
        this.loadTourPlaces();
        this.loadTourComments();
        this.getTourRating();
    }

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

    getTourRating = () => {
        const {tourId} = this.props.navigation.state.params;
        let query = 'http://almatytouristbeta.pythonanywhere.com/rating_exact?type=tour&id=' + tourId;
        console.log('Getting tour (id=' + tourId + ') rating. URL is ' + query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Rating (tour' + tourId + '):' + json.rating);
                this.setState({
                    rating: json.rating,
                    ratingLoaded: true,
                });
                console.log('==== ' + this.state.rating);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
        // let rating = 7;
        // this.setState({rating: rating});
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
                    if (v[i].type === 'tour' && v[i].itemId === this.state.tour._id) {
                        index = i;
                        isAlreadyLiked = true;
                    }
                }
                if (isAlreadyLiked) {
                    v.splice(index, 1); //remove this like from array if it exists
                    console.log('Removed like');
                } else {
                    v.push(like); //otherwise add like to the array
                    console.log('Added like');
                }
                console.log('ADDING ONE MORE LIKE:\n' + JSON.stringify(v));
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

    _onOpenPlacePressed = (placeId) => {
        this.props.navigation.navigate(
            'PlacePage', {placeId: placeId});
    };

    // _onLikeButtonPressed(){
    //     console.log("Liked place with id " + this.state.tour._id);
    //     let like = {time: new Date(),
    //         type: "tour",
    //         itemId: this.state.tour._id};
    //     this.updateLikes(like);
    // }

    loadTour = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        const {tourId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours WHERE _id=' + tourId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        // let temp = [];
                        // for (let i = 0; i < len; ++i) {
                        //     temp.push(results.rows.item(i));
                        // }
                        // //alert(JSON.stringify(temp));
                        this.setState({
                            tour: results.rows.item(0),
                            tourLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No tour found');
                    }
                });
        });
    };

    //SELECT p._id, p.name, p.description, p.cover_image, p.address
    // FROM places p
    // JOIN tour_places tp
    // ON p._id=tp.place_id
    // WHERE tp.tour_id=2

    loadTourPlaces = () => {
        let db = getDatabaseConnection();
        const {tourId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT p._id, p.name, p.description, p.cover_image, p.address ' +
                'FROM places p ' +
                'JOIN tour_places tp ' +
                'ON p._id=tp.place_id ' +
                'WHERE tp.tour_id=' + tourId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        //alert(JSON.stringify(temp));
                        this.setState({
                            tourPlaces: temp,
                            tourPlacesLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No tour found');
                    }
                });
        });
    };

    loadTourComments = () => {
        const {tourId} = this.props.navigation.state.params;
        let query = 'http://almatytouristbeta.pythonanywhere.com/comments?type=tour&id=' + tourId;
        console.log('Query: ' + query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Comments (place' + tourId + '):' + json[0]['author_name']);
                this.setState({
                    comments: json,
                    commentsNumber: json.length,
                    commentsLoaded: true,
                });
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    commentsLoaded: true,
                    message: 'Something bad happened ' + error,
                }));
        // let rating = 7;
        // this.setState({rating: rating});
    };

    render() {
        console.log('TourPage.render');
        const {tourId} = this.props.navigation.state.params;
        let coverImageName = 'tour';
        if (this.state.tourLoaded) {
            if (this.state.tour.cover_image.length > 1 && images.hasOwnProperty(this.state.tour.cover_image)) {
                coverImageName = this.state.tour.cover_image;
            }
        }
        let pageContents = (<View>
            <View style={styles.itemPageHeader}>
                <Image source={images[coverImageName]} style={styles.itemPageCover}/>
            </View>
            <View style={styles.itemPageBody}>
                <Text style={styles.itemPageName}>{this.state.tour.name}</Text>
                <Text style={styles.itemPageDescription}>{this.state.tour.description}</Text>
                {this.state.tourPlacesLoaded ?
                    <FlatList
                        style={styles.tourPlacesList}
                        data={this.state.tourPlaces}
                        renderItem={(item) => <PlaceCardSmall nav={this.props.navigation}
                                                              onpressHandler={() => this._onOpenPlacePressed(item['item']._id)}
                                                              item={item['item']}/>}
                        keyExtractor={item => item._id}/> : <View/>}

                {this.state.commentsLoaded ?
                    <View style={styles.ItemPageRatingRow}>
                        <Rating value={Math.round(this.state.rating)} style={styles.ItemPageRating}/>
                        <Text style={styles.ItemPageRatingValue}>{(this.state.rating).toFixed(2)}</Text>
                        <Text
                            style={styles.ItemPageCommentsNumber}>{this.state.commentsNumber} {this.state.commentsNumber === 1 ? 'comment' : 'comments'}</Text>
                    </View> : <View/>}

                {this.state.commentsLoaded ?
                    <CommentInput onCommentPostedCallback={() => this.loadTourComments()} item_id={tourId}
                                  item_type={'tour'}/> : <View/>}

                {this.state.commentsLoaded ?
                    <FlatList
                        style={styles.tourPlacesList}
                        data={this.state.comments}
                        renderItem={(item) => <Comment author={item['item']['author_name']}
                                                       rating={item['item']['rating']}
                                                       text={item['item']['text']}/>}/> : <Text>LOADING COMMENTS</Text>}

            </View>
            <FavoriteButton style={styles.itemPageFavoriteButton} itemType={'tour'} itemId={tourId}/>
        </View>);

        return (
            <ScrollView style={styles.itemPageContainer}>
                {this.state.tourLoaded ? pageContents : <Text style={styles.loader}>'LOADING...'</Text>}
            </ScrollView>
        );
    }

}
