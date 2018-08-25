<!--组件测试-->
<template>
  <div class="bookmain">
    <!-- <h2>{{body}}</h2> -->
    <p v-for="(item, index) in body" :key="index">{{item}}</p>
    <div class="next" v-if="body">
      <div @click="backMain">上一章</div>
      <div @click="nextMain">下一章</div>
    </div>
    <div class="menu" @click="getMenu"></div>
    <div class="bottomBox" :class="{'showBtn': showMenu}">
      <div @click="backMain">上一章</div>
      <div @click="goBookList">目录</div>
      <div @click="goBack">书架</div>
      <div @click="nextMain">下一章</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chapters: {},
        body: '',
        link: 0,
        title: '',
        id: '',
        showMenu: false
      }
    },
    watch: {
      link () {
        this.getMain()
        wx.setNavigationBarTitle({
          title: this.chapters[this.link].title
        })
      }
    },
    methods: {
      goBack () {
        wx.switchTab({
          url: '/pages/index/main'
        })
      },
      backMain () {
        if (this.link === 0) {
          wx.showToast({
            title: '没有上一章了',
            icon: 'none',
            duration: 1000
          })
        } else {
          this.link -= 1
        }
      },
      nextMain () {
        if (this.link >= this.chapters.length) {
          wx.showToast({
            title: '施主，这最后一章了~',
            icon: 'none',
            duration: 1000
          })
        } else {
          this.link += 1
        }
      },
      goBookList () {
        wx.navigateTo({
          url: '/pages/section/main?id=' + encodeURIComponent(this.id) + '&title=' + encodeURIComponent(this.title)
        })
      },
      // 弹出下面菜单
      getMenu () {
        this.showMenu = !this.showMenu
      },
      getMain () {
        console.log(this.chapters[this.link])
        this.$ajax.get(this.apis.privilegeManageApis.bookMain + '/' + encodeURIComponent(this.chapters[this.link].link))
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
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 0
            })
            // console.log(JSON.stringify(res.chapter.body).split('n'))
          }).catch(err => {
            console.log(err)
          })
      }
    },
    mounted () {
      this.link = +this.$root.$mp.query.link
      // if (this.$root.$mp.query.title) {
      //   this.title = decodeURIComponent(this.$root.$mp.query.title)
      // }
      this.id = decodeURIComponent(this.$root.$mp.query.id)
      this.$ajax.get(this.apis.privilegeManageApis.bookMark + '/' + this.id)
        .then(res => {
          console.log(res)
          this.chapters = res.mixToc.chapters
          this.getMain()
          wx.setNavigationBarTitle({
            title: this.chapters[this.link].title
          })
        }).catch(err => {
          console.log(err)
        })
    },
    onUnload () {
      this.chapters = {}
      this.body = ''
      this.link = 0
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
