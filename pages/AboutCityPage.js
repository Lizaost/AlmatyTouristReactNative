'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, setI18nConfig} from '../localization';

type Props = {};

export default class AboutCityPage extends Component<Props> {
    // static navigationOptions = {
    //     title: 'About Almaty',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'About Almaty' : navigation.state.params.title,
    });

    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            selectedPlaceId: null,
        };
        this.setPageTitle(translate('about_city-page_title'));
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

    render() {
        console.log('AboutCityPage.render');
        return (
            <ScrollView>
                <View style={styles.aboutCityContainer}>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p1')}
                    </Text>

                    <Image source={images['almaty_city_photo']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p2')}
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p3')}
                    </Text>

                    <Image source={images['first_president_park_almaty']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p4')}
                    </Text>

                    <Image source={images['kazakhs_state_academic']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p5')}
                    </Text>

                    <Image source={images['gold_man']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p6')}
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('about_city-p7')}
                    </Text>

                </View>
            </ScrollView>
        );
    }

}
