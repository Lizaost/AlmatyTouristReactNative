'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

type Props = {};

export default class Covid19InfoPage extends Component<Props> {
    static navigationOptions = {
        title: 'COVID-19 Information',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('AboutCityPage.render');
        return (
            <ScrollView>
                <View style={styles.aboutCityContainer}>

                    <Image source={images['covid19_slide']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        There will be soe information about COVID-19, quarantine and recommendations.
                    </Text>


                </View>
            </ScrollView>
        );
    }

}
