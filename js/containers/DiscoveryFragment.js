/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from '../external/ScrollableTabBar';
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
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarUnderlineStyle={{backgroundColor: '#fff'}}
                tabBarBackgroundColor={theme.mainThemeColor}
                tabBarTextStyle={{color: '#fff'}}>
                <ImageTabPage tabLabel={this.tabNames[0]} />
                <TextTabPage tabLabel={this.tabNames[1]} />
                <TextTabPage tabLabel={this.tabNames[2]} />
                <VideoTabPage tabLabel={this.tabNames[3]} />
                <TextTabPage tabLabel={this.tabNames[4]} />
                <TextTabPage tabLabel={this.tabNames[5]} />
            </ScrollableTabView>
        );
    }
}