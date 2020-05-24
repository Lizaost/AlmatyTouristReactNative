'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';
import {setI18nConfig, translate} from '../localization';
import * as RNLocalize from "react-native-localize";

type Props = {};

export default class Covid19InfoPage extends Component<Props> {
    // static navigationOptions = {
    //     title: 'COVID-19 Information',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'COVID-19 Information' : navigation.state.params.title,
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
        this.setPageTitle(translate('covid19-page_title'));
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
        console.log('Covid19Page.render');
        return (
            <ScrollView>
                <View style={styles.aboutCityContainer}>

                    <Image source={images['covid19_slide']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('covid19-p1')}
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        {translate('covid19-p2')}
                    </Text>


                </View>
            </ScrollView>
        );
    }

}
