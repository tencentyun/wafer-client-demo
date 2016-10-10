var qcloud = require('../../node_modules/qcloud-weapp-client-sdk/index.js');

Page({
    doLogin: function () {
        qcloud.login({
            loginUrl: 'https://www.qcloud.la/applet/sdk/login',

            success: function () {
                console.log('success', arguments);
            },

            fail: function () {
                console.log('fail', arguments);
            }
        });
    },

    doRequest: function () {
        qcloud.request({
            url: 'https://www.qcloud.la/applet/sdk/request',

            success: function () {
                console.log('success', arguments);
            },

            fail: function () {
                console.log('fail', arguments);
            },

            complete: function () {
                console.log('complete', arguments);
            }
        });
    },
});
