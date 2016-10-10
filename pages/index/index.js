var qcloud = require('../../node_modules/qcloud-weapp-client-sdk/index.js');

Page({
    data: {
        loginUrl: wx.getStorageSync('loginUrl') || 'https://www.qcloud.la/applet/sdk/login',
        requestUrl: wx.getStorageSync('requestUrl') || 'https://www.qcloud.la/applet/sdk/request'
    },

    changeData: function(name, value) {
        this.setData({
            [name]: value
        });
        wx.setStorageSync(name, value);
    },

    changeLoginUrl: function(e) {
        this.changeData('loginUrl', e.detail.value);
    },

    changeRequestUrl: function(e) {
        this.changeData('requestUrl', e.detail.value);
    },

    doLogin: function () {
        setTimeout(() => {
            qcloud.login({
                loginUrl: this.data.loginUrl,

                success: function () {
                    console.log('login success', arguments);
                },

                fail: function () {
                    console.log('login fail', arguments);
                }
            });
        }, 1)
    },

    doRequest: function () {
        setTimeout(() => {
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
        });
    },
});
