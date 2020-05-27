<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back">
        <strong class="flex-1 text-blue">
          {{model.title}}
        </strong>
        <div class="text-grey fs-xs">06-01</div>
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-1 fs-lg ">
        <router-link class="py-2" :to="`/article/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id:{require:true,}
  },
  data(){
    return {
      model:null
    }
  },
  watch:{
    id:"fetch",
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`article/${this.id}`)
      this.model = res.data
      console.log(res);
      
    }
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
  .page-article{
    .icon-Back{
      font-size: 1.6923rem;
    }
    .body {
      img {max-width: 100%;height: auto;}
      iframe {
        width: 100%;
        height: auto;
      }
    }
  }
</style>