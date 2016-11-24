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
            opacity: 0,
        };
        this.imageHeight = 300;
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <NavigationBar title="今日Gank"/>
                </View>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll.bind(this)}>
                    <Image source={require('../../assets/test.jpg')} resizeMode="cover" style={{height: this.imageHeight, width: theme.screenWidth}}/>
                    <View style={styles.scrollContents}>
                        <Text>dsds</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= this.imageHeight - theme.toolbar.height){
            var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
            this.setState({opacity: opacity});
        }


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
        zIndex: 1
    },
    scrollContents: {
        height: theme.screenHeight,
    }
});