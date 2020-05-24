'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';
import * as RNLocalize from "react-native-localize";
import {translate, setI18nConfig} from '../localization';

type Props = {};

export default class FAQPage extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'FAQ' : navigation.state.params.title,
    });

    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    constructor(props) {
        super(props);
        setI18nConfig();
        this.setPageTitle(translate("FAQ_page-page_title"));
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
        console.log('FAQPage.render');
        return (
            <ScrollView>

                <View style={styles.FAQSectionBlock}>
                    <Text style={styles.FAQQuestion}>
                        {translate('FAQ_page-question-1')}
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        {translate('FAQ_page-answer-1')}
                    </Text>
                </View>

                <View style={styles.FAQSectionBlock}>
                    <Text style={styles.FAQQuestion}>
                        {translate('FAQ_page-question-2')}
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        {translate('FAQ_page-answer-2')}
                    </Text>
                </View>


                <View style={styles.FAQSectionBlock}>
                    <Text style={styles.FAQQuestion}>
                        {translate('FAQ_page-question-3')}
                    </Text>

                    <Text style={styles.FAQAnswer}>
                        {translate('FAQ_page-answer-3')}
                    </Text>
                </View>

            </ScrollView>
        );
    }

}
