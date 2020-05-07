import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images.js';
import getDatabaseConnection from '../db';
import Rating from './Rating';


export default class TourCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placesCount: 0,
            rating: 0,
        };
        this.getPlacesNumber(this.props.item._id);
    }

    componentDidMount() {
        this.getTourRating();
    }

    getTourRating = () => {
        let tourId = this.props.item._id;
        //TODO realize a server part for comments and ratings and use fetch to get rating
        let rating = 7;
        this.setState({rating: rating});
    };

    getPlacesNumber = (tourId) => {
        let sql = 'SELECT count(*) AS places_number FROM tour_places GROUP BY tour_id HAVING tour_id=' + tourId;
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                sql,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        let cnt = results.rows.item(0);
                        let count = cnt['places_number'];
                        this.setState({
                            placesCount: count,
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
        let coverImageName = 'tour_photo_placeholder';
        if (item.cover_image.length > 1 && images.hasOwnProperty(item.cover_image)) {
            coverImageName = item.cover_image;
        }
        return <TouchableOpacity onPress={() => onpressHandler(item._id)}>
            <View style={[styles.cardSmall, styles.cardWithShadow]}>
                <View style={styles.cardSmallLeft}>
                    <Image source={images[coverImageName]} style={styles.cardSmallImage}/>
                </View>
                <View style={styles.cardSmallRight}>
                    <View style={styles.cardSmallBody}>
                        <Text style={styles.cardSmallName}>{item.name}</Text>
                        <Text style={styles.cardSmallDescription} numberOfLines={4} ellipsizeMode='tail'>
                            {item.description}
                        </Text>
                    </View>
                    <View style={styles.cardSmallFooter}>
                        <Rating value={this.state.rating}/>
                        <Text
                            style={styles.cardNumberOfItems}>
                            {this.state.placesCount} {this.state.placesCount === 1 ? 'place' : 'places'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>;
    }
}
