/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';

export default class HomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: 1,

        };
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <NavigationBar title="今日Gank"/>
                </View>
                <ScrollView
                    onScroll={this._onScroll.bind(this)}>
                    <Image source={require('../../assets/test.jpg')} resizeMode="cover" style={{height: 300, width: theme.screenWidth}}/>
                    <View style={styles.scrollContents}>

                    </View>
                </ScrollView>
            </View>
        );
    }

    _onScroll(){

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        left: 0,
        top: 0,
        elevation: 8
    },
    scrollContents: {
        height: theme.screenHeight,
    }
});