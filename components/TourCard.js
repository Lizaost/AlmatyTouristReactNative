import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';

export default function TourCard({item}) {
    console.log('Rendering tour card for tour with id ' + item._id);
    let numberOfPlaces = 5; //TODO: COUNT OR GET FROM DATABASE
    //let item = this.props.item;
    return <View style={styles.cardBig}>
        <Text style={styles.cardBigImage}>IMAGE</Text>
        <Text style={styles.cardBigName}>{item.name}</Text>
        <Text style={styles.cardBigDescription} numberOfLines={3} ellipsizeMode='tail'>
            {item.description}
        </Text>
        <View style={styles.cardBigFooter}>
            <Text style={styles.cardRating}>RATING</Text>
            <Text style={styles.cardNumberOfItems}>{numberOfPlaces} {numberOfPlaces>1 ? "places" : "place"}</Text>
        </View>
    </View>;

}
