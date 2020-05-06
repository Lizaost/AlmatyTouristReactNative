'use strict';

import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';

import Rating from '../components/Rating';

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
                        <Text style={styles.description}>SLIDER WITH INFORMATION ABOUT CITY, RECOMMENDED TOURS AND
                            PAGES, COVID-19 INFO WILL BE HERE</Text>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>Popular tours</Text>
                        <View style={styles.startPageSectionSlider}>
                            <Text style={styles.description}>HORIZONTAL SLIDER (FlatList) WITH POPULAR
                                TOURS</Text>
                        </View>
                    </View>

                    <View style={styles.startPageSection}>
                        <Text style={styles.startPageSectionHeader}>Interesting places</Text>
                        <View style={styles.startPageSectionSlider}>
                            <Text style={styles.description}>HORIZONTAL SLIDER (FlatList) WITH INTERESTING
                                PLACES</Text>
                        </View>
                    </View>

                    <View style={styles.aboutCityContainer}>
                        <Rating value={0}/>
                        <Rating value={1}/>
                        <Rating value={2}/>
                        <Rating value={3}/>
                        <Rating value={4}/>
                        <Rating value={5}/>
                        <Rating value={6}/>
                        <Rating value={7}/>
                        <Rating value={8}/>
                        <Rating value={9}/>
                        <Rating value={10}/>

                        <Text style={styles.aboutCityParagraph}>I've decided to focus on the app logic first (database
                            connection,
                            navigation, etc), so on most pages (as this one) there are placeholders instead of actual
                            blocks
                            with test or real data. Design of all pages will be finished by the final exam.</Text>

                        <Text style={styles.aboutCityParagraph}>I'm still thinking about main navigation pattern for this app:
                            tab
                            bar or hamburger
                            menu, so there are links to other pages:</Text>
                        <Text style={styles.description} onPress={this._onOpenToursListPressed}>TOURS LIST</Text>
                        <Text style={styles.description} onPress={this._onOpenPlacesListPressed}>PLACES LIST</Text>
                        <Text style={styles.description} onPress={this._onOpenFavoritesListPressed}>FAVORITES
                            LIST</Text>
                        <Text style={styles.description} onPress={this._onOpenAboutCityPagePressed}>ABOUT CITY
                            PAGE</Text>
                    </View>
                    {/*<Text style={styles.description}>*/}
                    {/*    START PAGE*/}
                    {/*</Text>*/}
                    {/*<Text style={styles.description}>*/}
                    {/*    item_string = {JSON.stringify(this.state.all_tours)}*/}
                    {/*</Text>*/}
                    {/*<Text style={styles.description}>*/}
                    {/*    ---------------------*/}
                    {/*</Text>*/}
                    {/*<Text style={styles.description}>*/}
                    {/*    item_string = {JSON.stringify(this.state.likes)}*/}
                    {/*</Text>*/}
                    {/*<Button*/}
                    {/*    onPress={this._onOpenToursListPressed}*/}
                    {/*    color='#48BBEC'*/}
                    {/*    title='Open tours list'*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    onPress={this._onOpenPlacesListPressed}*/}
                    {/*    color='#48BBEC'*/}
                    {/*    title='Open places list'*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    onPress={this._onOpenFavoritesListPressed}*/}
                    {/*    color='#48BBEC'*/}
                    {/*    title='Open favorites list'*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    onPress={this._onTestDatabaseConnectionPressed}*/}
                    {/*    color='#48BBEC'*/}
                    {/*    title='TEST DATABASE CONNECTION'*/}
                    {/*/>*/}
                </View>
            </ScrollView>
        );
    }

}
