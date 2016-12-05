/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import theme from '../../constants/theme';
import {connect} from 'react-redux';

class AboutGankPage extends BackPageComponent{

    render(){
        const {pageBackgroundColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title="关于Gank.io"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    }
});

const mapStateToProps = (state) => {
    return {
        displayOrder: state.settingState.displayOrder,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor
    }
}

export default connect(mapStateToProps)(AboutGankPage);