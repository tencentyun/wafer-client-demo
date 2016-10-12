var qcloud = require('../../bower_components/qcloud-weapp-client-sdk/index');
var config = require('../../config');

var githubHead = n => `https://avatars1.githubusercontent.com/u/${n}?v=3&s=160`;

function createSystemMessage(content) {
    return { type: 'system', content };
}

function createUserMessage(content, user, me) {
    return { type: 'speak', content, user, me };
}

Page({
    data: {
        messages: [],
        inputContent: '大家好啊'
    },

    onShow() {
        this.pushMessage(createSystemMessage('正在登陆...'));
        qcloud.setLoginUrl(config.service.loginUrl);
        if (!this.me) {
            qcloud.request({
                url: `https://${config.service.host}/user`,
                login: true,
                success: (response) => {
                    this.me = response.data.data.userInfo;
                    this.connect();
                }
            });
        } else {
            this.connect();
        }
    },

    connect() {
        this.amendMessage(createSystemMessage('正在加入群聊...'));

        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl);
        tunnel.open();

        tunnel.on('connect', () => {
            this.popMessage();
        });

        tunnel.on('people', people => {
            const { total, enter, leave } = people;
            if (enter) {
                this.pushMessage(createSystemMessage(`${enter.nickName}已加入群聊，当前共 ${total} 人`));
            } else {
                this.pushMessage(createSystemMessage(`${leave.nickName}已退出群聊，当前共 ${total} 人`));
            }
        });

        tunnel.on('speak', speak => {
            const { word, who } = speak;
            this.pushMessage(createUserMessage(word, who, who.openId == this.me.openId));
        });

        tunnel.on('close', () => {
            this.pushMessage(createSystemMessage('您已退出群聊'));
        });

        tunnel.on('*', function(type, args) {
            switch(type) {
                case 'connect':
                    console.log('连接已建立');
                    break;
                case 'close':
                    console.log('连接已断开');
                    break;
                case 'reconnecting':
                    console.log('正在重连');
                    break;
                case 'reconnect':
                    console.log('重连成功');
                    break;
                case 'error':
                    console.error(args);
                    break;
                default:
                    //console.log(type, args);
                    break;
            }
        });
    },

    pushMessage(message) {
        this.setData({ messages: this.data.messages.concat(message) });
    },

    amendMessage(message) {
        this.data.messages.splice(-1, 1, message);
        this.setData({ messages: this.data.messages });
    },

    popMessage() {
        this.data.messages.pop();
        this.setData({ messages: this.data.messages });
    },

    changeInputContent(e) {
        this.setData({ inputContent: e.detail.value });
    },

    sendMessage(e) {
        setTimeout(() => {
            this.tunnel.emit('speak', {
                who: this.me,
                word: this.data.inputContent
            });
            this.setData({ inputContent: "" })
        });
    }
});