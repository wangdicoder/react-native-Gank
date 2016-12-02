/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import {PixelRatio} from 'react-native';

export default function getCorrectImageSizeUrl(url){
    return url + '?imageMogr2/format/png/thumbnail/x'+judgeSuitableSize();
}

function judgeSuitableSize() {
    switch(PixelRatio.get()){
        case 1:
            return 50;
        case 1.5:
            return 100;
        case 2:
            return 200;
        case 3:
            return 250;
        case 4:
            return 300;
        default:
            return 300;
    }
}
