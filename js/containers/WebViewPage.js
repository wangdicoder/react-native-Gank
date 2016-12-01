/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, WebView, InteractionManager, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, Clipboard} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from '../components/NavigationBar';
import BackPageComponent from './BackPageComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';
import ShareUtil from '../utils/ShareUtil';

class WebViewPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            didMount: false
        };
        this.bottomIconNames = ['ios-arrow-back-outline',
                                'ios-arrow-forward-outline',
                                'ios-refresh-outline',
                                'ios-copy-outline',
                                'ios-browsers-outline',
                                'ios-share-outline'
                                ];
        this.bottomIconSize = [px2dp(25),px2dp(25),px2dp(32),px2dp(25), px2dp(25),px2dp(25)];
    }

    render(){
        const rowData = this.props.rowData;
        return(
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    {this.state.didMount ?
                        <WebView
                            ref={(ref)=>{this.webView = ref}}
                            style={styles.webView}
                            source={{uri: rowData.url}}
                            renderLoading={this._renderLoading.bind(this)}
                            renderError={this._renderError.bind(this)}
                            startInLoadingState={true}
                        />
                        :
                        null
                    }
                </View>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title="详细内容"
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}
                        rightBtnText="标题"
                        rightBtnPress={this._btnOnPressCallback.bind(this, 0)}
                    />
                </View>
                <View style={styles.bottomInfoBar}>
                    {this.bottomIconNames.map((item, i)=>{
                        return(
                            <View key={i} style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity
                                    onPress={this._btnOnPressCallback.bind(this, i+1)}
                                    activeOpacity={theme.touchableOpacityActiveOpacity}>
                                    <Icon name={item} color="#1e90ff" size={this.bottomIconSize[i]} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={this._btnOnPressCallback.bind(this, 6)}
                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                            <Icon name='ios-heart-outline' color="#32cd32" size={px2dp(25)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _renderLoading(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator color={this.props.mainThemeColor} size="large"/>
                <Text style={{marginTop: px2dp(10), color: this.props.mainThemeColor}}>玩命加载中...</Text>
            </View>
        );
    }

    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>Ooooops~, try again please</Text>
            </View>
        );
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                didMount: true
            });
        });
    }

    _btnOnPressCallback(id){
        if(id === 0){
            Alert.alert('', this.props.rowData.desc, [{text: '好的', onPress: ()=>{}}]);
        }else if(id === 1){
            this.webView.goBack();
        }else if(id === 2){
            this.webView.goForward();
        }else if(id === 3){
            this.webView.reload();
        }else if(id === 4){
            Clipboard.setString(this.props.rowData.url);
            Toast.show('已复制到剪贴板!', {position: px2dp(-80)});
        }else if(id === 5){
            Linking.canOpenURL(this.props.rowData.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.rowData.url);
                } else {
                    Toast.show('Cannot open it', {position: px2dp(-80)});
                }
            });
        }else if(id === 6){
            var share = new ShareUtil();
            share.share(this.props.rowData.desc, this.props.rowData.url);
        }else if(id === 7){
            Toast.show('收藏成功!', {position: px2dp(-80)});
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
    },
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        marginTop: theme.toolbar.paddingTop,
        top: 0,
        zIndex: 1
    },
    webView: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    bottomInfoBar: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.9)',
        bottom: 0,
        height: px2dp(45),
        width: theme.screenWidth,
        borderTopWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    },
    contentTitle: {
        color: '#000',
        fontSize: px2dp(12)
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.themeColor.mainThemeColor
    };
};

export default connect(mapStateToProps)(WebViewPage);