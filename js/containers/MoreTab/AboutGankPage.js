/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import BackPageComponent from '../BackPageComponent';
import NavigationBar from '../../components/NavigationBar';

export default class AboutGankPage extends BackPageComponent{

    render(){
        return(
            <View>
                <NavigationBar
                    title="关于Gank.io"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}