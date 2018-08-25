<!--组件测试-->
<template>
  <div class="bookmain">
    <scroll-view :scroll-y="!showSection" style="height: 100vh" scroll-top="0" enable-back-to-top="true">
      <p v-for="(item, index) in body" :key="index">{{item}}</p>
      <div class="next" v-if="body">
        <div @click="backMain">上一章</div>
        <div @click="nextMain">下一章</div>
      </div>
      <div class="section" :class="{'showSectionAni': showSection}">
        <scroll-view scroll-y scroll-top="0" style="height: calc(100vh - 65px)" enable-back-to-top="true" :scroll-into-view="sectionLocation">
          <div v-for="(item, index) in chapters" :key="index" @click="bookMain(index)" class="sectionBtn" :class="{'active': (index === link)}" :id="'a' + index">{{item.title}}</div>
        </scroll-view>
        <div class="sectionBtm">
          <div @click="keepOnRead">继续阅读</div>
        </div>
      </div>
      <div class="menu" @click="getMenu"></div>
      <div class="bottomBox" :class="{'showBtn': showMenu}">
        <div @click="backMain">上一章</div>
        <div @click="goBookList">目录</div>
        <div @click="goBack">书架</div>
        <div @click="nextMain">下一章</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chapters: [],
        body: '',
        link: 0,
        title: '',
        id: '',
        showMenu: false,
        showSection: false,
        bookTitle: '',
        sectionLocation: 'a0'
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
          this.getMain()
          wx.setNavigationBarTitle({
            title: this.chapters[this.link].title
          })
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
          this.getMain()
          wx.setNavigationBarTitle({
            title: this.chapters[this.link].title
          })
        }
      },
      goBookList () {
        this.showSection = true
        this.showMenu = false
        this.getsCurrentSectionLocation()
      },
      bookMain (index) {
        this.showSection = false
        this.link = index
        this.getMain()
        wx.setNavigationBarTitle({
          title: this.chapters[this.link].title
        })
        const section = wx.getStorageSync('id_list')
        for (let i = 0; i < section.length; i++) {
          if (section[i].id === this.id) {
            section[i].link = this.link
            wx.setStorageSync('id_list', section)
            return
          }
        }
      },
      keepOnRead () {
        this.showSection = false
      },
      // 计时当前章节的位置
      getsCurrentSectionLocation () {
        this.sectionLocation = 'a' + this.link
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
            this.body = ''
            setTimeout(() => {
              this.$set(this, 'body', newBody)
            }, 0)
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
      this.bookTitle = +this.$root.$mp.query.bookTitle
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
      this.chapters = []
      this.body = ''
      this.link = 0
      this.title = ''
      this.id = ''
      this.showMenu = false
      this.bookTitle = ''
      this.showSection = false
      this.sectionLocation = 'a0'
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
        border: 1px solid #f00;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        width: 80px;
        text-align: center;
        /*flex: 1;*/
        margin: 0 40px 30px;
        color: #f00;
      }
    }
    .section{
      position: fixed;
      left: 0;
      top: 100%;
      background-color: #fff;
      text-align: center;
      height: 100vh;
      width: 100%;
      z-index: 99999;
      transition: all .2s ease-in-out;
      .sectionBtn{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px #ccc solid;
      }
      .active{
        color: #f00;
      }
      .sectionBtm{
        height: 65px;
        background-color: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
          background-color: #f00;
          width: 300px;
          color: #fff;
          height: 35px;
          line-height: 35px;
          border-radius: 5px;
        }
      }
    }
    .showSectionAni{
      top: 0;
    }
    .menu{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 180px;
      height: 400px;
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
      }
    }
    .showBtn{
      bottom: 0;
    }
  }
  /*.stopScroll{*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*position: fixed;*/
    /*z-index: 0;*/
  /*}*/
</style>
