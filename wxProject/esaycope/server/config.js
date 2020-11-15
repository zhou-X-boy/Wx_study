const CONF = {
    serverHost: 'localhost', 
    tunnelServerUrl: '', 
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89', 
    // 腾讯云相关配置可以查看云 API 秘钥控制台： https://console.cloud.tencent.com/capi 
    qcloudAppId: '1303825454', 
    qcloudSecretId: 'AKIDnanlSs9Y8d6Yonjt8IG70e2D7wZxdC8n', 
    qcloudSecretKey: 'ZJvNcnyvc2OglsiGqBNiJoFSVaP1eU4M', 
    wxMessageToken: 'weixinmsgtoken', 
    
    networkTimeout: 30000,
    

    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx0aadf33af6624984',

    // 微信小程序 App Secret
    appSecret: '256776c8a37577c24efcd0a4e7c385b3',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'zhou0317',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
