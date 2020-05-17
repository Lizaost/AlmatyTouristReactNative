import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {styles} from '../styles.js';
import Rating from './Rating';
import RatingInput from './RatingInput';

export default class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authorName: 'AuthorName',
            commentText: 'CommentText',
            rating: 0,
            itemId: this.props.item_id,
            itemType: this.props.item_type,
            isItemCommented: false,
            isItemCommentedChecked: false,
        };
        this.testIfItemIsCommented();
    }

    // Comment structure on the server:
    // 'id': 5,
    // 'author': 'abcdef3uniquedeviceid',
    // 'author_name': 'Lina',
    // 'text': 'just a second sample comment',
    // 'rating': 6,
    // 'item_type': 'place',
    // 'item_id': 4

    postComment = async (comment) => {
        let url = 'http://almatytouristbeta.pythonanywhere.com/add_comment';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(comment),
        });
        this.props.onCommentPostedCallback();
        return response.json(); // parses JSON response into native JavaScript objects
    };

    testIfItemIsCommented = () => {
        let query = 'http://almatytouristbeta.pythonanywhere.com/is_commented?author=' + DeviceInfo.getUniqueId() +
            '&item_type=' + this.state.itemType + '&item_id=' + this.state.itemId;
        console.log(query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('IsCommented (' + this.state.itemType + this.state.itemId + '):' + json.is_commented);
                this.setState({
                    isItemCommented: json.is_commented,
                    isItemCommentedChecked: true,
                });
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
    };

    _handleButtonClick = () => {
        this.postComment({author: 'test_author_id_string'})
            .then((json) => alert(JSON.stringify(json)));
    };

    _onPostCommentButtonClicked = () => {
        let author_id = DeviceInfo.getUniqueId();
        let comment = {
            'author': author_id,
            'author_name': this.state.authorName,
            'text': this.state.commentText,
            'rating': this.state.rating,
            'item_type': this.state.itemType,
            'item_id': this.state.itemId,
        };
        this.postComment(comment)
            .then((json) => {
                this.testIfItemIsCommented();
                console.log('Posted comment:\n' + JSON.stringify(json) + '\n' + json.keys);
            });
    };

    _handleCommentTextChange = (text) => {
        this.setState({commentText: text});
    };

    _handleCommentAuthorChange = (text) => {
        this.setState({authorName: text});
    };

    ratingSetCallbackFunction = (rating) => {
        this.setState({rating: rating});
        console.log('CommentInput state is updated. Rating is set to ' + rating);
    };


    render() {
        let content = this.state.isItemCommentedChecked ? (!this.state.isItemCommented ?
            <View>
                <TextInput
                    style={[styles.input, styles.commentRow, styles.commentAuthorNameInput]}
                    placeholder="Name"
                    onChangeText={this._handleCommentAuthorChange}
                />
                <TextInput
                    style={[styles.input, styles.commentRow, styles.commentTextInput]}
                    placeholder="What do you think?"
                    onChangeText={this._handleCommentTextChange}
                    multiline
                />
                <View style={[styles.commentInputFooter, styles.commentRow]}>
                    <RatingInput style={styles.commentRatingInput} ratingSetCallback={this.ratingSetCallbackFunction}/>
                    <Button style={styles.commentSendButton} onPress={() => this._onPostCommentButtonClicked()}
                            title={'SEND'}/>
                </View>
            </View>
            : <Text style={styles.itemAlreadyCommentedMessage}>You have already reviewed this item. Only one review from
                user is allowed.</Text>)
            : <View/>;

        return (<View style={styles.commentInput}>
            {content}
        </View>);
    }
}
