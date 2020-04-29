'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import StartPage from './pages/AboutCityPage';
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
});

const App = createAppContainer(navStack);

export default App;
