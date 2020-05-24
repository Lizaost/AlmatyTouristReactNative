'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableNativeFeedback, Image, Linking} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import {translate, setI18nConfig} from '../localization';

type Props = {};

export default class OtherLinksPage extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Other',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'Other' : navigation.state.params.title,
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
        this.setPageTitle(translate('other_links-page_title'));
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


    _onAboutCityPressed = () => {
        this.props.navigation.navigate(
            'AboutCity');
    };

    _onCovid19InfoPressed = () => {
        this.props.navigation.navigate(
            'Covid19');
    };

    _onFAQPressed = () => {
        this.props.navigation.navigate(
            'FAQ');
    };

    _onTermsAndConditionsPressed = () => {
        this.props.navigation.navigate(
            'TermsAndConditions');
    };

    _onContactUsPressed = () => {
        console.log('Opening mail app with a mail to developers email address');
        Linking.openURL('mailto:support@almatytourist.kz?subject=Almaty+Tourist+App+Question');
    };

    render() {
        console.log('OtherLinksPage.render');
        return (
            <View style={styles.otherLinksPageWrapper}>
                <View style={styles.otherLinksPageLinksWrapper}>

                    <TouchableNativeFeedback onPress={this._onFAQPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                {translate('links-FAQ')}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onAboutCityPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                {translate('links-about_city')}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onCovid19InfoPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                {translate('links-COVID19')}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onTermsAndConditionsPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                {translate('links-terms_and_conditions')}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onContactUsPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                {translate('links-contact_us')}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <Image source={images['almaty_silhouette_without_bg']} style={styles.otherLinksPageCitySilhouette}/>
            </View>
        );
    }

}
