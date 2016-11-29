/**
 * Created by wangdi on 23/11/16.
 * 福利数据页面
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../BackPageComponent';
import getCorrectImageUrl from '../../utils/imageFactory';

export default class ImageTabPage extends BackPageComponent{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title={this.props.title}
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}/>
                </View>
                <ScrollView style={{marginTop: theme.toolbar.height}}>
                    <View style={{flex: 1, flexDirection:'row'}}>
                        <ScrollView style={{flex: 1}}>
                            <Image style={styles.img1} source={{uri: 'http://ww2.sinaimg.cn/large/610dc034jw1fa42ktmjh4j20u011hn8g.jpg'}}/>
                            <Image style={styles.img2} source={{uri: 'http://ww3.sinaimg.cn/large/610dc034jw1fa2vh33em9j20u00zmabz.jpg'}}/>
                            <Image style={styles.img1} source={{uri: 'http://ww1.sinaimg.cn/large/610dc034gw1fa1vkn6nerj20u011gdjm.jpg'}}/>
                        </ScrollView>
                        <ScrollView style={{flex: 1}}>
                            <Image style={styles.img2} source={{uri: 'http://ww4.sinaimg.cn/large/610dc034gw1fa0ppsw0a7j20u00u0thp.jpg'}}/>
                            <Image style={styles.img2} source={{uri: 'http://ww2.sinaimg.cn/large/610dc034gw1f9zjk8iaz2j20u011hgsc.jpg'}}/>
                            <Image style={styles.img1} source={{uri: 'http://ww2.sinaimg.cn/large/610dc034jw1f9vyl2fqi0j20u011habc.jpg'}}/>
                            <Image style={styles.img2} source={{uri: 'http://ww2.sinaimg.cn/large/610dc034jw1f9vyl2fqi0j20u011habc.jpg'}}/>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    img1: {
        width: theme.screenWidth/2,
        height: 200
    },
    img2: {
        width: theme.screenWidth/2,
        height: 170
    }
});