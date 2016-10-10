var qcloud = require('../../node_modules/qcloud-weapp-client-sdk/index.js');

Page({
    data: {
        loginUrl: 'https://www.qcloud.la/login',
        requestUrl: 'https://www.qcloud.la/user',
    },

    doLogin: function () {
        qcloud.setLoginUrl(this.data.loginUrl);
        qcloud.login({
            success: function () {
                console.log('login success', arguments);
            },

            fail: function () {
                console.log('login fail', arguments);
            }
        });
    },

    clearSession: function() {
        wx.clearStorageSync();
    },

    doRequest: function () {
        qcloud.setLoginUrl(this.data.loginUrl);
        qcloud.request({
            url: this.data.requestUrl,

            success: function () {
                console.log('request success', arguments);
            },

            fail: function () {
                console.log('request fail', arguments);
            },

            complete: function () {
                console.log('request complete');
            }
        });
    },
});
