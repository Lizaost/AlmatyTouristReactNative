import React from 'react';
import {Picker} from '@react-native-community/picker';

export default class PlacesFilterDropdown extends React.Component {
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
            style={{height: 50, width: 200}}
            mode={'dropdown'}
            onValueChange={(itemValue, itemIndex) => {
                this.handleItemSelect(itemValue, itemIndex);
            }
            }>
            <Picker.Item label="A-Z" value="name ASC"/>
            <Picker.Item label="Z-A" value="name DESC"/>
            <Picker.Item label="New-Old" value="_id DESC"/>
            <Picker.Item label="Old-New" value="_id ASC"/>
        </Picker>;
    }
}
