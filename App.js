'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {colors} from "./colors.js";
import {images} from "./images.js";

import StartPage from './pages/StartPage';
import ToursList from './pages/ToursList';
import TourPage from './pages/TourPage';
import PlacesList from './pages/PlacesList';
import PlacePage from './pages/PlacePage';
import AboutCityPage from './pages/AboutCityPage';
import FavoritesList from './pages/FavoritesList';


// const instructions = Platform.select({ ... });

type Props = {};


const navStack = createStackNavigator({
    Home: {screen: StartPage},
    ToursList: {screen: ToursList},
    PlacesList: {screen: PlacesList},
    TourPage: {screen: TourPage},
    PlacePage: {screen: PlacePage},
    FavoritesList: {screen: FavoritesList},
    AboutCity: {screen: AboutCityPage},
}, {initialRouteName: 'Home'});

//const App = createAppContainer(navStack);


const startPageStack = createStackNavigator({
    Home: {screen: StartPage},
    TourPage: {screen: TourPage},
    PlacePage: {screen: PlacePage},
    AboutCity: {screen: AboutCityPage},
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        //Header customization of the perticular Screen
        headerStyle: {
            backgroundColor: colors.colorPrimaryDark,
        },
        headerTintColor: colors.colorTextAndIcons,
        title: 'Almaty Tourist',
        gestureEnabled: true,
    },
});


const toursListStack = createStackNavigator({
    ToursList: {screen: ToursList},
    TourPage: {screen: TourPage},
    PlacePage: {screen: PlacePage},
}, {
    initialRouteName: 'ToursList',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.colorPrimaryDark,
        },
        headerTintColor: colors.colorTextAndIcons,
        title: 'Tours',
        gestureEnabled: true,
    },
});

const placesListStack = createStackNavigator({
    PlacesList: {screen: PlacesList},
    PlacePage: {screen: PlacePage},
}, {
    initialRouteName: 'PlacesList',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.colorPrimaryDark,
        },
        headerTintColor: colors.colorTextAndIcons,
        title: 'Places',
        gestureEnabled: true,
    },
});

const favoritesListStack = createStackNavigator({
    FavoritesList: {screen: FavoritesList},
    TourPage: {screen: TourPage},
    PlacePage: {screen: PlacePage},
}, {
    initialRouteName: 'FavoritesList',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.colorPrimaryDark,
        },
        headerTintColor: colors.colorTextAndIcons,
        title: 'Favorites',
        gestureEnabled: true,
    },
});

const otherListStack = createStackNavigator({
    AboutCity: {screen: AboutCityPage},
}, {
    initialRouteName: 'AboutCity',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.colorPrimaryDark,
        },
        headerTintColor: colors.colorTextAndIcons,
        title: 'Other',
        gestureEnabled: true,
    },
});

const TabNavigator = createBottomTabNavigator(
    {
        Home: {screen: startPageStack},
        Tours: {screen: toursListStack},
        Places: {screen: placesListStack},
        Favorites: {screen: favoritesListStack},
        Other: {screen: otherListStack},
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Image
                            source={
                                images.home
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 40 / 2,
                            }}
                        />
                    );
                } else if (routeName === 'Tours') {
                    return (
                        <Image
                            source={
                                images.world
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 40 / 2,
                            }}
                        />
                    );
                } else if (routeName === 'Places') {
                    return (
                        <Image
                            source={
                                images.location
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 40 / 2,
                            }}
                        />
                    );
                } else if (routeName === 'Favorites') {
                    return (
                        <Image
                            source={
                                images.empty_star
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 40 / 2,
                            }}
                        />
                    );
                } else if (routeName === 'Other') {
                    return (
                        <Image
                            source={
                                images.help1
                            }
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 40 / 2,
                            }}
                        />
                    );
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: colors.colorPrimaryDark,
            inactiveTintColor: colors.colorSecondaryText,
        },
    },
);
const App = createAppContainer(TabNavigator);

export default App;
