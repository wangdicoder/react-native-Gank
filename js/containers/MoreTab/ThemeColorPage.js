/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image, Button, ScrollView, TouchableOpacity} from 'react-native';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import colors from '../../constants/colors';
import px2dp from '../../utils/px2dp';
import {changeColor} from '../../actions/modifySettings';
import {store} from '../../store/index';
import {connect} from 'react-redux'

class ThemeColorPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            testColor: this.props.mainThemeColor
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="主题"
                    leftBtnText="取消"
                    leftBtnPress={this._handleBack.bind(this)}
                    rightBtnText="确定"
                    rightBtnPress={this._okBtnPressCallback.bind(this)}
                />
                <View style={styles.colorPickerView}>
                    <ScrollView
                        style={{height: px2dp(80)}}
                        horizontal={true}>
                        {this._renderColorItem(colors.orangeRed)}
                        {this._renderColorItem(colors.orange)}
                        {this._renderColorItem(colors.yellow)}
                        {this._renderColorItem(colors.yellowGreen)}
                        {this._renderColorItem(colors.lightGreen)}
                        {this._renderColorItem(colors.limeGreen)}
                        {this._renderColorItem(colors.seaGreen)}
                        {this._renderColorItem(colors.skyBlue)}
                        {this._renderColorItem(colors.lightBlue)}
                        {this._renderColorItem(colors.dodgerBlue)}
                        {this._renderColorItem(colors.thistle)}
                        {this._renderColorItem(colors.purple)}
                        {this._renderColorItem(colors.slateBlue)}
                        {this._renderColorItem(colors.black)}
                    </ScrollView>
                </View>
                <View style={[styles.colorPanel, {backgroundColor: this.state.testColor}]}/>
                <Image
                    style={styles.img}
                    source={require('../../assets/model.png')}
                    resizeMode='stretch'/>
            </View>
        );
    }

    _renderColorItem(color){
        return(
            <TouchableOpacity
                onPress={this._colorBtnOnPressCallback.bind(this, color)}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <View style={[styles.colorBlock, {backgroundColor: color}]} />
            </TouchableOpacity>
        );
    }

    _colorBtnOnPressCallback(color){
        this.setState({
            testColor: color
        });
    }

    _okBtnPressCallback(){
        store.dispatch(changeColor(this.state.testColor));
        this._handleBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
        paddingTop: theme.toolbar.paddingTop,
        justifyContent: 'space-between'
    },
    colorPickerView: {
        height: px2dp(80),
        backgroundColor: '#fff',
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10)
    },
    img:{
        width: px2dp(250),
        height: px2dp(411),
        position: 'absolute',
        top: (theme.screenHeight-px2dp(420))/2,
        left: (theme.screenWidth-px2dp(250))/2,
        borderWidth: theme.segment.width,
        borderColor: theme.segment.color
    },
    colorPanel: {
        width: px2dp(250),
        height: px2dp(411),
        position: 'absolute',
        top: (theme.screenHeight-px2dp(420))/2,
        left: (theme.screenWidth-px2dp(250))/2
    },
    colorBlock: {
        borderRadius: 5,
        width: px2dp(50),
        height: px2dp(50),
        margin: px2dp(10),
        alignSelf: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        mainThemeColor: state.settingState.colorScheme.mainThemeColor
    };
};

export default connect(mapStateToProps)(ThemeColorPage);