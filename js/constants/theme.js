/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {Platform} from 'react-native';
import colors from './colors';
import px2dp from '../utils/px2dp';

const favoriteColor = colors.orange;

export default {
    mainThemeColor: favoriteColor,
    pageBackgroundColor: '#f4f4f4',
    tabButton: {
        selectedColor: favoriteColor,
        normalColor: '#aaa'
    },
    toolbar: {
        height: (Platform.OS === 'android') ? px2dp(45) : px2dp(49),
        barColor: favoriteColor,
        titleColor: '#fff',
        titleSize: px2dp(16)
    }
}