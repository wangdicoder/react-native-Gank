/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, ListView, Image, Platform, TouchableNativeFeedback, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestRandomData';
import Icon from 'react-native-vector-icons/Ionicons';
import TextTabPage from './TextTabPage';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';
import getCorrectImageSizeUrl from '../../utils/imageFactory';
import WebViewPage from '../../containers/WebViewPage';

class DiscoveryFragment extends Component{
    constructor(props){
        super(props);
        this.tabNames = [['Android','iOS','前端'],['App','休息视频','拓展资源']];
        this.tabIcon = [['logo-android','logo-apple','logo-chrome'],['ios-apps','ios-film','ios-book']];
        this.tabColor = [['rgb(141,192,89)','#000','rgb(51,154,237)'],['rgb(249,89,58)','rgb(154,53,172)','rgb(65,87,175)']];
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _fetchData(){
        this.props.actions.fetchRandomData();
    }

    componentDidMount(){
        this._fetchData();
    }

    _onRefresh(){
        this._fetchData();
    }

    _onEndReached(){
        if(!this.props.isRenderFooter)
            this.props.actions.fetchMoreRandomData();
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="发现" />
                <ListView
                    enableEmptySections={true}
                    dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    initialListSize={10}
                    pageSize={10}
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={5}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onRefresh.bind(this)}
                            title="玩命加载中..."
                        />}
                />
            </View>
        );
    }

    _renderHeader(){
        return(
            <View style={styles.btnPanel}>
                {this.tabNames.map((item, i)=>{
                    return(
                        <View style={styles.btnRow} key={i}>
                            {this.tabNames[i].map((subItem, index) => {
                                return(
                                    <View style={styles.btnCell} key={subItem}>
                                        <TouchableOpacity
                                            onPress={this._itemPressCallback.bind(this, subItem)}
                                            activeOpacity={theme.touchableOpacityActiveOpacity}>
                                            {this._renderBtnContent(i,index)}
                                        </TouchableOpacity>
                                        <Text style={styles.btnCellLabel}>{subItem}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        )
    }

    _renderFooter(){
        if(this.props.isRenderFooter) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator
                        color={this.props.mainThemeColor}
                    />
                    <Text style={{marginLeft: 10, color: this.props.mainThemeColor}}>拼命获取中...</Text>
                </View>
            );
        }
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
                <View style={styles.txtPart}>
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
                <View style={styles.imgPart}>
                    {rowData.images ?
                        <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}} />
                        :
                        <Image style={styles.image} source={require('../../assets/user_article_no_data.png')}/>
                    }
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: theme.segment.width, width: theme.screenWidth, flexDirection: 'row'}}>
                <View style={{flex: 77, backgroundColor: theme.segment.color}}/>
                <View style={{flex: 23, backgroundColor: '#fff'}}/>
            </View>
        );
    }

    _handleCreateTime(time){
        return time.substring(0, 10);
    }

    _renderBtnContent(i, index){
        return(
            <View style={{width:px2dp(60), height:px2dp(60), alignItems:'center', justifyContent:'center'}}>
                <Avatar icon={this.tabIcon[i][index]} width={px2dp(60)} backgroundColor={this.tabColor[i][index]}/>
            </View>
        );
    }

    _itemPressCallback(title){
       this._pushScene(TextTabPage, title);
    }

    _pushScene(component, title){
        this.props.navigator.push({
            component: component,
            args: {title: title, navigator: this.props.navigator}
        });
    }

    _itemOnPress(rowData){
        this.props.navigator.push({
            component: WebViewPage,
            args: {rowData: rowData}
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
        height: px2dp(215),
        width: theme.screenWidth,
        marginTop: px2dp(12),
        marginBottom: px2dp(15),
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        borderTopWidth: theme.segment.width,
        padding: px2dp(17),
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
    btnCellLabel: {
        marginTop: px2dp(4),
        color: "#000"
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(73)
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: px2dp(5)
    },
    image: {
        width: px2dp(60),
        height: px2dp(60),
        resizeMode: 'cover',
        backgroundColor: '#f1f1f1',
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingLeft: px2dp(12),
        paddingRight: px2dp(5),
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
        fontSize: px2dp(10),
        color: '#aaa'
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
        dataSource: state.randomData.dataSource,
        loading: state.randomData.loading,
        error: state.randomData.error,
        isRenderFooter: state.randomData.isRenderFooter,
        mainThemeColor: state.themeColor.mainThemeColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryFragment);