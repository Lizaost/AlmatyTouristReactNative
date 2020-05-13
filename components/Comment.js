import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles.js';
import Rating from './Rating';

export default class Comment extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        return (<View style={styles.comment}>
            <View style={styles.commentHeader}>
                <Text style={styles.commentName}>{this.props.author}</Text>
                <Rating style={styles.commentRating} value={this.props.rating}/>
            </View>
            <View style={styles.commentBody}>
                <Text style={styles.commentText}>{this.props.text}</Text>
            </View>
        </View>)
    }
}
