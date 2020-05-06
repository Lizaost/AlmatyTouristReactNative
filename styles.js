'use strict';

import {StyleSheet, Dimensions} from 'react-native';

let screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width: 217,
        height: 138,
    },

    cardBig: {
        borderColor: 'black',
        padding: 10,
        marginBottom: 20,
    },

    cardBigName: {
        fontSize: 24,
        marginRight: 40,
    },

    cardBigDescription: {
        fontSize: 18,
        marginRight: 40,
    },

    cardBigImage: {
        height: 280,
        width: '100%',
        resizeMode: "cover",
    },

    cardBigFooter: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    cardRating: {
        fontSize: 14,
        width: 80,
        height: 20,
        backgroundColor: '#ccc',
    },

    cardSmall: {
      height: 200,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
    },

    cardNumberOfItems: {
        fontSize: 14,
        width: 100,
        height: 20,
    },

    startPageSlider: {
        height: 200,
        // NEXT STYLES ARE ONLY FOR PLACEHOLDER BLOCK
        fontSize: 20,
        backgroundColor: '#aaa',
        textAlign: 'center',
        justifyContent: 'center',
    },

    startPageSection: {
        marginVertical: 10,
    },

    startPageSectionHeader: {
        fontSize: 24,
        paddingLeft: 16,
        paddingBottom: 8,
    },

    startPageSectionSlider: {
        height: 180,
        // NEXT STYLES ARE ONLY FOR PLACEHOLDER BLOCK
        fontSize: 20,
        backgroundColor: '#ccc',
        textAlign: 'center',
        justifyContent: 'center',
    },

    aboutCityContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 0
    },

    aboutCityParagraph: {
        fontSize: 18,
        marginVertical: 10,
    },

    aboutCityImage: {
        height: 180,
        // NEXT STYLES ARE ONLY FOR PLACEHOLDER BLOCK
        fontSize: 20,
        backgroundColor: '#ccc',
        textAlign: 'center',
        justifyContent: 'center',
    }
});

