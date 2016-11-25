/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView} from 'react-native';
import px2dp from '../utils/px2dp';

export default class SimpleListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string,
    };

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    render(){
        return(
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
            />
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
        return(
            <View>
                <Text style={styles.header}>{this.props.headerTitle}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{backgroundColor: '#000', height: 1}}/>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        color: '#000',
        fontSize: px2dp(20),
        padding: px2dp(10)
    },
    rowItem: {
        backgroundColor: '#fff',
        padding: px2dp(10)
    },
    rowContent: {
        fontSize: px2dp(15)
    }
});