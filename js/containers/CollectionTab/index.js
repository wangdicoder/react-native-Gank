/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, ScrollView} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import ListViewForHome from '../../components/ListViewForHome';
import * as Actions from '../../actions/requestCollectionData';

class CollectionFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
                <ScrollView>
                    <ListViewForHome
                        dataSource={this.props.dataSource}
                        navigator={this.props.navigator}
                    />
                </ScrollView>
            </View>
        );
    }

    // componentDidMount(){
    //     this.props.actions.fetchStarList();
    // }
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.favorData.dataSource
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFragment);