/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ImageTabPage from './TabPages/ImageTabPage';
import TextTabPage from './TabPages/TextTabPage';
import VideoTabPage from './TabPages/VideoTabPage';
import theme from '../constants/theme';

export default class DiscoveryFragment extends Component{
    constructor(props){
        super(props);
        this.tabNames = ['福利','Android','iOS','休息视频','扩展阅读','前端'];
    }

    render(){
        return(
            <View>

            </View>
        );
    }
}