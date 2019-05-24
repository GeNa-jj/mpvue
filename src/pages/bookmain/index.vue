<!--组件测试-->
<template>
  <div style="text-align: center;">
    <h2>{{body}}</h2>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        body: '',
        link: '548e97e29fb698a01dc6ee6f',
        name: ''
      }
    },
    components: {
    },
    methods: {
    },
    created () {
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
          this.body = res.chapter.body
        }).catch(err => {
          console.log(err)
        })
    }
  }
</script>
