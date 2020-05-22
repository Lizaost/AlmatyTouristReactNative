'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {StartPageTopSlider} from '../components/StartPageTopSlider';
import {PopularToursSlider} from '../components/PopularToursSlider';
import {InterestingPlacesSlider} from '../components/InterestingPlacesSlider';
import {RecommendationsSlider} from '../components/RecommendationsSlider';


type Props = {};

export default class StartPage extends Component<Props> {
    static navigationOptions = {
        title: 'Almaty Tourist Start Page',
    };

    state = {
        selectedItemType: null,
        selectedItemId: null,
        all_tours: [],
        tours_number: 0,
        likes: [],
    };

    constructor(props) {
        super(props);
        this.getLikes();
    }

    getLikes = async () => {
        try {
            const value = await AsyncStorage.getItem('likes_list');
            if (value !== null) {
                // value previously stored
                this.setState({likes: JSON.parse(value)});
            }
        } catch (e) {
            console.log('Error loading likes_list from async storage: \n' + e);
        }
    };

    _onTestDatabaseConnectionPressed = () => {
        let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours',
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({tours_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        alert(str);
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        this.setState({
                            all_tours: temp,
                        });
                    } else {
                        alert('No tours found');
                    }
                });
        });
    };

    _onOpenToursListPressed = () => {
        this.props.navigation.navigate('ToursList');
    };

    _onOpenPlacesListPressed = () => {
        this.props.navigation.navigate('PlacesList');
    };

    _onOpenFavoritesListPressed = () => {
        this.props.navigation.navigate('FavoritesList');
    };

    _onOpenAboutCityPagePressed = () => {
        this.props.navigation.navigate('AboutCity');
    };

    render() {
        console.log('StartPage.render');
        return (
            <ScrollView>
                <View>
                    <View style={styles.startPageSlider}>
                        {/*<Text style={styles.description}>SLIDER WITH INFORMATION ABOUT CITY, RECOMMENDED TOURS AND*/}
                        {/*    PAGES, COVID-19 INFO WILL BE HERE</Text>*/}

                    </View>
                    <StartPageTopSlider nav={this.props.navigation}/>



                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>Just for You</Text>
                        <RecommendationsSlider nav={this.props.navigation}/>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>Popular tours</Text>
                        <PopularToursSlider nav={this.props.navigation}/>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>Interesting places</Text>
                        <InterestingPlacesSlider nav={this.props.navigation}/>
                    </View>

                </View>
            </ScrollView>
        );
    }

}
