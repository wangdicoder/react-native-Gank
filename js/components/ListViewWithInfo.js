/**
 * Created by wangdi on 27/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import WebViewPage from './WebViewPage';

export default class ListViewWithInfo extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    static propTypes = {
        dataSource: PropTypes.array,
        headerTitle: PropTypes.string,
        renderTag: PropTypes.bool
    };

    render(){
        return(
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
                initialListSize={10}
                pageSize={10}
            />
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
            <View style={styles.itemContainer}>
                <View style={styles.imgPart}>
                    <Image style={styles.image} source={require('../assets/user_article_no_data.png')}/>
                </View>
                <View style={styles.txtPart}>
                    <View style={styles.titlePart}>
                        <Text style={styles.title} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        {this.props.renderTag ?
                            <View>
                                <Icon name="ios-pricetag-outline"/>
                                <Text style={styles.detailsTxt}>{rowData.type}</Text>
                            </View>
                            :
                            null
                        }
                        <Icon name="ios-create-outline"/>
                        <Text style={styles.detailsTxt}>{rowData.who ? rowData.who : 'null'}</Text>
                        <Icon name="ios-time-outline"/>
                        <Text style={styles.detailsTxt}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderHeader(){
        if(this.props.headerTitle)
            return(
                <View>
                    <Text>{this.props.headerTitle}</Text>
                </View>
            );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: theme.segment.width, backgroundColor: theme.segment.color}}/>
        );
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            args: {rowData: rowData}
        });
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(75)
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: px2dp(52),
        height: px2dp(52),
        resizeMode: 'cover',
        backgroundColor: '#f1f1f1',
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingRight: px2dp(10),
        paddingBottom: px2dp(10)
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
        fontSize: px2dp(10)
    }
});