var host = '59431301.qcloud.la';

var config = {
    service: {
        host,
        loginUrl: `https://${host}/login`,
        requestUrl: `https://${host}/user`,
        tunnelUrl: `https://${host}/tunnel`,
    }
};

module.exports = config;