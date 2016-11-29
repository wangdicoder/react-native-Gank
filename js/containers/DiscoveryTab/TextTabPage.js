/**
 * Created by wangdi on 23/11/16.
 * Android/iOS/扩展阅读/前端数据页面
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, InteractionManager, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestTargetData';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../BackPageComponent';
import ListViewWithInfo from '../../components/ListViewWithInfo';

class TextTabPage extends BackPageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title={this.props.title}
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}/>
                </View>
                <View style={styles.contentContainer}>
                    {this.props.loading ?
                        <View style={styles.indicator}>
                            <ActivityIndicator
                                color={theme.mainThemeColor}
                            />
                            <Text style={{marginLeft: 10}}>Fetching...</Text>
                        </View>
                        :
                        <ListViewWithInfo
                            dataSource={this.props.dataSource}
                            navigator={this.props.navigator}
                            isRenderFooter={this.props.isRenderFooter}
                            onEndReached={this._listViewOnEndReached.bind(this)}
                            isFullData={this.props.isFullData}
                        />
                    }
                </View>
            </View>
        );
    }

    componentDidMount(){
        //InteractionManager.runAfterInteractions(()=>{
            this.props.actions.fetchData(this.props.title +'/10/1');
        //});
    }

    _listViewOnEndReached(){
        if(!this.props.isRenderFooter) {
            this.props.actions.fetchMoreData(this.props.title + '/10/'+this.props.pageNumber);
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        zIndex: 0
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.targetData.loading,
        dataSource: state.targetData.dataSource,
        isRenderFooter: state.targetData.isRenderFooter,
        pageNumber: state.targetData.pageNumber,
        isFullData: state.targetData.isFullData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextTabPage);

