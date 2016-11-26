/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

export default function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject);
    })
}