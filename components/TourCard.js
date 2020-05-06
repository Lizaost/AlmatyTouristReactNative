import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images.js';
import getDatabaseConnection from '../db';


export default class TourCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            placesCount: 0,
        };
        this.getPlacesNumber(this.props.item._id);
    }

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
                        let count = cnt["places_number"];
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
            <View style={styles.cardBig}>
                {/*<View style={styles.cardBigImage}><Text style={styles.description}>IMAGE ({item.cover_image})</Text></View>*/}
                <Image source={images[coverImageName]} style={styles.cardBigImage}/>
                <Text style={styles.cardBigName}>{item.name}</Text>
                <Text style={styles.cardBigDescription} numberOfLines={3} ellipsizeMode='tail'>
                    {item.description}
                </Text>
                <View style={styles.cardBigFooter}>
                    <Text style={styles.cardRating}>RATING</Text>
                    <Text
                        style={styles.cardNumberOfItems}>
                        {this.state.placesCount} {this.state.placesCount === 1 ? 'place' : 'places'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>;
    }
}
