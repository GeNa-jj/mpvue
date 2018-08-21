<!--组件测试-->
<template>
  <div style="text-align: center;">
    <button v-for="(item, index) in chapters" :key="index" @click="bookMain(item.link, item.title)">{{item.title}}</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chapters: '',
        id: '5816b415b06d1d32157790b1',
        title: '',
        name: ''
      }
    },
    components: {
    },
    methods: {
      bookMain (link, title) {
        wx.navigateTo({
          url: '/pages/bookmain/main?link=' + encodeURIComponent(link) + '&title=' + encodeURIComponent(title)
        })
      }
    },
    created () {
    },
    onLoad () {
      if (this.$root.$mp.query.id) {
        this.id = this.$root.$mp.query.id
      }
      if (this.$root.$mp.query.name) {
        this.name = decodeURIComponent(this.$root.$mp.query.name)
      }
      wx.setNavigationBarTitle({
        title: this.name
      })
      console.log('id：', decodeURIComponent(this.id))
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
