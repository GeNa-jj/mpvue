<!--组件测试-->
<template>
  <div>
    <!--<card :text="goBack"></card>-->
    <!--<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>-->
    <div class="sort">
      <button v-for="(item, index) in male" :key="index" @click="bookMark(item.name, 'male')">{{item.name}}</button>
      <button v-for="(item, index) in female" :key="index" @click="bookMark(item.name, 'female')">{{item.name}}</button>
    </div>
    <!--<div>-->
      <!--<span v-for="(item, index) in picture" :key="index" @click="bookMark(item.name)">{{item.name}}</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<span v-for="(item, index) in press" :key="index" @click="bookMark(item.name)">{{item.name}}</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import card from '@/components/card'

  export default {
    data () {
      return {
        female: '',
        male: ''
      }
    },
    components: {
      card
    },
    methods: {
      bookMark (name, gender) {
        wx.navigateTo({
          url: '/pages/booklist/main?name=' + encodeURIComponent(name) + '&gender=' + encodeURIComponent(gender)
        })
      },
      bindGetUserInfo (e) {
        if (e.target.userInfo) {
          wx.showToast({
            title: '登陆成功'
          })
          wx.setStorageSync('token', '123')
          if (this.redirectUrl) {
            // 根据来源做出不同的路由操作
            wx.reLaunch({
              url: decodeURIComponent(this.redirectUrl)
            })
          } else {
            wx.switchTab({
              url: '/pages/index/main'
            })
          }
        } else {
          wx.showToast({
            title: '取消授权'
          })
        }
      }
    },
    mounted () {
      this.$ajax.get(this.apis.privilegeManageApis.sort).then(res => {
        console.log(res)
        this.female = res.female
        this.male = res.male.slice(0, 12)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style lang="scss" scoped>
  .sort{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 .2rem;
    button{
      text-align: center;
      line-height: .7rem;
      width: 2rem;
      height: .7rem;
      border: 1px solid #f00;
      color: #f00;
      margin: .1rem;
      border-radius: .1rem;
      font-size: .26rem;
    }
  }
</style>
