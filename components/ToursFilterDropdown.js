import React from 'react';
import {Picker} from '@react-native-community/picker';
import {translate} from '../localization';

export default class ToursFilterDropdown extends React.Component {
    state = {
        sorting: 'name ASC',
    };

    handleItemSelect = (itemValue, itemIndex) => {
        this.props.itemSelectHandle(itemValue);
        this.setState({sorting: itemValue});
    };

    render() {
        return <Picker
            selectedValue={this.state.sorting}
            style={{height: 50, width: 250}}
            mode={"dropdown"}
            onValueChange={(itemValue, itemIndex) => {
                this.handleItemSelect(itemValue, itemIndex);
            }
            }>
            <Picker.Item label={translate('sorting-az')} value="name ASC"/>
            <Picker.Item label={translate('sorting-za')} value="name DESC"/>
            <Picker.Item label={translate('sorting-no')} value="_id DESC"/>
            <Picker.Item label={translate('sorting-on')} value="_id ASC"/>
        </Picker>;
    }
}
