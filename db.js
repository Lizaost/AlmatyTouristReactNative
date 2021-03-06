import {openDatabase} from 'react-native-sqlite-storage';
import i18n from 'i18n-js';


export default function getDatabaseConnection() {
    console.log("Connecting to the pre-filled database");
    let locale = "en";
    locale = i18n.locale;
    if (locale === 'en') {
        return openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
    } else if (locale === 'ru') {
        return openDatabase({name: 'db_ru.db', createFromLocation: '~db_ru.db'});
    } else {
        return openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
    }
    //let db = openDatabase({name: 'db_en.db', createFromLocation: '~db_en.db'});
}
