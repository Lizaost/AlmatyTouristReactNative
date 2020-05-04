import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';

export default function TourCard({item}) {
    console.log('Rendering tour card for tour with id ' + item._id);
    //let item = this.props.item;
    return <View>
        <Text style={styles.description}>
            {item.name}
        </Text>
    </View>;

}
