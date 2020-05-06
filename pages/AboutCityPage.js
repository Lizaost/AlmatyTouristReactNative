'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {styles} from '../styles.js';
import {images} from '../images';

type Props = {};

export default class AboutCityPage extends Component<Props> {
    static navigationOptions = {
        title: 'About Almaty',
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

                    <Text style={styles.aboutCityParagraph}>
                        Almaty is one of the most important cities in Kazakhstan, which also has a wide range of
                        economic development of the country. One of the most important attractions of the city can be
                        noted not the cultural center, park or theater, but the fact that in this city among the
                        mountains live different nations, friends people, despite the worldview and share their own
                        culture, making something new.
                    </Text>

                    <Image source={images['almaty_city_photo']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        As it was once said and opened theSouthern capital according to some data turned more than a
                        thousand years, which means no special importance even in the ancient world, not considering
                        what role it played in the future, namely - the development of industry began from here. For a
                        while apple city was even the capital of the country, but it can be noted that even if now it is
                        not - most indigenous Almaatians think quite differently.
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        The city is a whole history, because here you can find buildings built during the Soviet era, as
                        well as architectural buildings inspired by a new current of culture in engineering. In parks,
                        on pedestrian streets you can often find all sorts of installations that will tell a curious
                        resident about the history of the city, the country and tell about the life of the people who
                        lived here earlier.
                    </Text>

                    <Image source={images['first_president_park_almaty']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        Also, in the city are popular museums, which number 25. One of Abay\'s notable house-museum is
                        said to have designed it personally. Among the popular everywhere can be noted: Almaty
                        Historical and Regional, Military-Historical and history of political repression. At the same
                        time, the city has 25 libraries, 23 of which have a common network, this number is not for
                        nothing, because thanks to cultural ties with countries even far abroad, the shelves do not burn
                        and foreign books, which allows even the youngest reader to familiarize himself with the history
                        of this or another country.
                    </Text>

                    <Image source={images['kazakhs_state_academic']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        But why does Almaty consider the country\'s cultural and economic center? The city has 14
                        theaters and the most remarkable thing is that large of them are built in this part of the
                        republic. One example are theaters named after Abay, Mukhtar Auezov, GabitMus, Mikhail
                        Lermontov, Natalia Sats. At the same time, the Apple Valley also has national theatres: Gursky,
                        Korean and German.
                    </Text>

                    <Image source={images['gold_man']} style={styles.aboutCityImage}/>

                    <Text style={styles.aboutCityParagraph}>
                        A separate feature of the city can be distinguished that recently began to gain popularity
                        festivals, where a person with a variety of hobbies can find their place.
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        What can be said at the end? Almaty is an interesting city with its history and peculiarities, a
                        city that carries a human soul and will never leave a man who came here without positive
                        emotions.
                    </Text>

                </View>
            </ScrollView>
        );
    }

}
