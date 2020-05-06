import React, {Component} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';

export default function FavoritesListItem({onpressHandler, item}) {
    console.log('Rendering favorites list item for ' + item.type + ' with id ' + item.itemId);
    console.log(item);
    //let item = this.props.item;
    let cardDescription = (item.type === 'tour' ? 'Small tour card for tour with id ' : 'Small place card for place with id ')
        + item.itemId;
    return <TouchableOpacity onPress={() => onpressHandler(item)}>
        <View style={styles.cardSmall}>
            <Text style={styles.cardBigName}>{cardDescription}</Text>
        </View>
    </TouchableOpacity>;
}
