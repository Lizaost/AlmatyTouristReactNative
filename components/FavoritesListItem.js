import React, {Component} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';
import Rating from './Rating';
import getDatabaseConnection from '../db';
import TourCardSmall from './TourCardSmall';
import PlaceCardSmall from './PlaceCardSmall';

export default class FavoritesListItem extends React.Component {

    state = {
        item: {
            id: this.props.item.itemId,
            name: '',
            description: '',
            cover_image: '',
        },
        isItemLoaded: false,
    };

    constructor(props) {
        super(props);
        let type = this.props.item.type;
        this.state = {
            item: {
                id: this.props.item.itemId,
                name: '',
                description: '',
                cover_image: (type === 'tour' ? 'tour_photo_placeholder' : 'place_photo_placeholder'),
            },
            isItemLoaded: false,
        };
    }

    componentDidMount() {
        this.loadItem();
    }

    loadItem = () => {
        let item = this.props.item;
        let type = item.type;
        let id = item.itemId;
        if (type === 'place') {
            this.loadPlace(id);
        } else if (type === 'tour') {
            this.loadTour(id);
        } else {
            console.log('Unknown item type: ' + JSON.stringify(item));
        }
    };

    loadPlace = (placeId) => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        //const {placeId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places WHERE _id=' + placeId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        this.setState({
                            item: results.rows.item(0),
                            isItemLoaded: true,
                        });
                    } else {
                        alert('No place found');
                    }
                });
        });
    };

    loadTour = (tourId) => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        //const {placeId} = this.props.navigation.state.params;
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours WHERE _id=' + tourId,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        this.setState({
                            item: results.rows.item(0),
                            isItemLoaded: true,
                        });
                    } else {
                        alert('No tour found');
                    }
                });
        });
    };

    render() {
        let onpressHandler = this.props.onpressHandler;
        let item = this.props.item;
        let type = item.type;
        // let coverImageName = 'tour_photo_placeholder';
        // if (this.state.item.cover_image.length <= 1 && !images.hasOwnProperty(this.state.item.cover_image)) {
        //     this.state.item.cover_image = (type === 'tour') ? 'tour_photo_placeholder' : 'place_photo_placeholder')
        // }
        console.log('Rendering favorites list item for ' + item.type + ' with id ' + item.itemId);
        console.log(item);
        let cardDescription = (item.type === 'tour' ? 'Small tour card for tour with id ' : 'Small place card for place with id ')
            + item.itemId;
        let itemComponent = type === 'tour' ?
            <TourCardSmall onpressHandler={onpressHandler}
                                                             item={this.state.item}/> :
            <PlaceCardSmall onpressHandler={onpressHandler}
                            item={this.state.item}/>;
        return <TouchableOpacity onPress={() => onpressHandler(item)}>
            {itemComponent}
        </TouchableOpacity>;
    }
}
