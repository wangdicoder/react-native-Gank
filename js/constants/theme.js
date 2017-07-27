/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform, Dimensions, PixelRatio, StatusBar} from 'react-native';
import colors from './colors';
import px2dp from '../utils/px2dp';

export default {
    //mainThemeColor: favoriteColor,
    pageBackgroundColor: '#f4f4f4',
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    touchableHighlightUnderlayColor: 'rgba(0,0,0,.4)',
    touchableOpacityActiveOpacity: 0.8,
    segment: {
        color: '#ccc',
        width: 1/PixelRatio.get()
    },
    tabButton: {
        normalColor: '#aaa'
    },
    toolbar: {
        height: Platform.OS === 'android' ? px2dp(40) : px2dp(49),
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        //barColor: favoriteColor,
        titleColor: '#fff',
        titleSize: Platform.OS === 'android' ? px2dp(16) : px2dp(14),
        textBtnSize: Platform.OS === 'android' ? px2dp(12) : px2dp(11)
    }
}