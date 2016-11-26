/**
 * Created by wangdi on 23/11/16.
 * Android/iOS/扩展阅读/前端数据页面
 */
'use strict';

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestTargetData';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../BackPageComponent';
import SimpleList from '../../components/SimpleListView';

class TextTabPage extends BackPageComponent{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar
                    title={this.props.title}
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
                {this.props.loading ?
                    <View>
                        <Text>loading,,,,</Text>
                    </View>
                    :
                    <SimpleList
                        dataSource={this.props.dataSource}
                        headerTitle={this.props.title}
                        navigator={this.props.navigator}/>
                }
            </View>
        );
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.actions.fetchData(this.props.title +'/10/1');
        }, 500);
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.targetData.loading,
        dataSource: state.targetData.dataSource.results,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextTabPage);



