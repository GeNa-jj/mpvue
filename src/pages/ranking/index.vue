<!--组件测试-->
<template>
  <div style="text-align: center;">
    <button v-for="(item, index) in ranking" :key="index" @click="bookDetial(item._id)">{{item.title}}</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ranking: ''
      }
    },
    methods: {
      bookDetial (id) {
        wx.navigateTo({
          url: '/pages/booklist/main?id=' + encodeURIComponent(id)
        })
      }
    },
    mounted () {
      if (this.$root.$mp.query.id) {
        this.id = this.$root.$mp.query.id
      }
      console.log('id：', decodeURIComponent(this.id))
      this.$ajax.get(this.apis.privilegeManageApis.ranking)
        .then(res => {
          console.log(res)
          this.ranking = res.male
        }).catch(err => {
          console.log(err)
        })
    }
  }
</script>
