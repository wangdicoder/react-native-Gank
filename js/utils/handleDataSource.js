/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

export function getCategoryList(dataSource) {
    return dataSource.category;
}

export function getAndroidList(dataSource) {
    return dataSource.results.Android;
}

export function getIOSList(dataSource) {
    return dataSource.results.iOS;
}

export function getFrontEndList(dataSource) {
    return dataSource.results.前端;
}

export function getVideoList(dataSource) {
    return dataSource.results.休闲视频;
}

export function getExternalResList(dataSource) {
    return dataSource.results.拓展资源;
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
    }
}

export function getFuLiUrl(dataSource) {
    return dataSource.results.福利[0].url;
}