import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';


const translationGetters = {
    en: () => require('./Resources/translations/en.json'),
    ru: () => require('./Resources/translations/ru.json'),
};

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
    //(key, config) => (config ? key : key),
);

export const setI18nConfig = () => {
    const fallback = {languageTag: 'en'};
    const {languageTag} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

    console.log("--------LOCALE: " + languageTag);
    console.log("---- " + JSON.stringify({[languageTag]: translationGetters[languageTag]()}));

    translate.cache.clear();

    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    //i18n.translations = translationGetters[languageTag]();
    console.log(i18n.translations);
    i18n.locale = languageTag;
};
