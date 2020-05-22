'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

type Props = {};

export default class TermsAndConditionsPage extends Component<Props> {
    static navigationOptions = {
        title: 'Terms and Conditions',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('TermsAndConditionsPage.render');
        return (
            <ScrollView>
                <View style={styles.aboutCityContainer}>

                    <Text style={styles.aboutCityParagraph}>
                        Terms and Conditions
                    </Text>


                </View>
            </ScrollView>
        );
    }

}
