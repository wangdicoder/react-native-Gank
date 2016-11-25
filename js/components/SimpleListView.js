/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView} from 'react-native';

export default class SimpleListView extends Component{
    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string,
    };

    render(){
        return(
            <ListView
                dataSource={this.props.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
            />
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        return(
            <View>

            </View>
        );
    }

    _renderHeader(){
        return(
            <View>
                <Text>{this.props.headerTitle}</Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View>

            </View>
        );
    }
}