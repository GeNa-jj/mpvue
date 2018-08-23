<!--组件测试-->
<template>
  <div class="bookmain">
    <!-- <h2>{{body}}</h2> -->
    <p v-for="(item, index) in body" :key="index">{{item}}</p>
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
    p{
      text-indent: 2em;
      line-height: 1.5;
      margin: 20px 0;
    }
  }
</style>
