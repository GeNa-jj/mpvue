<!--组件测试-->
<template>
  <div class="bookmain">
    <!-- <h2>{{body}}</h2> -->
    <p v-for="(item, index) in body" :key="index">{{item}}</p>
    <div class="next">
      <div>上一章</div>
      <div>下一章</div>
    </div>
    <div class="menu" @click="getMenu"></div>
    <div class="bottomBox" :class="{'showBtn': showMenu}">
      <div>上一章</div>
      <div @click="goBookList">目录</div>
      <div>书架</div>
      <div>下一章</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chapters: {},
        body: '',
        link: encodeURIComponent('http://book.my716.com/getBooks.aspx?method=content&bookId=1228859&chapterFile=U_1228859_201803081001399585_4670_1.txt'),
        title: '',
        id: '',
        showMenu: false
      }
    },
    methods: {
      goBookList () {
        wx.navigateTo({
          url: '/pages/section/main?id=' + encodeURIComponent(this.id) + '&title=' + encodeURIComponent(this.title)
        })
      },
      // 弹出下面菜单
      getMenu () {
        this.showMenu = !this.showMenu
      }
    },
    mounted () {
      if (this.$root.$mp.query.link) {
        this.link = this.$root.$mp.query.link
      }
      if (this.$root.$mp.query.title) {
        this.title = decodeURIComponent(this.$root.$mp.query.title)
      }
      if (this.$root.$mp.query.id) {
        this.id = decodeURIComponent(this.$root.$mp.query.id)
      }
      wx.setNavigationBarTitle({
        title: this.title
      })
      console.log('link：', decodeURIComponent(this.link))
      this.$ajax.get(this.apis.privilegeManageApis.bookMain + '/' + this.link)
        .then(res => {
          console.log(res)
          this.body = JSON.stringify(res.chapter.body).split('n')
          let newBody = []
          this.body.forEach(item => {
            // 使用正则去掉多余的符号
            newBody.push(item.replace(/"/g, '').replace(/\\/g, ''))
            // console.log(item.replace(/"/g, '').replace(/\\/g, ''))
          })
          this.$set(this, 'body', newBody)
          // console.log(JSON.stringify(res.chapter.body).split('n'))
        }).catch(err => {
          console.log(err)
        })
    },
    onUnload () {
      this.chapters = {}
      this.body = ''
      this.link = ''
      this.title = ''
      this.id = ''
      this.showMenu = false
    }
  }
</script>

<style lang="scss" scoped>
  .bookmain{
    text-align: left;
    padding: 0 9px;
    position: relative;
    p{
      text-indent: 2em;
      line-height: 1.5;
      margin: 20px 0;
    }
    .next{
      display: flex;
      justify-content: space-between;
      div{
        text-align: center;
        /*flex: 1;*/
        padding: 20px;
        color: #f00;
      }
    }
    .menu{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 180px;
      height: 400px;
      transition: all .2s ease-in-out;
    }
    .bottomBox{
      position: fixed;
      display: flex;
      left: 0;
      background-color: #fff;
      color: #f00;
      bottom: -50px;
      width: 100%;
      transition: all .2s ease-in-out;
      z-index: 999;
      border-top: 1px solid #ccc;
      div{
        height: 50px;
        line-height: 50px;
        text-align: center;
        flex: 1;
        font-size: 13px;
      }
    }
    .showBtn{
      bottom: 0;
    }
  }
</style>
