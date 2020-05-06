import React, {Component} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';

export default function PlaceCard({onpressHandler, item}) {
    console.log('Rendering tour card for place with id ' + item._id);
    console.log(item);
    //let item = this.props.item;
    return <TouchableOpacity onPress={() => onpressHandler(item._id)}>
        <View style={styles.cardBig}>
            <View style={styles.cardBigImage}><Text style={styles.description}>IMAGE ({item.cover_image})</Text></View>
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
