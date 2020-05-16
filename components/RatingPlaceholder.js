import React from 'react';
import {View, Image} from 'react-native';
import {images} from '../images';
import {styles} from '../styles';

export default class RatingPlaceholder extends React.Component {

    render() {
        return <View style={styles.ratingContainer}>
            <Image source={images['empty_star']} style={styles.ratingStarImage}/>
            <Image source={images['empty_star']} style={styles.ratingStarImage}/>
            <Image source={images['empty_star']} style={styles.ratingStarImage}/>
            <Image source={images['empty_star']} style={styles.ratingStarImage}/>
            <Image source={images['empty_star']} style={styles.ratingStarImage}/>
        </View>;
    }
}
