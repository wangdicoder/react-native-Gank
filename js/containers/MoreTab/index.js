/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Platform, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/NavigationBar';
import RowItem from '../../components/SimpleRowItem';
import RowItemWithSwitcher from '../../components/RowItemWithSwitcher';
import px2dp from '../../utils/px2dp';
import Avatar from '../../components/Avatar';
import colors from '../../constants/colors';
import {connect} from 'react-redux'

import ThemeColorPage from './ThemeColorPage';
import OrderContentPage from './OrderContentPage';
import AboutGankPage from './AboutGankPage';
import AboutAuthorPage from './AboutAuthor/index';

class MoreFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
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
                    <View style={styles.block}>
                        <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor={colors.dodgerBlue} onPress={this._itemClickCallback.bind(this, 1)}/>
                        <RowItem title="自定义主题" icon="md-brush" iconColor={colors.orange} onPress={this._itemClickCallback.bind(this, 2)}/>
                        <RowItem title="选择语言 / Language" icon="md-globe" iconColor={colors.purple}  onPress={this._itemClickCallback.bind(this, 3)}/>
                        <RowItemWithSwitcher title="夜间模式" icon="md-moon" iconColor={colors.seaGreen} renderSegment={false} onTintColor={this.props.mainThemeColor} />
                    </View>
                    <View style={styles.block}>
                        <RowItem title="关于作者" icon="md-happy" iconColor={this.props.mainThemeColor} renderSegment={false} onPress={this._itemClickCallback.bind(this, 4)}/>
                    </View>
                    <View style={styles.block}>
                        <RowItem title="Gank主页" icon="md-browsers"  iconColor={colors.lightBlue} onPress={this._itemClickCallback.bind(this, 5)}/>
                        <RowItem title="反馈" icon="md-text" iconColor={colors.lightGreen} onPress={this._itemClickCallback.bind(this, 6)}/>
                        <RowItem title="分享" icon="md-share" iconColor={colors.orangeRed} renderSegment={false} onPress={this._itemClickCallback.bind(this, 7)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderTitleContent(){
        return(
            <View style={[styles.block, styles.intro]}>
                <View style={styles.introLeft}>
                    <Avatar text="Gank" width={px2dp(50)} backgroundColor={this.props.mainThemeColor}/>
                </View>
                <View style={styles.introRight}>
                    <Text style={styles.title}>Gank.io</Text>
                    <Icon name="ios-arrow-forward" color={theme.segment.color} size={px2dp(25)}/>
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
                this._switchPage(OrderContentPage);
                break;
            case 2:
                this._switchPage(ThemeColorPage);
                break;
            case 3:

                break;
            case 4:
                this._switchPage(AboutAuthorPage);
                break;
            case 5:

                break;
            case 6:

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
       backgroundColor: theme.pageBackgroundColor
    },
    intro: {
        width: theme.screenWidth,
        height: px2dp(80),
        backgroundColor: '#fff',
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
        color: '#000'
    },
    block: {
        marginTop: px2dp(12),
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        borderTopWidth: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.themeColor.mainThemeColor
    };
};

export default connect(mapStateToProps)(MoreFragment);