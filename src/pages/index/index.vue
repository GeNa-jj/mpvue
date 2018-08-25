<template>
  <div class="boxShade">
    <div v-for="(item, index) in books" :key="index" class="imgUrl" @click="bookDetial(item.id, item.link)">
      <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt=""  @longpress="deleteBook(index)">
      <p>{{item.title}}</p>
    </div>
    <!-- <p style="color: #ccc">书架没有书~~</p> -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: '',
      books: []
    }
  },
  methods: {
    // getUserInfo () {
    //   // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: (res) => {
    //           console.log(res)
    //           this.userInfo = res.userInfo
    //         }
    //       })
    //     }
    //   })
    // },
    // login () {
    //   const path = this.$root.$mp.appOptions
    //   let query = ''
    //   let redirectUrl = ''
    //   // 解析URL中是否带有参数，若有则拼接成字符串
    //   for (let i in path.query) {
    //     if (i) {
    //       query = query + i + '=' + path.query[i] + '&'
    //     }
    //   }
    //   if (query) {
    //     redirectUrl = path.path + '?' + query
    //   } else {
    //     redirectUrl = path.path
    //   }
    //   // 判断用户登录态， 可有多种判断，此仅为例子
    //   console.log(wx.removeStorageSync('token'))
    //   if (!wx.getStorageSync('token')) {
    //     // 倘若该用户未登陆则跳转至登录页，并且带上登陆成功之后的返回地址
    //     wx.reLaunch({
    //       url: '/pages/test/main?redirectUrl=' + encodeURIComponent(`/${redirectUrl}`)
    //     })
    //     return true
    //   }
    // },
    bookDetial (id, link = 0) {
      wx.navigateTo({
        url: '/pages/bookmain/main?id=' + encodeURIComponent(id) + '&link=' + link
      })
    },
    getBookList () {
      this.books = wx.getStorageSync('id_list')
    },
    deleteBook (index) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '确定要删除此书吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('点击确定了')
            that.books.splice(index, 1)
            wx.setStorageSync('id_list', that.books)
          } else if (res.cancel) {
            console.log('点击取消了')
            return false
          }
        }
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onShow  () {
    // this.getUserInfo()
    // this.login()
    // wx.getSetting({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    this.getBookList()
  }
}
</script>

<style lang="scss" scoped>
.boxShade {
  padding: 0 22px;
  clear: both;
  overflow: hidden;
  .imgUrl{
    width: 90px;
    margin: 10px;
    overflow: hidden;
    float: left;
    img{
      border-radius: 5px;
      width: 90px;
      height: 120px;
    }
    p{
      font-size: 13px;
      line-height: 1.2;
    }
  }
}

/*.imgUrl {*/
  /*display: inline-block;*/
  /*width: 33.3%;*/
  /*height: 33.3%;*/
  /*text-align: center;*/
  /*margin-top: .2rem;*/
  /*margin-bottom: .2rem;*/
  /*img {*/
    /*width: 80%;*/
    /*height: 80%;*/
  /*}*/
/*}*/
</style>
