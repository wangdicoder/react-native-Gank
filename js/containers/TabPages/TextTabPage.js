/**
 * Created by wangdi on 23/11/16.
 * Android/iOS/扩展阅读/前端数据页面
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import theme from '../../constants/theme';

export default class TextTabPage extends Component{

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <Text>Android/iOS</Text>
            </View>
        );
    }
}