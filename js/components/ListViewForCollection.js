/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import px2dp from '../utils/px2dp';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import WebViewPage from '../containers/WebViewPage';
import { SwipeListView } from 'react-native-swipe-list-view';
import {store} from '../store/index';
import {unStarData} from '../actions/handleCollectionData';

export default class ListViewForCollection extends Component{
    static propTypes = {
        dataSource: PropTypes.array
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        return(
            <View style={styles.container}>
                <SwipeListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderHiddenRow={this._renderHiddenRow.bind(this)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    rightOpenValue={-75}
                    friction={10}
                    tension={100}
                />
            </View>
        );
    }

    _renderHiddenRow(rowData, sectionID, rowID, rowMap){
        return(
            <View style={styles.rowBack}>
                <TouchableHighlight
                    onPress={this._itemRemoveOnPress.bind(this, rowData)}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={styles.removeBtn}>
                        <Text style={styles.removeBtnLabel}>删除</Text>
                    </View>
                </TouchableHighlight>
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
        return(
            <View style={styles.rowItem}>
                <View style={styles.titlePart}>
                    <Text style={styles.title} numberOfLines={2}>{rowData.desc}</Text>
                </View>
                <View style={styles.infoPart}>
                    <Icon name="ios-pricetag-outline" color="#aaa"/>
                    <Text style={styles.detailsTxt}>{rowData.type}</Text>
                    <Icon name="ios-create-outline" color="#aaa"/>
                    <Text style={styles.detailsTxt}>{rowData.who ? rowData.who : 'null'}</Text>
                    <Icon name="ios-time-outline" color="#aaa"/>
                    <Text style={styles.detailsTxt}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                </View>
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

    _itemRemoveOnPress(rowData){
        store.dispatch(unStarData(rowData));
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }
}

const styles = StyleSheet.create({
    container: {

    },
    rowItem: {
        backgroundColor: '#fff',
        height: px2dp(75),
        padding: px2dp(10),
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: '#000'
    },
    detailsTxt: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10),
        color: '#aaa'
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: theme.pageBackgroundColor,
    },
    removeBtn: {
        height: px2dp(75),
        width: px2dp(75),
        backgroundColor: 'orangered',
        alignItems: 'center',
        justifyContent: 'center'
    },
    removeBtnLabel:{
        color: '#fff'
    }
});