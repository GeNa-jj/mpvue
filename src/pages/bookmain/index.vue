<!--组件测试-->
<template>
  <div class="bookmain">
    <!-- <h2>{{body}}</h2> -->
    <p v-for="(item, index) in body" :key="index">{{item}}</p>
    <div class="menu" @click="getMenu"></div>
    <div class="bottomBox" :class="{'showBtn': showMenu}">
      <button>上一章</button>
      <button>目录</button>
      <button>下一章</button>
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
        id: '5642be60f1b24c7a7468c5d7',
        showMenu: false
      }
    },
    methods: {
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
      this.$ajax.get(this.apis.privilegeManageApis.bookMark + '/' + this.id)
        .then(res => {
          console.log(res)
          this.chapters = res.mixToc.chapters
        }).catch(err => {
          console.log(err)
        })
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
    .menu{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 400px;
    }
    .bottomBox{
      position: fixed;
      display: flex;
      left: 0;
      bottom: -50px;
      width: 100%;
      height: 50px;
      transition: all .2s ease-in-out;
      button{
        text-align: center;
        flex: 1;
      }
    }
    .showBtn{
      bottom: 0;
    }
  }
</style>
