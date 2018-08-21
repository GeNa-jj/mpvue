<!--组件测试-->
<template>
  <div>
    <div v-for="(item, index) in books" :key="index" class="booklist" @click="bookDetial(item._id, item.title)">
      <div class="imgUrl">
        <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="">
      </div>
      <div class="content">
        <h1>{{item.title}}</h1>
        <p>{{item.author}}</p>
        <p class="detail">{{item.shortIntro}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        books: '',
        name: '玄幻',
        gender: 'male',
        limit: 20,
        isNoMore: false
      }
    },
    components: {
    },
    methods: {
      bookDetial (id, name) {
        wx.navigateTo({
          url: '/pages/bookdetail/main?id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name)
        })
      },
      // 请求数据
      getDateSet () {
        this.$ajax.get(this.apis.privilegeManageApis.categories, {
          gender: this.gender,
          type: 'hot', // hot reputation over new
          major: this.name,
          start: 0,
          limit: this.limit
        })
          .then(res => {
            console.log(res)
            if (res.books.length === this.books.length) {
              this.isNoMore = true
              return
            }
            this.books = res.books
          }).catch(err => {
            console.log(err)
          })
      },
      loadMore () {
        if (this.isNoMore) {
          wx.stopPullDownRefresh()
          return
        }
        this.limit += 10
        this.getDateSet()
      }
    },
    // 上拉加载，拉到底部触发
    onReachBottom () {
      // 加载更多
      this.loadMore()
    },
    onLoad () {
      if (this.$root.$mp.query.name) {
        this.name = decodeURIComponent(this.$root.$mp.query.name)
      }
      if (this.$root.$mp.query.gender) {
        this.gender = decodeURIComponent(this.$root.$mp.query.gender)
      }
      wx.setNavigationBarTitle({
        title: this.name
      })
      console.log('name：', this.name)
      console.log('gender：', this.gender)
      this.getDateSet()
    },
    onUnload () {
      this.books = ''
      this.name = '玄幻'
      this.gender = 'male'
      this.limit = 20
      this.isNoMore = false
    }
  }
</script>

<style lang="scss" scoped>
  .booklist{
    display: flex;
    padding: .2rem 0;
    margin: 0 .2rem;
    border-bottom: 1px solid #ccc;
    .imgUrl{
      margin-right: .3rem;
      img{
        width: 1.5rem;
        height: 2rem;
      }
    }
    .content{
      flex: 1;
      height: 2rem;
      h1{
        font-weight: bold;
      }
      p{
        color: #ccc;
        font-size: 16px;
        margin-top: .1rem;
      }
      .detail{
        font-size: 12px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        margin-top: .3rem;
      }
    }
  }
</style>
