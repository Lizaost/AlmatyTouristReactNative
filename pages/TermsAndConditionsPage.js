'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';
import {setI18nConfig, translate} from '../localization';
import * as RNLocalize from "react-native-localize";

type Props = {};

export default class TermsAndConditionsPage extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Terms and Conditions',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'Terms&Conditions' : navigation.state.params.title,
    });

    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    constructor(props) {
        super(props);
        this.setPageTitle(translate("terms_and_conditions-page_title"));
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
        console.log('TermsAndConditionsPage.render');
        return (
            <ScrollView>
                <View style={styles.aboutCityContainer}>

                    <Text style={styles.aboutCityParagraph}>
                            {translate('terms_and_conditions-text')}
                    </Text>


                </View>
            </ScrollView>
        );
    }

}
