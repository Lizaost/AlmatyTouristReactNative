'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

type Props = {};

export default class FAQPage extends Component<Props> {
    static navigationOptions = {
        title: 'FAQ',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceId: null,
        };
    }

    render() {
        console.log('FAQPage.render');
        return (
            <ScrollView>
                <View style={styles.FAQSectionBlock}>

                    <Text style={styles.FAQQuestion}>
                        QUESTION 1
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        ANSWER 1
                    </Text>
                </View>

                <View style={styles.FAQSectionBlock}>

                    <Text style={styles.FAQQuestion}>
                        QUESTION 2
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        ANSWER 2
                    </Text>
                </View>

                <View style={styles.FAQSectionBlock}>

                    <Text style={styles.FAQQuestion}>
                        QUESTION 3
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        ANSWER 3
                    </Text>
                </View>

                <View style={styles.FAQSectionBlock}>

                    <Text style={styles.FAQQuestion}>
                        QUESTION 4
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        ANSWER 4
                    </Text>
                </View>

            </ScrollView>
        );
    }

}
