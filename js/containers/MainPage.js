/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from './HomeTab/index';
import DiscoveryFragment from './DiscoveryTab/index';
import MoreFragment from './MoreTab/index';
import CollectionFragment from './CollectionTab/index';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

export default class MainPage extends Component{

    render(){
        return(
            <BottomTabBar navigator={this.props.navigator}/>
        );
    }
}

class BottomTabBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'discovery'
        };
        this.tabNames = ['首页', '发现', '收藏', '更多'];
        this.selectedTab = ['home', 'discovery', 'collection', 'me'];
        this.components = [HomeFragment, DiscoveryFragment, CollectionFragment, MoreFragment];
        this.normalIcons = [this.state.homeNormal, this.state.compassNormal, this.state.collectionNormal, this.state.moreNormal];
        this.selectedIcons = [this.state.homeSelected, this.state.compassSelected, this.state.collectionSelected, this.state.moreSelected];
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        const {navigator} = this.props;
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: tab })}>
                {<Component navigator={navigator}/>}
            </TabNavigator.Item>
        );
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabBarStyle}
                sceneStyle={{paddingBottom: styles.tabBarStyle.height}}>
                {this._renderItem(HomeFragment, 'home', '首页', this.state.homeNormal, this.state.homeSelected)}
                {this._renderItem(DiscoveryFragment, 'discovery', '发现', this.state.compassNormal, this.state.compassSelected)}
                {this._renderItem(CollectionFragment, 'collection', '收藏', this.state.collectionNormal, this.state.collectionSelected)}
                {this._renderItem(MoreFragment, 'more', '更多', this.state.moreNormal, this.state.moreSelected)}
            </TabNavigator>
        );
    }

    componentWillMount(){
        if(Platform.OS === 'ios') {
            Icon.getImageSource('ios-home-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('ios-home-outline', 100, theme.tabButton.selectedColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.tabButton.selectedColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.tabButton.selectedColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.tabButton.selectedColor).then((source) => this.setState({collectionSelected: source}));
        }else if(Platform.OS === 'android'){
            Icon.getImageSource('md-home', 100, theme.tabButton.normalColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('md-home', 100, theme.tabButton.selectedColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('md-compass', 100, theme.tabButton.normalColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('md-compass', 100, theme.tabButton.selectedColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('md-list-box', 100, theme.tabButton.normalColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('md-list-box', 100, theme.tabButton.selectedColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('md-cube', 100, theme.tabButton.normalColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('md-cube', 100, theme.tabButton.selectedColor).then((source) => this.setState({collectionSelected: source}));
        }
    }
}

const styles = {
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        height: px2dp(45),
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    }
}