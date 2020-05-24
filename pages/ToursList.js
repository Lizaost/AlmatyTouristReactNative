'use strict';

import React, {Component} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../styles.js';
import {openDatabase} from 'react-native-sqlite-storage';

import TourCard from '../components/TourCard';
import getDatabaseConnection from '../db.js';
import TourCardSmall from '../components/TourCardSmall';
import {NavigationEvents} from 'react-navigation';
import ToursFilterDropdown from '../components/ToursFilterDropdown';
import {setI18nConfig, translate} from '../localization';
import * as RNLocalize from "react-native-localize";

type Props = {};

// function TourCard({item}) {
//     console.log("Rendering tour card fot tour with id " + item._id);
//     return <View>
//         <Text style={styles.description}>
//             {item.name}
//         </Text>
//     </View>
// }

export default class ToursList extends Component<Props> {
    // static navigationOptions = {
    //     title: 'Tours',
    // };

    static navigationOptions = ({navigation}) => ({
        title: typeof (navigation.state.params) === 'undefined'
        || typeof (navigation.state.params.title) === 'undefined' ? 'Tours' : navigation.state.params.title,
    });


    setPageTitle = (title) => {
        this.props.navigation.setParams({title: title});
        console.log('Setting page title to ' + title);
    };

    state = {
        tours: null,
        isToursListLoaded: false,
        sorting: 'name ASC',
    };

    constructor(props) {
        super(props);
        setI18nConfig();
        // this.state = {
        //     tours: null,
        // };
        this.loadTours();
        this.setPageTitle(translate('tours_list-page_title'));
    }

    componentDidMount(): void {
        this.focusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.setState({renderAgain: true});
                this.loadTours();
                console.log('The page will be reloaded soon');
            },
        );
        RNLocalize.addEventListener('change', this.handleLocalizationChange);
    }

    componentWillUnmount(): void {
        this.focusListener.remove();
        RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig()
            .then(() => this.forceUpdate())
            .catch(error => {
                console.error(error);
            });
    };

    loadTours = () => {
        //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
        let db = getDatabaseConnection();
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tours ORDER BY ' + this.state.sorting,
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    this.setState({tours_number: len});
                    //console.log('len',len);
                    if (len > 0) {
                        let str = JSON.stringify(results.rows.item(0));
                        //alert(str);
                        let temp = [];
                        for (let i = 0; i < len; ++i) {
                            temp.push(results.rows.item(i));
                        }
                        //alert(JSON.stringify(temp));
                        this.setState({
                            tours: temp,
                            isToursListLoaded: true,
                        });
                        //alert("*" + this.state.tours[0].name);
                    } else {
                        alert('No tours found');
                    }
                });
        });
    };

    _onOpenTourPressed = (tourId) => {
        console.log('Opening tour with id' + tourId);
        this.props.navigation.navigate(
            'TourPage', {tourId: tourId});
    };

    _onSortingDirectionSelected = (sorting) => {
        this.setState({sorting: sorting, isToursListLoaded: false});
        this.loadTours();
    };


    render() {
        console.log('ToursList.render');
        return (
            <View style={{flexDirection: 'column'}}>
                {/*<Text style={styles.description}>*/}
                {/*    TOURS LIST*/}
                {/*</Text>*/}
                {/*<Button*/}
                {/*    onPress={() => this._onOpenTourPressed(2)}*/}
                {/*    color='#48BBEC'*/}
                {/*    title='Open Tour with id 2'*/}
                {/*/>*/}
                {/*{this.state.isToursListLoaded ?*/}
                {/*    <FlatList*/}
                {/*        data={this.state.tours}*/}
                {/*        renderItem={(item) => <TouchableOpacity*/}
                {/*            onPress={() => alert(JSON.stringify(item['item']))}><Text>{JSON.stringify(item['item'])}</Text></TouchableOpacity>}*/}
                {/*        keyExtractor={item => item._id}/> :*/}
                {/*    <Text style={styles.description}>*/}
                {/*        LOADING*/}
                {/*    </Text>}*/}
                <NavigationEvents onWillFocus={() => this.loadTours()}/>
                <View style={styles.listFilterRow}>
                    <Text style={styles.listSortingTitle}>{translate('list-sorting')} </Text>
                    <ToursFilterDropdown itemSelectHandle={(itemValue) => {
                        this._onSortingDirectionSelected(itemValue);
                    }}/>
                </View>
                {this.state.isToursListLoaded ?
                    <FlatList
                        style={{paddingBottom: 50}}
                        data={this.state.tours}
                        renderItem={(item) => <TourCardSmall nav={this.props.navigation}
                                                             onpressHandler={this._onOpenTourPressed}
                                                             item={item['item']} rerender={this.state.renderAgain}/>}
                        keyExtractor={item => item._id}/> :
                    <Text style={styles.description}>
                        {translate('list-loading')}
                    </Text>}
            </View>
        );
    }

}
