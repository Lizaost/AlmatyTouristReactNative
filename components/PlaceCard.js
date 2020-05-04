import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';

export default function PlaceCard({item}) {
    console.log('Rendering tour card for place with id ' + item._id);
    //let item = this.props.item;
    return <View>
        <Text style={styles.description}>
            {item.name}
        </Text>
    </View>;

}
