/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../utils/px2dp';
import theme from '../constants/theme';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import WebViewPage from '../containers/WebViewPage';
import PropTypes from 'prop-types';

class ListViewForHome extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tabIcon = ['logo-android','logo-apple','logo-chrome','ios-film','ios-book','ios-apps','ios-radio'];
        this.tabColor = ['rgb(141,192,89)','#000','rgb(51,154,237)', '#9370db','#00ced1','rgb(249,89,58)','#ffa500'];
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    //renderSeparator={this._renderSeparator.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'android') {
            return(
                <TouchableNativeFeedback
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}>
                    {this._renderRowContent(rowData)}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    overflow="hidden"
                    key={rowID}
                    onPress={this._itemOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderRowContent(rowData)}
                </TouchableHighlight>
            );
        }
    }

    _renderRowContent(rowData){
        const {titleColor, subTitleColor, rowItemBackgroundColor} = this.props;
        return(
            <View style={[styles.rowItem, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="ios-create-outline" color={subTitleColor}/>
                    <Text style={{fontSize: px2dp(10), color: subTitleColor}}> {rowData.who ? rowData.who : 'null'}</Text>
                </View>
                <Text style={[styles.rowContent, {color: titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
            </View>
        );
    }

    _renderHeader(){
        const {headerTitle, rowItemBackgroundColor, segmentColor} = this.props;
        return(
            <View style={[styles.header, {backgroundColor: rowItemBackgroundColor, borderTopColor: segmentColor}]}>
                <Avatar icon={this.tabIcon[this._judgeIconAttribute(headerTitle)]} width={px2dp(20)} backgroundColor={this.tabColor[this._judgeIconAttribute(headerTitle)]}/>
                <Text style={styles.headerLabel}>{this.props.headerTitle}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{backgroundColor: theme.segment.color, height: theme.segment.width}}/>
        );
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            args: {rowData: rowData}
        });
    }

    _judgeIconAttribute(hearderLabel){
        switch(hearderLabel){
            case 'Android':
                return 0;
            case 'iOS':
                return 1;
            case '前端':
                return 2;
            case '休息视频':
                return 3;
            case '拓展资源':
                return 4;
            case 'App':
                return 5;
            case '瞎推荐':
                return 6;
        }
    }
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        paddingTop: px2dp(12),
        paddingBottom: px2dp(6),
        paddingLeft: px2dp(15),
        alignItems: 'center',
        borderTopWidth: theme.segment.width
    },
    headerLabel: {
        color: 'steelblue',
        fontSize: px2dp(17),
        marginLeft: px2dp(7)
    },
    rowItem: {
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        justifyContent: 'center'
    },
    rowContent: {
        fontSize: px2dp(14)
    }
});

const mapStateToProps = (state) => {
    return {
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor
    };
};

export default connect(mapStateToProps)(ListViewForHome);
