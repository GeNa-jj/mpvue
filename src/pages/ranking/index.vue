<!--组件测试-->
<template>
  <div class="ranking">
    <button v-for="(item, index) in ranking" :key="index" @click="bookDetial(item)" v-if="item.monthRank" class="item">{{item.title}}</button>
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
      bookDetial (item) {
        wx.navigateTo({
          url: '/pages/ranklist/main?id=' + encodeURIComponent(item._id) + '&monthRank=' + encodeURIComponent(item.monthRank) + '&totalRank=' + encodeURIComponent(item.totalRank) + '&title=' + encodeURIComponent(item.title)
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

<style lang="scss" scoped>
  .ranking{
    padding: 10px;
    .item{
      height: 50px;
      line-height: 50px;
      font-size: 13px;
      border: 1px solid #f00;
      color: #f00;
      margin-bottom: 15px;
      text-align: center;
      border-radius: 5px;
    }
  }
</style>
