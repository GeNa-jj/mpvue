<!--组件测试-->
<template>
  <div>
    <view class="searchBox">
      <input confirm-type="search" v-model="inputValue" class="into" placeholder="请输入书名或作者" placeholder-style="color: #ccc;"/>
      <button @click="search" size="mini" class="btn">搜索</button>
    </view>
    <div v-for="(item, index) in booksList" :key="index" class="booklist" @click="bookDetial(item)">
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
        inputValue: '',
        booksList: []
      }
    },
    methods: {
      search () {
        this.$ajax.get(this.apis.privilegeManageApis.search + '?query=' + this.inputValue).then((data) => {
          console.log(data)
          this.$set(this, 'booksList', data.books)
        })
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
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
.searchBox{
  padding: 0 10px;
  .into{
    box-sizing: border-box;
    border: 1px solid #ccc;
    width: 280px;
    display: inline-block;
    height: 30px;
    vertical-align: middle;
    border-radius:5px;
    padding-left: 20px;
    font-size: 13px;
  }
  .btn{
    vertical-align: middle;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
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
      -webkit-line-clamp: 2;
      margin-top: .3rem;
    }
  }
}
</style>
