<!--组件测试-->
<template>
  <div>
    <div class="shortIntro">
      <div class="imgUrl">
        <img :src="cover ? ('http://statics.zhuishushenqi.com' + cover) : '../../../static/images/loading.gif'" alt="">
      </div>
      <div class="content">
        <h1>{{title}}</h1>
        <p>{{author}}</p>
      </div>
    </div>
    <div class="btn">
      <button @click="toread()">开始阅读</button>
      <button>加入书架</button>
    </div>
    <p class="detail">{{shortIntro}}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        title: '',
        author: '',
        shortIntro: '',
        cover: ''
      }
    },
    components: {
    },
    methods: {
      toread () {
        const that = this
        wx.navigateTo({
          url: '/pages/section/main?id=' + encodeURIComponent(that.id) + '&name=' + encodeURIComponent(that.title)
        })
      }
    },
    created () {
    },
    onLoad () {
      this.id = wx.getStorageSync('id')
      this.title = wx.getStorageSync('title')
      this.author = wx.getStorageSync('author')
      this.shortIntro = wx.getStorageSync('shortIntro')
      this.cover = wx.getStorageSync('cover')
      wx.removeStorageSync('id')
      wx.removeStorageSync('title')
      wx.removeStorageSync('author')
      wx.removeStorageSync('shortIntro')
      wx.removeStorageSync('cover')
      console.log(this.id, this.title, this.author, this.shortIntro, this.cover)
    },
    onUnload () {
      this.id = ''
      this.title = ''
      this.author = ''
      this.shortIntro = ''
      this.cover = ''
    }
  }
</script>

<style lang="scss" scoped>
  .shortIntro{
    padding: .3rem;
    display: flex;
    .imgUrl{
      margin-right: .3rem;
      img{
        width: 1.8rem;
        height: 2.5rem;
      }
    }
    .content {
      flex: 1;
      h1 {
        font-weight: bold;
        font-size: .38rem;
      }
      p {
        color: #ccc;
        font-size: .3rem;
        margin-top: .25rem;
      }
    }
  }
  .btn{
    display: flex;
    button{
      flex: 1;
      height: .8rem;
      line-height: .8rem;
      border-radius: .1rem;
      font-size: .26rem;
      border: 1px solid #ccc;
      margin: .3rem;
    }
  }
  .detail{
    text-indent: 2em;
    font-size: .3rem;
    padding: 0 .3rem;
    line-height: 1.5;
    margin-top: .2rem;
  }
</style>
