<template>
  <div>
    <div v-if="showLogin" >
      <!-- <LoginWindow></LoginWindow> -->
      <div class="modal-mask" ></div>
        <div class="modal-dialog"  @changeShow="getModel(arguments)" >
            <div class="modal-content">
                <img class="img" src="../../../static/images/littleTip-huang.jpg">
                <div class="content-text">
                    <p class="key-bold">a</p>
                    <p class="key-bold">b</p>
                    <p class="little-tip">c</p>
                    <p class="little-content">d</p>
                    <p class="little-content">e</p>
                </div>
            </div>
            <div class="modal-footer">
                <button open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">
                    授权登陆
                </button>
            </div>
       </div>
    </div>
      <div class="show">
          <div class="button">
            <div class="btn1 right" @click="recall()">撤销</div>
            <div class="btn0" @click="reset()">清零</div>
          </div>
          <div class="mark-text">当前结果</div>
          <div class="mark">{{mark}}</div>
      </div>
      <div class="row">
        <div class="button right" @click="addMark(1)">+1</div>
        <div class="button left" @click="addMark(-1)">-1</div>
      </div>
      <div class="row">
        <!-- <div class="button right" @click="addMark(5)">+5</div>
        <div class="button left" @click="addMark(-5)">-5</div> -->
        <div class="button right" @click="addMark(5)">+5</div>
        <div class="button left" @click="addMark(-5)">-5</div>
      </div>
  </div>
</template>

<script>
  import config from '@/config'
  import qcloud from 'wafer2-client-sdk'
  import showSucess, {showModel, post, get} from '@/util'

  // import method from '@/util'
  // import LoginWindow from '@/components/LoginWindow'
export default {
  data () {
      return {
        mark: 0,
        userinfo: {},
        showLogin: false
      }
  },
  methods: {
      async addMark (add) {
        const data = {
          openid: this.userinfo.openId,
          add: add
        }
        try {
          const res = await post('/weapp/createrecord', data) // eslint-disable-line no-unused-vars
          this.mark = this.mark + add
        } catch (e) {
          showModel('请求失败', '请重试')
          console.log('从后端返回的执行错误信息：', e)
        }
      },
      login () {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: userInfo => {
            console.log('登录成功', userInfo)
            this.loginSuccess(userInfo)
            this.getModel('changeShow', false, userInfo)
            wx.showTabBar()
            showSucess('登录成功')
          },
          fail: err => {
            console.log('登录失败', err)
          }
        })
      },
      loginSuccess (userInfo) {
        wx.setStorageSync('userinfo', userInfo)
      },
      getModel (val) {
        this.showLogin = false
        this.userinfo = val[1]
        console.log(this.userInfo)
        this.getCurrentMark()
      },
      async getCurrentMark () {
        try {
          const res = await get('/weapp/getmark', {openid: this.userinfo.openId})
          console.log('从后端传递过来的信息：', res)
          this.mark = res.mark
        } catch (e) {
          showModel('请求失败', '下拉页面重试')
          console.log('从后端返回的执行错误信息：', e)
        }
      },
      async resetMark () {
        try {
          const res = await post('/weapp/resetmark', {openid: this.userinfo.openId})
          console.log('从后端传递过来的信息：', res)
          this.mark = 0
        } catch (e) {
          showModel('请求失败', '重试')
          console.log('从后端返回的执行错误信息：', e)
        }
      },
      reset () {
        var that = this
        if (this.mark !== 0) {
          wx.showModal({
            content: '确定要清零吗？',
            success: function (res) {
              if (res.confirm) {
                that.resetMark()
              }
            }
          })
        }
      },
      async recall () {
        try {
          const res = await post('/weapp/deleterecord', {openid: this.userinfo.openId})
          console.log('从后端返回的执行正确的信息：', res)
          this.mark = res.mark
          showSucess('撤销成功')
        } catch (e) {
          showModel('失败', e.data.msg)
          console.log('从后端返回执行的错误的信息：', e)
        }
      }
  },
  mounted () {
      const userinfo = wx.getStorageSync('userinfo')
      if (userinfo.openId) {
        this.userinfo = userinfo
        console.log('用户信息', this.userinfo)
      } else {
        wx.hideTabBar()
        this.showLogin = true
      }
  },
  onShow () {
      this.getCurrentMark()
  },
  // 下拉刷新
  onPullDownRefresh () {
      console.log('正在下拉刷新')
      this.getCurrentMark()
      wx.stopPullDownRefresh()
  },
  // 转发
  onShareAppMessage () {
      return {
        title: 'z',
        path: '/pages/index/main'
      }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.show{
  text-align: center;
  height: 266px;
  background: #EA5149;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: bold;
  .mark-text{
      font-size: 20px;
      padding: 28px;
  }
  .mark{
    font-size: 88px;
  }
  .button{
    margin:0 10px;
    padding-top: 20px;
    height: 30px;
    line-height:30px;
    text-align:center;
    font-size: 15px;
    font-weight:bold;
    background:#EA5149;
    .btn0{
      width: 60px;
      border-radius: 15px;
      border:1px dashed #feb600;
    }
    .btn1{
      width: 60px;
      border-radius: 15px;
      border:1px dashed #feb600;
    }
  }

}
.row{
  margin: 40px 56px;
  .button{
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 20%;
    border: none;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
    font-weight: bold;
  }
}
.right{
  background: #EA5149;
  float: right;
}
.left{
  background: #feb600;
  margin-right: 80px
}


//添加自定义弹窗
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height:130px;
  padding:10px 0px 50px 0px;
  font-size:14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
}
button {
  width: 100%;
  background:#feb600;
  color:#FFFFFF;
  font-weight:bold;
}
.img {
  width: 280px;
  height:90px;
}
.little-tip {
  padding-top:15px;
  padding-bottom:3px;
  font-size: 14px;
  font-weight:bold;
  color: #feb600;
}
.little-content {
  padding-top:5px;
  font-size: 13px;
  color:#606060;
}
.key-bold {
  padding-top:5px;
  font-size: 14px;
  font-weight:bold;
}
</style>
