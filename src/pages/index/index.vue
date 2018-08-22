<template>
  <div class="boxShade">
    <!-- <p style="color: #ccc">书架没有书~~</p> -->
    <!-- <div class="square">
      <ul class="square-inner flex">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
      </ul>
    </div> -->
    <div class="shade">
      <div v-for="(item, index) in books" :key="index" class="imgUrl">
        <img :src="'http://statics.zhuishushenqi.com' + item.cover"  alt="" @click="bookDetial(item._id, item.title)">
        <p>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: '',
      books: [
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        },
        {
          cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_d14f18e849b34420904ead54936e440a.jpg%2F',
          _id: '5816b415b06d1d32157790b1',
          title: '圣墟'
        }
      ]
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
    },
    bookDetial (id, name) {
      wx.navigateTo({
        url: '/pages/bookdetail/main?id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name)
      })
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

<style lang="scss" scoped>
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

/* 书架布局 */
.boxShade {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100%;
}

.shade {
  // display: flex;
  // flex-wrap: wrap;
  height: 100%;
}

.imgUrl {
  display: inline-block;
  width: 33.3%;
  height: 33.3%;
  text-align: center;
  margin-top: .2rem;
  margin-bottom: .2rem;
  img {
    width: 80%;
    height: 80%;
  }
}

/* 九宫格布局 */
.square{
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 100%; /* padding百分比是相对父元素宽度计算的 */
  margin-bottom: .3rem;
}
.square-inner{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 100%; 铺满父元素容器，这时候宽高就始终相等了 */
}
.square-inner>li{
  width: calc(98% / 3);  /* calc里面的运算符两边要空格 */
  height: calc(98% / 3);
  margin-right: 1%;
  margin-bottom: 1%;
  overflow: hidden;
}

.flex{
  display: flex;
  flex-wrap: wrap;
}
.flex>li{
  flex-grow: 1; /* 子元素按1/n的比例进行拉伸 */
  background-color: #4d839c;
  text-align: center;
  color: #fff;
  font-size: 50px;
  line-height: 2;
}
.flex>li:nth-of-type(3n){ /* 选择个数是3的倍数的元素 */
  margin-right: 0;
}
.flex>li:nth-of-type(n+7){  /* 选择倒数的三个元素，n可以取0 */
  margin-bottom: 0;
}
</style>
