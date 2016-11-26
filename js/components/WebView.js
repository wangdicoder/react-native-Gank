/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from './NavigationBar';
import BackPageComponent from '../containers/BackPageComponent';

export default class WebView extends BackPageComponent{

    render(){
        const naviagtionBarTitle = 'via: '+this.props.rowData.who;
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title={naviagtionBarTitle} isBackBtnOnLeft={true} leftBtnIcon="arrow-back" leftBtnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}