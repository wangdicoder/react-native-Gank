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

export function getFuLiUrl(dataSource) {
    return dataSource.results.福利[0].url
}