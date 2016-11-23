/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from './HomeFragment';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';

export default class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home'
        };
        this.tabNames = ['首页', '发现', '我'];
    }

    render(){
        return(
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title={this.tabNames[0]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.img} source={this.state.homeNormal} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={this.state.homeSelected} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'discovery'}
                    title={this.tabNames[1]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.img} source={this.state.compassNormal} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={this.state.compassSelected} />}
                    onPress={() => this.setState({ selectedTab: 'discovery' })}>
                    {<HomeFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'me'}
                    title={this.tabNames[2]}
                    selectedTitleStyle={{color: theme.tabButton.selectedColor}}
                    renderIcon={() => <Image style={styles.img} source={this.state.moreNormal} />}
                    renderSelectedIcon={() => <Image style={styles.img} source={this.state.moreSelected} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<HomeFragment />}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount(){
        Icon.getImageSource('md-home', 60, theme.tabButton.normalColor).then((source) => this.setState({ homeNormal: source }));
        Icon.getImageSource('md-home', 60, theme.tabButton.selectedColor).then((source) => this.setState({ homeSelected: source }));
        Icon.getImageSource('md-aperture', 60, theme.tabButton.normalColor).then((source) => this.setState({ compassNormal: source }));
        Icon.getImageSource('md-aperture', 60, theme.tabButton.selectedColor).then((source) => this.setState({ compassSelected: source }));
        Icon.getImageSource('md-person', 60, theme.tabButton.normalColor).then((source) => this.setState({ moreNormal: source }));
        Icon.getImageSource('md-person', 60, theme.tabButton.selectedColor).then((source) => this.setState({ moreSelected: source }));
    }
}

const styles = {
    img: {
        width: 20,
        height: 20
    }
}