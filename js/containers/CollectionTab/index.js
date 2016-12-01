/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';

export default class CollectionFragment extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
                <Button onPress={this._onPress.bind(this)} title="fetch"/>
            </View>
        );
    }

    _onPress(){

    }


}