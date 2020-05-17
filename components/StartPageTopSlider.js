import React, {Component} from 'react';
import {View, ScrollView, Text, Image, Dimensions, TouchableNativeFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {images} from '../images';
import {styles} from '../styles';

export class StartPageTopSlider extends Component {

    state = {
        slides: ['welcome_slide', 'covid19_slide'],
        pages: ['AboutCity', 'Covid19'],
    };

    _renderItem = ({item, index}) => {
        console.log('TopSlider: ' + JSON.stringify(item) + ' ' + index);
        return (
            <TouchableNativeFeedback onPress={() => {
                console.log('pressed');
                this.props.nav.navigate(this.state.pages[index]);
            }}>
                <View style={styles.startPageTopSliderSlide}>
                    <Image source={images[item]} style={styles.startPageTopSliderImage}/>
                </View>
            </TouchableNativeFeedback>
        );
    };

    render() {
        let screenWidth = Dimensions.get('window').width;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 0,
                paddingVertical: 0,
            }}>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.state.slides}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                />
            </View>
        );
    }
}
