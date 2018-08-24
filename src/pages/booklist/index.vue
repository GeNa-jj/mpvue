<!--组件测试-->
<template>
  <div>
    <div class="navbar">
      <div v-for="(item, index) in tabs" :key="index" :id="index" :class="{'active': currentTab === index}" class="navbar_item" @click="tabClick">
        {{item.name}}
      </div>
    </div>
    <swiper class="swiperPage" :duration="300" @change="swiperChange" style="height:calc(100vh - 42px)" :current="currentTab" @animationfinish="onAnimationfinish" skip-hidden-item-layout="true">
      <!-- 热门 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in booksHot" :key="index" class="booklist" @click="bookDetial(item)">
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

      <!-- 新书 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in booksNew" :key="index" class="booklist" @click="bookDetial(item)">
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

      <!-- 好评 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in booksReputation" :key="index" class="booklist" @click="bookDetial(item)">
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

      <!-- 完结 -->
      <swiper-item>
        <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0" lower-threshold="150" @scrolltolower="loadMore" enable-back-to-top="true">
          <div v-for="(item, index) in booksOver" :key="index" class="booklist" @click="bookDetial(item)">
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
        booksHot: [],
        booksNew: [],
        booksReputation: [],
        booksOver: [],
        name: '玄幻',
        gender: 'male',
        limit: [10, 10, 10, 10],
        isNoMore: [false, false, false, false],
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
        currentTab: 0
      }
    },
    watch: {
      currentTab (newIdx) {
        this.type = this.tabs[newIdx].type
        if (newIdx === 0) {
          if (this.booksHot.length !== 0) return
        } else if (newIdx === 1) {
          if (this.booksNew.length !== 0) return
        } else if (newIdx === 2) {
          if (this.booksReputation.length !== 0) return
        } else if (newIdx === 3) {
          if (this.booksOver.length !== 0) return
        }
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
        this.$ajax.get(this.apis.privilegeManageApis.categories, {
          gender: this.gender,
          type: this.type, // hot reputation over new
          major: this.name,
          start: 0,
          limit: this.limit[this.currentTab]
        })
          .then(res => {
            console.log(res)
            switch (this.currentTab) {
              case 0:
                if (res.books.length === this.booksHot.length) {
                  this.isNoMore[this.currentTab] = true
                  return
                }
                this.booksHot = res.books
                break
              case 1:
                if (res.books.length === this.booksNew.length) {
                  this.isNoMore[this.currentTab] = true
                  return
                }
                this.booksNew = res.books
                break
              case 2:
                if (res.books.length === this.booksReputation.length) {
                  this.isNoMore[this.currentTab] = true
                  return
                }
                this.booksReputation = res.books
                break
              case 3:
                if (res.books.length === this.booksOver.length) {
                  this.isNoMore[this.currentTab] = true
                  return
                }
                this.booksOver = res.books
                break
            }
            // this.windowHeight = 126 * this.books.length
            // this.lazyload()
          }).catch(err => {
            console.log(err)
          })
      },
      loadMore () {
        if (this.isNoMore[this.currentTab]) {
          wx.stopPullDownRefresh()
          return
        }
        this.limit[this.currentTab] += 10
        this.getDateSet()
      }
      // lazyload (res) {
      //   console.log(res)
      //   let scrollTop = res ? res.target.scrollTop : 0
      //   let len = ((this.windowHeight + scrollTop) / 126) | 0
      //   console.log(len)
      //   for (let i = 0; i < len + 1; i++) {
      //     if (this.currentTab === 0) {
      //       this.$set(this.arrHot, i, true)
      //       return
      //     } else if (this.currentTab === 1) {
      //       this.$set(this.arrNew, i, true)
      //       return
      //     } else if (this.currentTab === 2) {
      //       this.$set(this.arrReputation, i, true)
      //       return
      //     } else if (this.currentTab === 3) {
      //       this.$set(this.arrOver, i, true)
      //       return
      //     }
      //   }
      // }
    },
    // onPageScroll (res) {
    //   this.lazyload(res)
    // },
    // 上拉加载，拉到底部触发
    // onReachBottom () {
    //   // 加载更多
    //   this.loadMore()
    // },
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
      this.getDateSet()
    },
    onUnload () {
      this.booksHot = []
      this.booksNew = []
      this.booksReputation = []
      this.booksOver = []
      this.name = '玄幻'
      this.gender = 'male'
      this.limit = [10, 10, 10, 10]
      this.isNoMore = [false, false, false, false]
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: .3rem;
      }
    }
  }
</style>
