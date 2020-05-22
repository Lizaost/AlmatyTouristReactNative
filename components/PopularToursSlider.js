import React, {Component} from 'react';
import {View, ScrollView, Text, Image, Dimensions, TouchableNativeFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {images} from '../images';
import {styles} from '../styles';
import DeviceInfo from 'react-native-device-info';
import TourCard from './TourCard';
import getDatabaseConnection from '../db';
import TourCardSmall from './TourCardSmall';
import CardPlaceholder from './CardPlaceholder';

export class PopularToursSlider extends Component {

    state = {
        toursIds: [],
        tours: [],
        toursLoaded: false,
    };

    constructor(props) {
        super(props);
        this.getPopularToursList();
    }

    getPopularToursList = () => {
        let query = 'http://almatytouristbeta.pythonanywhere.com/get_start_page_tours';
        console.log(query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Start page tours ids:' + json);
                this.setState({
                    placesIds: json,
                });
                this.loadTours(json);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
    };

    loadTours = (idsList) => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours WHERE _id IN (' + idsList.join(', ') + ')',
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({tours_number: len});
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
                            tours: temp,
                            toursLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No tours found');
                    }
                });
        });
    };

    _onOpenTourPressed = (tourId) => {
        console.log('Opening tour with id' + tourId);
        this.props.nav.navigate(
            'TourPage', {tourId: tourId});
    };

    _renderItem = ({item, index}) => {
        console.log('PopularToursSlider: ' + JSON.stringify(item) + ' ' + index);
        return (
            <TourCard  style = {{borderColor: '#dfa',
                borderWidth: 3}} item={item} nav={this.props.nav} onpressHandler={this._onOpenTourPressed}/>
        );
    };

    render() {
        let screenWidth = Dimensions.get('window').width;
        return  this.state.toursLoaded ?
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 0,
                paddingVertical: 0,
                marginBottom: -60
            }}>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.tours}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    layout={'default'}
                    layoutCardOffset={'18'}
                />
            </View> :
            <CardPlaceholder/>;
    }
}
