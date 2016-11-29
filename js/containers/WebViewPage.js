/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, WebView, InteractionManager, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from '../components/NavigationBar';
import BackPageComponent from './BackPageComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux'

class WebViewPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            didMount: false
        }
    }

    render(){
        const rowData = this.props.rowData;
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <View style={styles.contentContainer}>
                    {this.state.didMount ?
                        <WebView
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
                        rightBtnIcon={"refresh"}
                        rightBtnPress={this._btnOnPressCallback.bind(this, 0)}
                    />
                </View>
                <View style={styles.bottomInfoBar}>
                    <View style={{flex: 85, marginRight: 10}}>
                        <Text style={styles.contentTitle} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={{flex: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            onPress={this._btnOnPressCallback.bind(this, 1)}
                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                            <Icon name="md-share" color="#ccc" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._btnOnPressCallback.bind(this, 1)}
                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                            <Icon name="md-heart" color="#32cd32" size={20} />
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
                <Text style={{marginTop: 10, color: this.props.mainThemeColor}}>玩命加载中...</Text>
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

    }

}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
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
        height: 45,
        width: theme.screenWidth,
        borderTopWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 1
    },
    contentTitle: {
        color: '#000',
        fontSize: 12
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.themeColor.mainThemeColor
    };
};

export default connect(mapStateToProps)(WebViewPage);