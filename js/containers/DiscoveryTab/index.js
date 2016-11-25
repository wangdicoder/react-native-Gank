/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import ImageTabPage from './TabPages/ImageTabPage';
import TextTabPage from './TabPages/TextTabPage';
import VideoTabPage from './TabPages/VideoTabPage';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';

export default class DiscoveryFragment extends Component{
    constructor(props){
        super(props);
        this.tabNames = [['Android','iOS','前端'],['福利','休息视频','扩展阅读']];
        this.tabIcon = [['logo-android','logo-apple','logo-chrome'],['ios-images','ios-film','ios-book']];
        this.tabColor = [['rgb(141,192,89)','#000','rgb(51,154,237)'],['rgb(249,89,58)','rgb(154,53,172)','rgb(65,87,175)']];
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="发现" />
                <ScrollView>
                    <View style={styles.btnPanel}>
                        {this.tabNames.map((item, i)=>{
                            return(
                                <View style={styles.btnRow} key={i}>
                                    {this.tabNames[i].map((subItem, index) => {
                                        return(
                                            <View style={styles.btnCell} key={index}>
                                                <Avatar icon={this.tabIcon[i][index]} width={70} backgroundColor={this.tabColor[i][index]}/>
                                                <Text style={styles.label}>{subItem}</Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    btnPanel: {
        backgroundColor: '#fff',
        height: 270,
        width: theme.screenWidth,
        marginTop: 12,
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        borderTopWidth: theme.segment.width
    },
    btnRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginTop: 8,
        color: "#000"
    }
});