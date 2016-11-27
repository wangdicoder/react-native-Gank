/**
 * Created by wangdi on 27/11/16.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import BackPageComponent from '../BackPageComponent';
import NavigationBar from '../../components/NavigationBar';

export default class OrderContentPage extends BackPageComponent{

    render(){
        return(
            <View>
                <NavigationBar
                    title="首页内容展示顺序"
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}