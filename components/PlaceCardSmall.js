import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images.js';
import Rating from '../components/Rating';


export default class PlaceCard extends React.Component {

    state = {
        rating: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        };
    }

    componentDidMount() {
        this.getPlaceRating();
    }

    getPlaceRating = () => {
        let placeId = this.props.item._id;
        //TODO realize a server part for comments and ratings and use fetch to get rating
        let rating = 7;
        this.setState({rating: rating});
    };

    render() {
        let onpressHandler = this.props.onpressHandler;
        let item = this.props.item;
        console.log('Rendering tour card for place with id ' + item._id);
        console.log(item);
        let coverImageName = 'place_photo_placeholder';
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
                    </View>
                </View>
            </View>
        </TouchableOpacity>;
    }
}
