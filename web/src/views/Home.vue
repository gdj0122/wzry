<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pt-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap ">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of icons -->
    <m-list-card icon='menu1' title="新闻资讯" :categories="newsCats">
      <template #items="{categories}">
        <router-link tag="div" :to="`/article/${news._id}`"
         class="py-2 fs-lg d-flex" 
         v-for="(news,i) in categories.newsList" :key="i" >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | data}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon='card-hero' title="英雄列表" :categories="heroesCats">
      <template #items="{categories}">
        <div class="d-flex flex-wrap" style="margin:0 0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`"
          class="p-2 text-center" style="width:20%" v-for="(hero,i) in categories.heroList" :key="i">
            <img class="w-100" :src="hero.avatar" alt="">
            <div class="">{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Home',
  data(){
    return {
      swiperOption:{
        pagination:{
          el:".pagination-home"
        }
      },
      newsCats:[],
      heroesCats:[]
    }
  },
  filters:{
    data(val){
      return dayjs(val).format('MM/DD')
    }
  },
  components: {
  },
  methods:{
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      console.log(res.data);
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroesCats = res.data
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.pagination-home {
  .swiper-pagination-bullet {
    border-radius:0.1538rem;
    opacity: 1;
    background: #fff;
    &.swiper-pagination-bullet-active{
      background: map-get($colors,'info');
    }
  }
}
.nav-icons{
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item{
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n){
      border-right: none;
    }
  }
}
</style>