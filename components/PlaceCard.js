import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';

export default function PlaceCard({item}) {
    console.log('Rendering tour card for place with id ' + item._id);
    //let item = this.props.item;
    return <View style={styles.cardBig}>
        <Text style={styles.cardBigImage}>IMAGE</Text>
        <Text style={styles.cardBigName}>{item.name}</Text>
        <Text style={styles.cardBigDescription} numberOfLines={3} ellipsizeMode='tail'>
            {item.description}
        </Text>
        <View style={styles.cardBigFooter}>
            <Text style={styles.cardRating}>RATING</Text>
        </View>
    </View>;
}
