/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, PixelRatio} from 'react-native';
import px2dp from '../utils/px2dp';
import theme from '../constants/theme';
import Avatar from './Avatar';

export default class SimpleListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.tabIcon = ['logo-android','logo-apple','logo-chrome', 'ios-film','ios-book'];
        this.tabColor = ['rgb(141,192,89)','#000','rgb(51,154,237)', 'rgb(154,53,172)','rgb(65,87,175)'];
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        return(
            <View key={rowID} style={styles.rowItem}>
                <Text style={styles.rowContent} numberOfLines={3}>{rowData.desc}</Text>
            </View>
        );
    }

    _renderHeader(){
        const headerTitle = this.props.headerTitle;
        return(
            <View style={styles.header}>
                <Avatar icon={this.tabIcon[this._judgeIconAttribute(headerTitle)]} width={px2dp(22)} backgroundColor={this.tabColor[this._judgeIconAttribute(headerTitle)]}/>
                <Text style={styles.headerLabel}>{this.props.headerTitle}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{backgroundColor: theme.segment.color, height: theme.segment.width}}/>
        );
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
            case '扩展阅读':
                return 4;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        padding: px2dp(12),
        paddingLeft: px2dp(15),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width
    },
    headerLabel: {
        color: '#000',
        fontSize: px2dp(20),
        marginLeft: px2dp(10),
        textShadowColor: 'rgba(0,0,0,.4)',
        textShadowOffset: {height: 6, width: 2},
        textShadowRadius: 17
    },
    rowItem: {
        backgroundColor: '#fff',
        padding: px2dp(10)
    },
    rowContent: {
        fontSize: px2dp(15)
    }
});