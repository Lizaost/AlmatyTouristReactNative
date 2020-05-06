'use strict';

import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from '../styles.js';

type Props = {};

export default class AboutCityPage extends Component<Props> {
    static navigationOptions = {
        title: 'About City Page',
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor ante vel elit
                        viverra,
                        vitae viverra ante convallis. Phasellus vitae sem sapien. Morbi sit amet volutpat leo. Morbi
                        congue
                        aliquet ultricies. Fusce lacinia id dolor a congue. Phasellus varius pretium odio, et ultricies
                        est.
                        Curabitur malesuada ultrices ligula imperdiet viverra. Donec et erat accumsan, mattis tellus id,
                        congue sem. Proin libero nulla, sagittis eu viverra bibendum, finibus in sem.
                    </Text>

                    <Text style={styles.aboutCityImage}>IMAGE WILL BE HERE</Text>

                    <Text style={styles.aboutCityParagraph}>
                        Vestibulum eget condimentum lacus. Vivamus non sem nunc. Duis vehicula ullamcorper diam, a
                        congue
                        odio volutpat sed. In euismod, lorem id hendrerit fermentum, lectus libero lacinia mi, ultricies
                        malesuada erat sapien eget magna. Ut iaculis rhoncus lectus, at gravida erat pharetra non.
                        Phasellus
                        eget condimentum ipsum, vitae convallis nibh. Quisque vel dapibus justo. Quisque nec turpis ac
                        mauris vehicula dignissim eget et risus.
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        Suspendisse volutpat quis nibh at consequat. Morbi lobortis porttitor nisi. Nam sem odio,
                        tristique
                        id consequat at, condimentum sit amet nibh. Sed eget ullamcorper ante. Duis blandit, odio ac
                        lobortis viverra, enim risus fermentum lacus, at commodo massa eros nec diam. Vestibulum
                        dignissim
                        iaculis augue.
                    </Text>

                    <Text style={styles.aboutCityImage}>IMAGE WILL BE HERE</Text>

                    <Text style={styles.aboutCityParagraph}>
                        Proin diam est, dictum nec nulla a, lobortis sollicitudin velit. Aliquam sed lacinia dui, quis
                        suscipit sapien. Curabitur elit orci, pretium sit amet ultricies eget, ornare pulvinar lectus.
                        In
                        pellentesque ultrices ex, sit amet venenatis orci pretium nec. Nulla ut turpis ut sapien blandit
                        egestas. Morbi vestibulum mauris non libero facilisis, vel interdum tortor malesuada. Etiam
                        sollicitudin at mi non faucibus. Donec elit felis, mollis ut odio non, venenatis vulputate
                        purus.
                        Integer vulputate iaculis nibh non egestas. Nullam vel arcu non sapien malesuada finibus.
                        Suspendisse lobortis rutrum sapien eget faucibus. Duis at tellus sit amet est faucibus mollis at
                        a
                        nibh. Donec suscipit efficitur velit ac tristique.
                    </Text>

                    <Text style={styles.aboutCityImage}>IMAGE WILL BE HERE</Text>

                    <Text style={styles.aboutCityParagraph}>
                        Morbi pharetra placerat tellus, vitae semper dui pharetra sed. Integer sodales libero
                        augue, et fermentum leo pellentesque quis. Duis mattis consectetur interdum. Nunc posuere risus
                        ut
                        purus egestas malesuada. Nunc pharetra elit orci, ac accumsan neque malesuada ut. Fusce vel diam
                        elit. Vestibulum auctor mauris in neque auctor, at finibus erat pellentesque. Integer tincidunt
                        ullamcorper justo sit amet dictum. Curabitur non eleifend felis. Aliquam venenatis odio eget
                        ligula
                        aliquam, a blandit elit semper.
                    </Text>

                    <Text style={styles.aboutCityParagraph}>
                        Aenean aliquet orci in orci tempor molestie. Pellentesque habitant morbi tristique senectus et
                        netus
                        et malesuada fames ac turpis egestas. Morbi commodo nec lectus et mattis. Nullam congue ante
                        quis
                        quam convallis, vitae cursus erat tempus. Phasellus sit amet lacus id diam interdum consequat.
                        Fusce
                        imperdiet quis lacus sed molestie. Aenean aliquet faucibus molestie.
                    </Text>
                </View>
            </ScrollView>
        );
    }

}
