import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';
import Rating from './Rating';

export default class CardPlaceholder extends React.Component {
    render() {
        return (<View style={[styles.cardBig, styles.cardWithShadow]}>
            <View style={styles.cardBigImagePlaceholder}/>
            <View style={styles.cardBigBody}>
                <View style={styles.cardBigNamePlaceholder}/>
                <View style={styles.cardBigDescriptionPlaceholder}/>
                <View style={styles.cardBigFooterPlaceholder}/>
            </View>
        </View>)
    }
}
