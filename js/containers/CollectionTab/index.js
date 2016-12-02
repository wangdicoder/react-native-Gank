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
                {this.props.dataSource.length > 0 ?
                    <ScrollView>
                        <ListViewForCollection
                            dataSource={this.props.dataSource}
                            navigator={this.props.navigator}
                        />
                    </ScrollView>
                    :
                    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                        <Text>还没有任何收藏数据，找篇文章收藏吧～</Text>
                    </View>
                }
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