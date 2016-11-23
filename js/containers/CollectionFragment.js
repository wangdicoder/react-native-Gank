/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from '../components/NavigationBar';

export default class CollectionFragment extends Component{

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
            </View>
        );
    }
}