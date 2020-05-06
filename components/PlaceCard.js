import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';
import {images} from "../images.js";


export default class PlaceCard extends React.Component{
    render() {
        let onpressHandler = this.props.onpressHandler;
        let item = this.props.item;
        console.log('Rendering tour card for place with id ' + item._id);
        console.log(item);
        let coverImageName = "place_photo_placeholder";
        if (item.cover_image.length > 1 && images.hasOwnProperty(item.cover_image)){
            coverImageName = item.cover_image;
        }
        return <TouchableOpacity onPress={() => onpressHandler(item._id)}>
            <View style={styles.cardBig}>
                <Image source={images[coverImageName]} style={styles.cardBigImage}/>
                <Text style={styles.cardBigName}>{item.name}</Text>
                <Text style={styles.cardBigDescription} numberOfLines={3} ellipsizeMode='tail'>
                    {item.description}
                </Text>
                <View style={styles.cardBigFooter}>
                    <Text style={styles.cardRating}>RATING</Text>
                </View>
            </View>
        </TouchableOpacity>;
    }
}
