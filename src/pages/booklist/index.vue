<!--组件测试-->
<template>
  <div>
    <div class="navbar">
      <div v-for="(item, index) in tabs" :key="index" :id="index" :class="{'active': activeIndex === index}" class="navbar_item" @click="tabClick">
        {{item.name}}
      </div>
    </div>
    <swiper class="swiperPage" :duration="300" @change="swiperChange" :style="'height:' +  windowHeight + 'px'" :current="currentTab" @animationfinish="onAnimationfinish" :skip-hidden-item-layout="true">
      <block v-for="(item, idx) in tabs" :key="idx">
          <swiper-item>
            <div v-for="(item, index) in books" :key="index" class="booklist" @click="bookDetial(item)">
              <div class="imgUrl">
                <img :src="arr[index] ? 'http://statics.zhuishushenqi.com' + item.cover : '../../../static/images/loading.gif'" alt="">
              </div>
              <div class="content">
                <h1>{{item.title}}</h1>
                <p>{{item.author}}</p>
                <p class="detail">{{item.shortIntro}}</p>
              </div>
            </div>
          </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        books: [],
        name: '玄幻',
        gender: 'male',
        limit: [10, 10, 10, 10],
        isNoMore: [false, false, false, false],
        windowHeight: '',
        arr: [],
        type: 'hot',
        tabs: [
          {
            name: '热门',
            type: 'hot'
          },
          {
            name: '新书',
            type: 'new'
          },
          {
            name: '好评',
            type: 'reputation'
          },
          {
            name: '完结',
            type: 'over'
          }
        ],
        activeIndex: 0,
        currentTab: 0
      }
    },
    watch: {
      currentTab (newIdx) {
        this.type = this.tabs[newIdx].type
        this.books = []
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
        this.getDateSet()
      }
    },
    methods: {
      tabClick (e) {
        this.activeIndex = e.currentTarget.id
        this.currentTab = +this.activeIndex
      },
      swiperChange (e) {
        this.currentTab = e.mp.detail.current
        this.activeIndex = this.currentTab
      },
      onAnimationfinish () {
        console.log('滑动完成.....')
      },
      bookDetial (item) {
        wx.setStorageSync('id', item._id)
        wx.setStorageSync('title', item.title)
        wx.setStorageSync('author', item.author)
        wx.setStorageSync('shortIntro', item.shortIntro)
        wx.setStorageSync('cover', item.cover)
        wx.navigateTo({
          url: '/pages/introduce/main'
        })
      },
      // 请求数据
      getDateSet () {
        this.$ajax.get(this.apis.privilegeManageApis.categories, {
          gender: this.gender,
          type: this.type, // hot reputation over new
          major: this.name,
          start: 0,
          limit: this.limit[this.currentTab]
        })
          .then(res => {
            console.log(res)
            if (res.books.length === this.books.length) {
              this.isNoMore[this.currentTab] = true
              return
            }
            this.books = res.books
            this.arr = []
            for (let i = 0; i < this.books.length; i++) {
              this.arr.push(false)
            }
            this.windowHeight = 126 * this.books.length
            this.lazyload()
          }).catch(err => {
            console.log(err)
          })
      },
      loadMore () {
        console.log(this.isNoMore[this.currentTab])
        if (this.isNoMore[this.currentTab]) {
          wx.stopPullDownRefresh()
          return
        }
        this.limit[this.currentTab] += 10
        this.getDateSet()
      },
      lazyload (res) {
        let scrollTop = res ? res.scrollTop : 0
        let len = ((this.windowHeight + scrollTop) / 126) | 0
        for (let i = 0; i < len + 1; i++) {
          this.$set(this.arr, i, true)
        }
      }
    },
    onPageScroll (res) {
      this.lazyload(res)
    },
    // 上拉加载，拉到底部触发
    onReachBottom () {
      // 加载更多
      this.loadMore()
    },
    onLoad () {
      // const that = this
      // wx.getSystemInfo({
      //   success: function (res) {
      //     that.windowHeight = res.windowHeight - 41
      //     that.windowWidth = res.windowWidth
      //   }
      // })
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
      this.books = []
      this.name = '玄幻'
      this.gender = 'male'
      this.limit = [10, 10, 10, 10]
      this.isNoMore = [false, false, false, false]
      this.windowHeight = ''
      this.arr = []
    }
  }
</script>

<style lang="scss" scoped>
  .navbar{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background-color: #fff;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    .navbar_item{
      flex: 1;
      font-size: .26rem;
      text-align: center;
      color: #ccc;
      height: 41px;
      line-height: 41px;
      transition: all .2s ease-in-out;
    }
    .active{
      color: #000;
      font-size: .28rem;
    }
  }
  .swiperPage{
    margin-top: 41px;
    swiper-item{
    }
  }
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
        font-size: .34rem;
      }
      p{
        color: #ccc;
        font-size: .3rem;
        margin-top: .16rem;
      }
      .detail{
        font-size: .24rem;
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
