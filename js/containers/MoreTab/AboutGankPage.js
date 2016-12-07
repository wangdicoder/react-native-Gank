/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight, Alert} from 'react-native';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import px2dp from '../../utils/px2dp';
import Toast from 'react-native-root-toast';
import AboutAuthorPage from './AboutAuthorPage';

class AboutGankPage extends BackPageComponent{

    render(){
        const {pageBackgroundColor, titleColor, subTitleColor, segmentColor, rowItemBackgroundColor, arrowColor, tabIconColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title="关于Gank.io"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                <View style={styles.logoInfo}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo}/>
                    <Text style={[{color: titleColor}, styles.logoLabel]}>Gank.io</Text>
                    <Text style={{color: subTitleColor, marginTop: px2dp(3)}}>v1.0.0</Text>
                </View>
                <View style={[styles.block, {borderTopColor: segmentColor, backgroundColor: rowItemBackgroundColor}]}>
                    <Item title="简介" arrowColor={arrowColor} titleColor={titleColor} segmentColor={segmentColor} onPress={this._itemOnPressCallback.bind(this, 0)}/>
                    <Item title="致谢" arrowColor={arrowColor} titleColor={titleColor} segmentColor={segmentColor}  onPress={this._itemOnPressCallback.bind(this, 1)}/>
                    <Item title="关于作者" arrowColor={arrowColor} titleColor={titleColor} segmentColor={segmentColor}  onPress={this._itemOnPressCallback.bind(this, 2)}/>
                </View>
                <View style={{position: 'absolute', bottom: px2dp(15), width:theme.screenWidth, alignItems: 'center'}}>
                    <Text style={{color: tabIconColor, fontSize: px2dp(12)}}>Copyright@2016 wangdicoder</Text>
                </View>
            </View>
        );
    }

    _itemOnPressCallback(id){
        switch(id){
            case 0:
                Alert.alert('简介','每日分享妹子图和技术干货，还有供大家中午休息的休闲视频');
                break;
            case 1:
                Alert.alert('致谢','感谢Gank.io提供API支持');
                break;
            case 2:
                this.props.navigator.push({
                    component: AboutAuthorPage
                });
                break;
        }
    }
}

class Item extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        arrowColor: PropTypes.string,
        segmentColor: PropTypes.string,
        onPress: PropTypes.func
    };

    render(){
        const {title, onPress, titleColor, arrowColor, segmentColor} = this.props;
        return(
            <TouchableHighlight
                onPress={onPress}
                underlayColor={theme.touchableOpacityActiveOpacity}>
                <View style={[styles.cell, {borderBottomColor: segmentColor}]}>
                    <Text style={{color: titleColor}}>{title}</Text>
                    <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(18)}/>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    logoInfo: {
        alignItems: 'center',
        marginTop: px2dp(50)
    },
    logo: {
        width: px2dp(60),
        height: px2dp(60),
        resizeMode: 'contain'
    },
    logoLabel: {
        marginTop: px2dp(8),
        fontSize: px2dp(18),
    },
    cell: {
        width: theme.screenWidth,
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: px2dp(40),
        borderBottomWidth: theme.segment.width,
    },
    block: {
        marginTop: px2dp(18),
        borderTopWidth: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        arrowColor: state.settingState.colorScheme.arrowColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor
    }
}

export default connect(mapStateToProps)(AboutGankPage);