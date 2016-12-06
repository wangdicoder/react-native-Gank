/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Platform, TouchableNativeFeedback, TouchableHighlight, Linking} from 'react-native';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import RowItem from '../../components/SimpleRowItem';
import RowItemWithSwitcher from '../../components/RowItemWithSwitcher';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';
import colors from '../../constants/colors';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/modifySettings';
import ShareUtil from '../../utils/ShareUtil';
import Toast from 'react-native-root-toast';

import ThemeColorPage from './ThemeColorPage';
import OrderContentPage from './OrderContentPage';
import AboutGankPage from './AboutGankPage';
import AboutAuthorPage from './AboutAuthor/index';

class MoreFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            actions,
            isOpenThumbnail,
            isOpenNightMode,
            pageBackgroundColor,
            segmentColor
        } = this.props;

        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar title="更多"/>
                <ScrollView>
                    {Platform.OS === 'android' ?
                        <TouchableNativeFeedback
                            onPress={this._itemClickCallback.bind(this, 0)}>
                            {this._renderTitleContent()}
                        </TouchableNativeFeedback>
                        :
                        <TouchableHighlight
                            onPress={this._itemClickCallback.bind(this, 0)}
                            underlayColor={theme.touchableHighlightUnderlayColor}>
                            {this._renderTitleContent()}
                        </TouchableHighlight>
                    }
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor='lightskyblue' onPress={this._itemClickCallback.bind(this, 2)}/>
                        <RowItem title="主题颜色" icon="ios-color-palette" iconColor={colors.orange} onPress={this._itemClickCallback.bind(this, 3)}/>
                        {/*<RowItem title="选择语言 / Language" icon="md-globe" iconColor={colors.purple}  onPress={this._itemClickCallback.bind(this, 3)}/>*/}
                        <RowItemWithSwitcher title="夜间模式" icon="md-moon" iconColor="#7b68ee" switcherValue={isOpenNightMode} onValueChange={(value) => actions.changeNightMode(value)}/>
                        <RowItemWithSwitcher title="显示列表缩略图" icon="md-browsers" iconColor='plum' switcherValue={isOpenThumbnail} onValueChange={(value) => actions.changeShowThumbnail(value)} />
                        <RowItemWithSwitcher title="自动刷新首页数据" icon="md-refresh" iconColor='#ffd700' switcherValue={isOpenThumbnail} onValueChange={(value) => actions.changeShowThumbnail(value)} renderSegment={false}/>
                    </View>
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <RowItem title="关于作者" icon="md-happy" iconColor="#9acd32" renderSegment={false} onPress={this._itemClickCallback.bind(this, 4)}/>
                    </View>
                    <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                        <RowItem title="反馈" icon="md-text" iconColor={colors.lightGreen} onPress={this._itemClickCallback.bind(this, 5)} isShowRightArrow={false}/>
                        <RowItem title="分享" icon="md-share" iconColor={colors.orangeRed} renderSegment={false} onPress={this._itemClickCallback.bind(this, 6)} isShowRightArrow={false}/>
                    </View>
                    <View style={{height: px2dp(15)}}/>
                </ScrollView>
            </View>
        );
    }

    _renderTitleContent(){
        const {mainThemeColor, segmentColor, titleColor, rowItemBackgroundColor, arrowColor} = this.props;
        return(
            <View style={[styles.block, styles.intro, {backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor, borderTopColor: segmentColor}]}>
                <View style={styles.introLeft}>
                    <Avatar text="Gank" width={px2dp(50)} backgroundColor={mainThemeColor}/>
                </View>
                <View style={styles.introRight}>
                    <Text style={[styles.title, {color: titleColor}]}>Gank.io</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(25)}/>
                </View>
            </View>
        );
    }

    _itemClickCallback(id){
        switch(id){
            case 0:
                this._switchPage(AboutGankPage);
                break;
            case 1:
                this._switchPage(GirlsPage);
                break;
            case 2:
                this._switchPage(OrderContentPage);
                break;
            case 3:
                if(this.props.isOpenNightMode){
                    Toast.show('夜间模式下不可更换主题颜色', {position: px2dp(-80)});
                    return;
                }else
                    this._switchPage(ThemeColorPage);
                break;
            case 4:
                this._switchPage(AboutAuthorPage);
                break;
            case 5:
                Linking.canOpenURL('mailto:wangdicoder@gmail.com').then(supported => {
                    if (supported) Linking.openURL('mailto:wangdicoder@gmail.com');
                });
                break;
            case 6:
                let share = new ShareUtil();
                share.share('一款码农必备获取开源信息的神器，快来试试','https://github.com/wangdicoder/GankIO');
                break;
            case 7:
                break;
        }

    }

    _switchPage(component){
        this.props.navigator.push({
            component: component
        });
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    intro: {
        width: theme.screenWidth,
        height: px2dp(80),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20)
    },
    introLeft: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    introRight:{
        flex: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: px2dp(10)
    },
    title: {
        fontSize: px2dp(23),
    },
    block: {
        marginTop: px2dp(12),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        isOpenThumbnail: state.settingState.isOpenThumbnail,
        isOpenNightMode: state.settingState.isOpenNightMode,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        arrowColor: state.settingState.colorScheme.arrowColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreFragment);