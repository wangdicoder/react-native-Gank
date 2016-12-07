/**
 * Created by wangdi on 23/11/16.
 * Android/iOS/扩展阅读/前端数据页面
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, InteractionManager, ActivityIndicator, Button} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestCategoryData';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import ListViewForCategory from '../../components/ListViewForCategory';

class TextListPage extends BackPageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.container, {backgroundColor: this.props.pageBackgroundColor}]}>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title={this.props.title}
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}/>
                </View>
                <View style={styles.contentContainer}>
                    {this.props.error ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, 获取数据失败~ </Text>
                            <Button onPress={this._fethchData.bind(this)} title="重新获取" color={this.props.tabIconColor}/>
                        </View>
                        :
                        (this.props.loading ?
                            <View style={styles.indicator}>
                                <ActivityIndicator
                                    color={this.props.tabIconColor}
                                />
                                <Text style={{marginLeft: 10, color: this.props.tabIconColor}}>获取中...</Text>
                            </View>
                            :
                            <ListViewForCategory
                                dataSource={this.props.dataSource}
                                navigator={this.props.navigator}
                                isRenderFooter={this.props.isRenderFooter}
                                onEndReached={this._listViewOnEndReached.bind(this)}
                                isFullData={this.props.isFullData}
                                isOpenThumbnail={this.props.isOpenThumbnail}
                            />
                        )
                    }
                </View>
            </View>
        );
    }

    componentDidMount(){
        super.componentDidMount();  // must invoke it for the back button event
        this._fethchData();
    }

    _fethchData(){
        this.props.actions.fetchData(this.props.title +'/10/1');
    }

    _listViewOnEndReached(){
        if(!this.props.isRenderFooter) {
            this.props.actions.fetchMoreData(this.props.title + '/10/'+this.props.pageNumber);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
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
        loading: state.categoryDataState.loading,
        dataSource: state.categoryDataState.dataSource,
        isRenderFooter: state.categoryDataState.isRenderFooter,
        pageNumber: state.categoryDataState.pageNumber,
        isFullData: state.categoryDataState.isFullData,
        error: state.categoryDataState.error,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor,
        isOpenThumbnail: state.settingState.isOpenThumbnail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextListPage);

