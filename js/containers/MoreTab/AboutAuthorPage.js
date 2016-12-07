/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Linking} from 'react-native';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import {connect} from 'react-redux';
import px2dp from '../../utils/px2dp';
import RowItem from '../../components/SimpleRowItem';

const info = {
    csdn: 'http://blog.csdn.net/w337198302',
    github: 'https://github.com/wangdicoder',
    gmail: 'mailto:wangdicoder@gmail.com'
};

class AboutAuthorPage extends BackPageComponent{

    render(){
        const {pageBackgroundColor, titleColor, subTitleColor, segmentColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title="关于作者"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                <View style={styles.logoInfo}>
                    <Image source={require('../../assets/avatar.jpg')} style={styles.logo}/>
                    <Text style={[{color: titleColor}, styles.logoLabel]}>WangDiCoder</Text>
                    <Text style={{color: subTitleColor, marginTop: px2dp(3)}}>a plain coder</Text>
                </View>
                <View style={[styles.block, {borderTopColor: segmentColor, borderBottomColor: segmentColor}]}>
                    <RowItem title="CSDN" icon="md-archive" iconColor="yellowgreen" onPress={this._itemClickCallback.bind(this, 0)} />
                    <RowItem title="GitHub" icon="logo-github" iconColor="#000" onPress={this._itemClickCallback.bind(this, 1)}/>
                    <RowItem title="Gmail" icon="md-mail" iconColor="#ff6347" renderSegment={false} onPress={this._itemClickCallback.bind(this, 2)} />
                </View>
            </View>
        );
    }

    _itemClickCallback(id){
        switch(id){
            case 0:
                this._openUrl(info.csdn);
                break;
            case 1:
                this._openUrl(info.github);
                break;
            case 2:
                this._openUrl(info.gmail);
                break;
        }
    }

    _openUrl(url){
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
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
        width: px2dp(70),
        height: px2dp(70),
    },
    logoLabel: {
        marginTop: px2dp(8),
        fontSize: px2dp(18),
    },
    block: {
        marginTop: px2dp(40),
        borderBottomWidth: theme.segment.width,
        borderTopWidth: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        subTitleColor: state.settingState.colorScheme.subTitleColor
    }
}

export default connect(mapStateToProps)(AboutAuthorPage);