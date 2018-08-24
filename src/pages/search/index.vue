<!--组件测试-->
<template>
  <div style="text-align: center;">
    <view class="searchBox">
      <input v-model="inputValue" class="into"/>
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
  .into{
    border: 1px solid #ccc;
    width: 75%;
    display: inline-block;
    // position:absolute;
    // left:6px;
    // top:3px;
    height: 30px;
    vertical-align: baseline;
    border-radius:5px;
  }
  .btn{
    margin-left: 10px;
    // position: absolute;
    // right: 10px;
    // top:0
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
