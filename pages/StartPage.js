'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, setI18nConfig} from '../localization';
import {styles} from '../styles.js';
import openDatabase from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {StartPageTopSlider} from '../components/StartPageTopSlider';
import {PopularToursSlider} from '../components/PopularToursSlider';
import {InterestingPlacesSlider} from '../components/InterestingPlacesSlider';
import {RecommendationsSlider} from '../components/RecommendationsSlider';
import CardPlaceholder from '../components/CardPlaceholder';
import CardContainer from 'react-navigation-stack/src/vendor/views/Stack/CardContainer';


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
        setI18nConfig();
        this.getLikes();
    }

    componentDidMount() {
        RNLocalize.addEventListener('change', this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig()
            .then(() => this.forceUpdate())
            .catch(error => {
                console.error(error);
            });
    };

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
        console.log(i18n.translations);
        return (
            <ScrollView>
                <View>
                    <View style={styles.startPageSlider}>
                        {/*<Text style={styles.description}>SLIDER WITH INFORMATION ABOUT CITY, RECOMMENDED TOURS AND*/}
                        {/*    PAGES, COVID-19 INFO WILL BE HERE</Text>*/}

                    </View>
                    <StartPageTopSlider nav={this.props.navigation}/>


                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>
                            {translate('start_page-recommendation_title')}
                        </Text>
                        <RecommendationsSlider nav={this.props.navigation}/>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>{translate('start_page-tours_title')}</Text>
                        <PopularToursSlider nav={this.props.navigation}/>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>{translate('start_page-places_title')}</Text>
                        <InterestingPlacesSlider nav={this.props.navigation}/>
                    </View>

                </View>
            </ScrollView>
        );
    }

}
