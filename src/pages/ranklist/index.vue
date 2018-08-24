<!--组件测试-->
<template>
  <div>
    <div class="navbar">
      <div v-for="(item, index) in tabs" :key="index" :id="index" :class="{'active': currentTab === index}" class="navbar_item" @click="tabClick">
        {{item.name}}
      </div>
    </div>
    <swiper class="swiperPage" :duration="300" @change="swiperChange" style="height:calc(100vh - 42px)" :current="currentTab" @animationfinish="onAnimationfinish" skip-hidden-item-layout="true">
      <!-- 周榜 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in books[0]" :key="index" class="booklist" @click="bookDetial(item)">
            <div class="imgUrl">
              <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="">
            </div>
            <div class="content">
              <h1>{{item.title}}</h1>
              <p>{{item.author}}</p>
              <p class="detail">{{item.shortIntro}}</p>
            </div>
          </div>
        </scroll-view>
      </swiper-item>

      <!-- 月榜 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in books[1]" :key="index" class="booklist" @click="bookDetial(item)">
            <div class="imgUrl">
              <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="">
            </div>
            <div class="content">
              <h1>{{item.title}}</h1>
              <p>{{item.author}}</p>
              <p class="detail">{{item.shortIntro}}</p>
            </div>
          </div>
        </scroll-view>
      </swiper-item>

      <!-- 总榜 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in books[2]" :key="index" class="booklist" @click="bookDetial(item)">
            <div class="imgUrl">
              <img :src="'http://statics.zhuishushenqi.com' + item.cover" alt="">
            </div>
            <div class="content">
              <h1>{{item.title}}</h1>
              <p>{{item.author}}</p>
              <p class="detail">{{item.shortIntro}}</p>
            </div>
          </div>
        </scroll-view>
      </swiper-item>

    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        books: [],
        id: [],
        title: '',
        limit: [10, 10, 10],
        isNoMore: [false, false, false],
        tabs: [
          {
            name: '周榜',
            type: 0
          },
          {
            name: '月榜',
            type: 1
          },
          {
            name: '总榜',
            type: 2
          }
        ],
        currentTab: 0
      }
    },
    watch: {
      currentTab (newIdx) {
        if (this.books[newIdx]) return
        this.getDateSet()
      }
    },
    methods: {
      tabClick (e) {
        if (this.currentTab === +e.currentTarget.id) return
        this.currentTab = +e.currentTarget.id
      },
      swiperChange (e) {
        this.currentTab = +e.mp.detail.current
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
        this.$ajax.get(this.apis.privilegeManageApis.bookList + '/' + this.id[this.currentTab])
          .then(res => {
            console.log(res)
            // this.books[this.currentTab] = res.ranking.books
            this.$set(this.books, this.currentTab, res.ranking.books)
          }).catch(err => {
            console.log(err)
          })
      },
      loadMore () {
        // if (this.isNoMore[this.currentTab]) {
        //   wx.stopPullDownRefresh()
        //   return
        // }
        // this.limit[this.currentTab] += 10
        // this.getDateSet()
      }
    },
    onLoad () {
      if (this.$root.$mp.query.title) {
        this.title = decodeURIComponent(this.$root.$mp.query.title)
      }
      if (this.$root.$mp.query.id) {
        this.id[0] = decodeURIComponent(this.$root.$mp.query.id)
        this.id[1] = decodeURIComponent(this.$root.$mp.query.monthRank)
        this.id[2] = decodeURIComponent(this.$root.$mp.query.totalRank)
      }
      wx.setNavigationBarTitle({
        title: this.title
      })
      console.log('title：', this.title)
      this.getDateSet()
    },
    onUnload () {
      this.books = []
      this.id = []
      this.title = ''
      this.limit = [10, 10, 10]
      this.isNoMore = [false, false, false]
      this.currentTab = 0
    }
  }
</script>

<style lang="scss" scoped>
  .navbar{
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
      transition: 0.2s all linear;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 98%;
        border-bottom: 2px solid #f00;
        transition: 0.2s all linear;
      }
    }
    .active{
      color: #000;
      font-weight: 700;
      /*border-bottom: 3px solid #000;*/
    }
    .active ~ .navbar_item::before {
      left: 0;
    }
    .active::before {
      width: 100%;
      left: 0;
      top: 0;
    }
    .hover::before{
      width: 200%;
    }
  }
  .booklist{
    display: flex;
    padding: .2rem 0;
    margin: 0 .2rem;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
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
