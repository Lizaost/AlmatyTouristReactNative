import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles.js';

export default class CommentPlaceholder extends React.Component {
    render() {
        return (<View style={styles.commentPlaceholder}>
            <View style={styles.commentHeader}>
                <View style={[styles.commentPlaceholderBlockA, styles.commentPlaceholderName]}></View>
                <View style={[styles.commentPlaceholderBlockB, styles.commentPlaceholderRating]}></View>
            </View>
            <View style={styles.commentBody}>
                <View style={[styles.commentPlaceholderBlockC, styles.commentPlaceholderText]}></View>
                <View style={[styles.commentPlaceholderBlockC, styles.commentPlaceholderText]}></View>
                <View style={[styles.commentPlaceholderBlockC, styles.commentPlaceholderText]}></View>
            </View>
        </View>)
    }
}
