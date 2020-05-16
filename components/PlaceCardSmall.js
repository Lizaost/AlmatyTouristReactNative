import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images.js';
import Rating from '../components/Rating';
import RatingPlaceholder from './RatingPlaceholder';


export default class PlaceCard extends React.Component {

    state = {
        rating: 0,
        ratingLoaded: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            ratingLoaded: false,
        };
    }

    componentDidMount() {
        this.getPlaceRating();
        this.focusListener = this.props.nav.addListener(
            'didFocus',
            () => {
                this.setState({
                    ratingLoaded: false,
                });
                this.getPlaceRating();
                console.log('Reloading place rating for place ' + this.props.item._id);
            },
        );
    }

    componentWillMount(): void {
        this.getPlaceRating();
    }

    componentWillUnmount(): void {
        this.focusListener.remove();
    }

    getPlaceRating = async () => {
        let placeId = this.props.item._id;
        let query = 'http://almatytouristbeta.pythonanywhere.com/rating?type=place&id=' + placeId;
        //alert(query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Rating (' + this.props.item.name + '):' + json.rating);
                this.setState({
                    rating: json.rating,
                    ratingLoaded: true,
                });
                console.log('==== ' + this.state.rating);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
        //let rating = 7;
        //console.log("***" + this.state.rating);
        //this.setState({rating: this.state.rating});
    };

    render() {
        let onpressHandler = this.props.onpressHandler;
        let item = this.props.item;
        console.log('Rendering tour card for place with id ' + item._id);
        console.log(item);
        let coverImageName = 'place_photo_placeholder';
        if (item.cover_image.length > 1 && images.hasOwnProperty(item.cover_image)) {
            coverImageName = item.cover_image;
        }
        return <TouchableOpacity onPress={() => onpressHandler(item._id)}>
            <View style={[styles.cardSmall, styles.cardWithShadow]}>
                <View style={styles.cardSmallLeft}>
                    <Image source={images[coverImageName]} style={styles.cardSmallImage}/>
                </View>
                <View style={styles.cardSmallRight}>
                    <View style={styles.cardSmallBody}>
                        <Text style={styles.cardSmallName}>{item.name}</Text>
                        <Text style={styles.cardSmallDescription} numberOfLines={4} ellipsizeMode='tail'>
                            {item.description}
                        </Text>
                    </View>
                    <View style={styles.cardSmallFooter}>
                        {this.state.ratingLoaded ? <Rating value={this.state.rating}/> : <RatingPlaceholder/>}
                        {/*<Rating value={this.state.rating}/>*/}
                    </View>
                </View>
            </View>
        </TouchableOpacity>;
    }
}
