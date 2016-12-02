/**
 * Created by wangdi on 1/12/16.
 */
'use strict';

import {Share} from 'react-native';
import Toast from 'react-native-root-toast';
import px2dp from './px2dp';

export default class ShareUtil{

    share(content, url){
        Share.share({
            message: url,
            url: url,
            title: content
        }).then(this._showResult).catch((error)=>{Toast.show('分享失败', {position: px2dp(-80)})});
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            //Toast.show('分享成功',{position: px2dp(-80)});
        }
    }
}