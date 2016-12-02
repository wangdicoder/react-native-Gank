/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Button} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import ListViewForHome from '../../components/ListViewForHome';
import FavouriteDataDAO from '../../dao/FavouriteDataDAO';

class CollectionFragment extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
                <ListViewForHome
                    dataSource={this.props.dataSource}
                    navigator={this.props.navigator}
                />
            </View>
        );
    }

    _onPress(){

    }


}

const mapStateToProps = (state) => {
    return {
        dataSource: state.favorData.dataSource
    };
};

export default connect(mapStateToProps)(CollectionFragment);