'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableNativeFeedback, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

type Props = {};

export default class OtherLinksPage extends Component<Props> {
    static navigationOptions = {
        title: 'Other',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }


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

    _onContactUsPressed = () => {
        console.log('Opening mail app with a mail to developers email address');
    };

    render() {
        console.log('OtherLinksPage.render');
        return (
            <View style={styles.otherLinksPageWrapper}>
                <View style={styles.otherLinksPageLinksWrapper}>

                    <TouchableNativeFeedback onPress={this._onAboutCityPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                About Almaty
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onFAQPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                FAQ
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onCovid19InfoPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                COVID-19 Info
                            </Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={this._onContactUsPressed}>
                        <View style={styles.otherLink}>
                            <Text style={styles.otherLinkTitle}>
                                Contact us
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <Image source={images['almaty_silhouette_without_bg']} style={styles.otherLinksPageCitySilhouette}/>
            </View>
        );
    }

}
