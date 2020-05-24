import React, {Component} from 'react';
import {View, ScrollView, Text, Image, Dimensions, TouchableNativeFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {images} from '../images';
import {styles} from '../styles';
import DeviceInfo from 'react-native-device-info';
import TourCard from './TourCard';
import getDatabaseConnection from '../db';
import TourCardSmall from './TourCardSmall';
import PlaceCard from './PlaceCard';
import CardPlaceholder from './CardPlaceholder';

export class InterestingPlacesSlider extends Component {

    state = {
        placesIds: [],
        places: [],
        placesLoaded: false,
    };

    constructor(props) {
        super(props);
        this.getInterestingPlacesList();
    }

    getInterestingPlacesList = () => {
        let query = 'http://almatytouristbeta.pythonanywhere.com/get_start_page_places';
        console.log(query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Start page tours ids:' + json);
                this.setState({
                    placesIds: json,
                });
                this.loadPlaces(json);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
    };

    loadPlaces = (idsList) => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places WHERE _id IN (' + idsList.join(', ') + ')',
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({places_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        //alert(JSON.stringify(temp));
                        this.setState({
                            places: temp,
                            placesLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No places found');
                    }
                });
        });
    };

    _onOpenPlacePressed = (placeId) => {
        console.log('Opening place with id' + placeId);
        this.props.nav.navigate(
            'PlacePage', {placeId: placeId});
    };

    _renderItem = ({item, index}) => {
        console.log('InterestingPlacesSlider: ' + JSON.stringify(item) + ' ' + index);
        return (
            <PlaceCard item={item} nav={this.props.nav} onpressHandler={this._onOpenPlacePressed}/>
        );
    };

    render() {
        let screenWidth = Dimensions.get('window').width;
        return this.state.placesLoaded ?
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 0,
                paddingVertical: 0,
                //marginBottom: -20,
            }}>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.places}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth*0.8}
                    layout={'default'}
                    layoutCardOffset={'0'}
                />
            </View> :
            <CardPlaceholder/>;
    }
}
