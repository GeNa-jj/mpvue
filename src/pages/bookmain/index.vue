<!--组件测试-->
<template>
  <div class="bookmain">
    <!-- <h2>{{body}}</h2> -->
    <p v-for="(item, index) in body" :key="index">{{item}}</p>
    <div class="menu" @click="getMenu"></div>
    <scroll-view scroll-y style="height: calc(100vh - 42px)" scroll-top="0">
      <button v-for="(item, index) in chapters" :key="index">{{item.title}}</button>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chapters: {},
        body: '',
        link: encodeURIComponent('http://book.my716.com/getBooks.aspx?method=content&bookId=1228859&chapterFile=U_1228859_201803081001399585_4670_1.txt'),
        title: ''
      }
    },
    methods: {
      getMenu () {
      }
    },
    mounted () {
      if (this.$root.$mp.query.link) {
        this.link = this.$root.$mp.query.link
      }
      if (this.$root.$mp.query.title) {
        this.title = decodeURIComponent(this.$root.$mp.query.title)
      }
      console.log(this.title)
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
  }
</style>
