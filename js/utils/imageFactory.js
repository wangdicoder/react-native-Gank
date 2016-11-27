/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import {PixelRatio} from 'react-native';

export default function getCorrectImageUrl(url){
    return url + '?imageView2/0/w/' + judgeSuitableSize();
}

function judgeSuitableSize() {
    switch(PixelRatio.get()){
        case 1:
            return 100;
        case 1.5:
            return 200;
        case 2:
            return 300;
        case 3:
            return 500;
        case 4:
            return 600;
        default:
            return 300;
    }
}
