/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from './HomeTab/index';
import DiscoveryFragment from './DiscoveryTab/index';
import MeFragment from './MoreTab/index';
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
            selectedTab: 'home'
        };
        this.tabNames = ['首页', '发现', '收藏', '更多'];
    }

    render(){
        const {navigator} = this.props;
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabBarStyle}
                sceneStyle={{paddingBottom: styles.tabBarStyle.height}}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title={this.tabNames[0]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'discovery'}
                    title={this.tabNames[1]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.compassNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.compassSelected} />}
                    onPress={() => this.setState({ selectedTab: 'discovery' })}>
                    {<DiscoveryFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'collection'}
                    title={this.tabNames[2]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.collectionNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.collectionSelected} />}
                    onPress={() => this.setState({ selectedTab: 'collection' })}>
                    {<CollectionFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'me'}
                    title={this.tabNames[3]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.moreNormal} />}
                    renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={this.state.moreSelected} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<MeFragment navigator={navigator}/>}
                </TabNavigator.Item>
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