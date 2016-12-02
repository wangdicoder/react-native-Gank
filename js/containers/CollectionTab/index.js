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
import ListViewForCollection from '../../components/ListViewForCollection';
import * as Actions from '../../actions/handleCollectionData';

class CollectionFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="收藏"/>
                <ScrollView>
                    <ListViewForCollection
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