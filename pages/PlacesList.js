'use strict';

import React, {Component} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import PlaceCard from '../components/PlaceCard';
import getDatabaseConnection from '../db';
import TourCard from '../components/TourCard';
import PlaceCardSmall from '../components/PlaceCardSmall';
import TourCardSmall from '../components/TourCardSmall';
import ToursFilterDropdown from '../components/ToursFilterDropdown';
import PlacesFilterDropdown from '../components/PlacesFilterDropdown';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, setI18nConfig} from '../localization';

type Props = {};

export default class PlacesList extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Places',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'Places' : navigation.state.params.title,
    });


    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            places: [],
            places_number: 0,
            isPlacesListLoaded: false,
            sorting: 'name ASC',
        };
        this.loadPlaces();
        this.setPageTitle(translate('places_list-page_title'));
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.setState({renderAgain: true});
                this.loadPlaces();
                console.log('The page will be reloaded soon');
            },
        );
        RNLocalize.addEventListener('change', this.handleLocalizationChange);
    }

    componentWillUnmount() {
        this.focusListener.remove();
        RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig()
            .then(() => this.forceUpdate())
            .catch(error => {
                console.error(error);
            });
    };

    loadPlaces = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places ORDER BY ' + this.state.sorting,
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
                            isPlacesListLoaded: true
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No places found');
                    }
                });
        });
    };

    _onOpenPlacePressed = (placeId) => {
        this.props.navigation.navigate(
            'PlacePage', {placeId: placeId});
    };

    _onSortingDirectionSelected = (sorting) => {
        this.setState({sorting: sorting, isPlacesListLoaded: false});
        this.loadPlaces();
    };

    render() {
        console.log('PlacesList.render');
        return (
            <View>
                {/*<Text style={styles.description}>*/}
                {/*    PLACES LIST*/}
                {/*</Text>*/}
                {/*<Button*/}
                {/*    onPress={() => this._onOpenPlacePressed(10)}*/}
                {/*    color='#48BBEC'*/}
                {/*    title='Open Place with id 10'*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    onPress={() => this._onOpenPlacePressed(11)}*/}
                {/*    color='#48BBEC'*/}
                {/*    title='Open Place with id 11'*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    onPress={() => this._onOpenPlacePressed(12)}*/}
                {/*    color='#48BBEC'*/}
                {/*    title='Open Place with id 12'*/}
                {/*/>*/}
                <View style={styles.listFilterRow}>
                    <Text style={styles.listSortingTitle}>{translate('list-sorting')} </Text>
                    <PlacesFilterDropdown itemSelectHandle={(itemValue) => {
                        this._onSortingDirectionSelected(itemValue);
                    }}/>
                </View>
                {this.state.isPlacesListLoaded ? <FlatList
                    data = {this.state.places}
                    renderItem = {(item) => <PlaceCardSmall nav={this.props.navigation} onpressHandler={this._onOpenPlacePressed} item={item["item"]}/>}
                    keyExtractor = {item => item._id}/>  :
                <Text style={styles.description}>
                    {translate('list-loading')}
                </Text>}
            </View>
        );
    }

}
