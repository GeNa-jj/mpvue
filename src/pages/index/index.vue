<template>
  <div class="container">
    <p style="color: #ccc">书架没有书~~</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    login () {
      const path = this.$root.$mp.appOptions
      let query = ''
      let redirectUrl = ''
      // 解析URL中是否带有参数，若有则拼接成字符串
      for (let i in path.query) {
        if (i) {
          query = query + i + '=' + path.query[i] + '&'
        }
      }
      if (query) {
        redirectUrl = path.path + '?' + query
      } else {
        redirectUrl = path.path
      }
      // 判断用户登录态， 可有多种判断，此仅为例子
      console.log(wx.removeStorageSync('token'))
      if (!wx.getStorageSync('token')) {
        // 倘若该用户未登陆则跳转至登录页，并且带上登陆成功之后的返回地址
        wx.reLaunch({
          url: '/pages/test/main?redirectUrl=' + encodeURIComponent(`/${redirectUrl}`)
        })
        return true
      }
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  mounted () {
    this.getUserInfo()
    // this.login()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
