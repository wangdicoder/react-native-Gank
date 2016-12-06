/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

export function getCategoryList(dataSource) {
    return dataSource.category;
}

export function getTargetList(dataSource, target) {
    switch(target){
        case 'Android':
            return dataSource.results.Android;
        case 'iOS':
            return dataSource.results.iOS;
        case '前端':
            return dataSource.results.前端;
        case '休息视频':
            return dataSource.results.休息视频;
        case '拓展资源':
            return dataSource.results.拓展资源;
        case 'App':
            return dataSource.results.App;
        case '瞎推荐':
            return dataSource.results.瞎推荐;
        default:
            return null;
    }
}

export function getFuLiUrl(dataSource) {
    return dataSource.results.福利[0].url;
}