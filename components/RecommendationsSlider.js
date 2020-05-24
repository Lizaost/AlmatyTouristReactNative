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

export class RecommendationsSlider extends Component {

    state = {
        items: [],
        itemsList: [],
        itemsLoaded: false,
    };

    constructor(props) {
        super(props);
        this.getRecommendedItems();
    }

    getRecommendedItems = () => {
        let query = 'http://almatytouristbeta.pythonanywhere.com/get_recommendations';
        console.log("\n\n\n" + query);
        fetch(query)
            .then(response => response.json())
            .then(json => {
                console.log('Recommendations:' + JSON.stringify(json));
                this.setState({
                    items: json,
                });
                this.loadItems(json);
            })
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error,
                }));
    };

    // SELECT 'tour' AS item_type, * FROM tours
    // UNION SELECT  'place' AS item_type, * FROM places
    // WHERE (item_type='place' AND _id IN (1,3,5)) OR (item_type='tour' AND _id IN (1,2,4))

    //{'type':'place', 'id':1}, {'type':'place', 'id': 5},

    loadItems = (itemsInfo) => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let filterTours = (item) => {
            return item['type'] === 'tour';
        };
        let filterPlaces = (item) => {
            return item['type'] === 'place';
        };
        let toursList = itemsInfo.filter(filterTours);
        let toursIds = toursList.map((item) => {
            console.log("----" + item['id']);
            return item['id'];
        });
        let placesList = itemsInfo.filter(filterPlaces);
        let placesIds = placesList.map((item) => {
            return item['id'];
        });
        console.log('Tours: ' + JSON.stringify(toursList) + '(' + toursIds.join() + ')'
            + '\nPlaces: ' + JSON.stringify(placesList) + '(' + placesIds.join() + ')');
        let db = getDatabaseConnection();
        let sqlQuery = 'SELECT \'tour\' AS item_type, * FROM tours' +
            ' UNION SELECT  \'place\' AS item_type, * FROM places' +
            ' WHERE (item_type=\'tour\' AND _id IN (' + toursIds.join(', ') + ')) ' +
            ' OR (item_type=\'place\' AND _id IN (' + placesIds.join(', ') + '))';
        console.log(sqlQuery);
        db.transaction(tx => {
            tx.executeSql(sqlQuery,
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
                            itemsList: temp,
                            itemsLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No places found');
                    }
                });
        });
    };

    _onOpenTourPressed = (tourId) => {
        console.log('Opening tour with id' + tourId);
        this.props.nav.navigate(
            'TourPage', {tourId: tourId});
    };

    _onOpenPlacePressed = (placeId) => {
        console.log('Opening place with id' + placeId);
        this.props.nav.navigate(
            'PlacePage', {placeId: placeId});
    };

    _renderItem = ({item, index}) => {
        console.log('RecommendationsSlider: ' + JSON.stringify(item) + ' ' + index);
        console.log("&&&&&&&&&&&& " + item['item_type'] + "    " + (item['item_type'] === 'place'));
        let card = item['item_type'] === 'place' ?
            <PlaceCard item={item} nav={this.props.nav} onpressHandler={this._onOpenPlacePressed}/>
            : <TourCard item={item} nav={this.props.nav} onpressHandler={this._onOpenTourPressed}/>;
        return (<View>{card}</View>);
    };

    render() {
        let screenWidth = Dimensions.get('window').width;
        return this.state.itemsLoaded ? <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 0,
                paddingVertical: 0,
                //marginBottom: -40,
            }}>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.itemsList}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth*0.8}
                    layout={'default'}
                    layoutCardOffset={'0'}
                />
            </View> : <CardPlaceholder/>;
    }
}
