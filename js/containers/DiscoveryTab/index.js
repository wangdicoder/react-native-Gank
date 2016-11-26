/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import ImageTabPage from './ImageTabPage';
import TextTabPage from './TextTabPage';
import VideoTabPage from './VideoTabPage';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';

export default class DiscoveryFragment extends Component{
    constructor(props){
        super(props);
        this.tabNames = [['Android','iOS','前端'],['妹子','休息视频','扩展阅读']];
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
                                            <View style={styles.btnCell} key={i+index}>
                                                {Platform.OS === 'android' ?
                                                    <TouchableNativeFeedback
                                                        onPress={this._itemPressCallback.bind(this, i+index, subItem)}
                                                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', true)}>
                                                        {this._renderBtnContent(i,index)}
                                                    </TouchableNativeFeedback>
                                                    :
                                                    <TouchableHighlight
                                                        onPress={this._itemPressCallback.bind(this, i+index, subItem)}
                                                        underlayColor={theme.touchableHighlightUnderlayColor}>
                                                        {this._renderBtnContent(i,index)}
                                                    </TouchableHighlight>
                                                }
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

    _renderBtnContent(i, index){
        return(
            <View style={{width:px2dp(80), height:px2dp(80), alignItems:'center', justifyContent:'center'}}>
                <Avatar icon={this.tabIcon[i][index]} width={px2dp(60)} backgroundColor={this.tabColor[i][index]}/>
            </View>
        );
    }

    _itemPressCallback(id, title){
        switch(id){
            case 3:  //福利Page
                this._pushScene(ImageTabPage, title);
                break;
            case 4: //视频Page
                this._pushScene(VideoTabPage, title);
                break;
            default:
                this._pushScene(TextTabPage, title);
                break;
        }
    }

    _pushScene(component, title){
        this.props.navigator.push({
            component: component,
            args: {title: title}
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    btnPanel: {
        backgroundColor: '#fff',
        height: px2dp(260),
        width: theme.screenWidth,
        marginTop: px2dp(12),
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        borderTopWidth: theme.segment.width,
        padding: px2dp(15),
        paddingBottom: px2dp(15)
    },
    btnRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginTop: px2dp(-5),
        color: "#000"
    }
});