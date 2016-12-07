/**
 * Created by wangdi on 27/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, Platform, ActivityIndicator, TouchableNativeFeedback, TouchableHighlight, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import WebViewPage from '../containers/WebViewPage';
import getCorrectImageSizeUrl from '../utils/imageFactory';
import Footer from './ListViewFooter';

class ListViewWithInfo extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    static propTypes = {
        dataSource: PropTypes.array,
        isRenderFooter: PropTypes.bool,
        onEndReached: PropTypes.func,
        isFullData: PropTypes.bool,
        isOpenThumbnail: PropTypes.bool
    };

    render(){
        return(
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
                initialListSize={10}
                pageSize={10}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={5}
            />
        );
    }

    _renderFooter(){
        const {isRenderFooter, tabIconColor, isFullData} = this.props;
        return(
            <Footer indicatorColor={tabIconColor} isFullData={isFullData} isRenderFooter={isRenderFooter}/>
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
        const {titleColor, subTitleColor, rowItemBackgroundColor, thumbnailColor} = this.props;
        return(
            <View style={[styles.itemContainer, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.imgPart}>
                    {(rowData.images && this.props.isOpenThumbnail) ?
                        <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}} />
                        :
                        <Image style={[styles.image, {backgroundColor: thumbnailColor}]} source={require('../assets/user_article_no_data.png')}/>
                    }
                </View>
                <View style={styles.txtPart}>
                    <View style={styles.titlePart}>
                        <Text style={[styles.title, {color: titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
                    </View>
                    <View style={styles.infoPart}>
                        <Icon name="ios-pricetag-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.type}</Text>
                        <Icon name="ios-create-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{rowData.who ? rowData.who : 'null'}</Text>
                        <Icon name="ios-time-outline" color={subTitleColor}/>
                        <Text style={[styles.detailsLabel, {color: subTitleColor}]}>{this._handleCreateTime(rowData.publishedAt)}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: theme.segment.width, backgroundColor: this.props.segmentColor}}/>
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
        resizeMode: 'cover'
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

    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        thumbnailColor: state.settingState.colorScheme.thumbnailColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor
    };
};

export default connect(mapStateToProps)(ListViewWithInfo);