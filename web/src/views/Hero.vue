<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" alt="">
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to='/' tag="div">更多英雄&gt;</router-link>
    </div>
     <div class="top" :style="{'background-image':`url(${model.banner})`}">
       <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
         <div class="fs-sm">{{model.title}}</div>
         <div class="my-2">{{model.name}}</div>
         <div class="fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
         <div class="d-flex jc-between pt-2">
           <div class="scores d-flex ai-center" v-if="model.scors">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scors.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scors.skill}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scors.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scors.surviue}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤2 &gt;</router-link>
         </div>
       </div>
     </div>
     <!-- end of top -->
      <div class="">
        <div class="bg-white px-3">
          <div class="nav d-flex pt-3 jc-around pb-2 border-bottom">
            <div class="nav-item active">
              <div class="nav-link">英雄初识</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">进阶攻略</div>
            </div>
          </div>
        </div>
        <swiper>
          <swiper-slide>
            <div>
              <div class="p-3 bg-white boder-bottom">
                <div class="d-flex">
                  <router-link tag="button" to='/' class="btn flex-1">
                    <i class="iconfont icon-menu1"></i>
                    英雄介绍视频
                  </router-link>
                  <router-link tag="button" to='/' class="btn flex-1 ml-2">
                    <i class="iconfont icon-menu1"></i>
                    一图识英雄
                  </router-link>
                </div>
                <!-- skills -->
                <div class="skills bg-white">
                  <div class="d-flex jc-around">
                    <img class="icon"
                     :class="{active: currentSkillIndex===i}" :src="item.icon" :key="i" width="60" height="60" v-for="(item,i) in model.skills" @click="currentSkillIndex=i" alt="">
                  </div>
                  <div v-if="currentSkills">
                    <div class="d-flex pt-4 pb-3">
                      <h3 class="m-0">{{currentSkills.name}}</h3>
                      <span class="text-grey-1 ml-4">
                        (冷却值: {{currentSkills.delay}}
                         消耗:{{currentSkills.cost}})
                      </span>
                    </div>
                    <p>{{currentSkills.description}}</p>
                    <div class="border-bottom"></div>
                    <p class="text-grey-1">小提示: {{currentSkills.tips}}</p>
                  </div>
                </div>
              </div>
              <m-card plain icon='menu1' class="hero-items" title="出装推荐">
                <div class="fa-xl">顺风出装</div>
                 <div class="d-flex jc-around text-center mt-3">
                   <div v-for="item in model.items1" :key="item.name">
                     <img :src="item.icon" class="icon" alt="">
                     <div class="fs-xs">{{item.name}}</div>
                   </div>
                 </div>
                  <div class="border-bottom my-3"></div>
                 <div class="fa-xl">逆风出装</div>
                 <div class="d-flex jc-around text-center mt-3">
                   <div v-for="item in model.items2" :key="item.name">
                     <img :src="item.icon" class="icon" alt="">
                     <div class="fs-xs">{{item.name}}</div>
                   </div>
                 </div>
              </m-card>
              
              <m-card plain icon='menu1' title="使用技巧">
                <p class="m-0">{{model.usageTips}}</p>                 
              </m-card>
              <m-card plain icon='menu1' title="对抗技巧">
                <p class="m-0">{{model.battleTips}}</p>                 
              </m-card>
              <m-card plain icon='menu1' title="团战思路">
                <p class="m-0">{{model.teamTips}}</p>                 
              </m-card>
              <m-card plain icon='menu1' title="英雄关系">
                <div class="fs-xl">最佳搭档</div>
                <div class="d-flex pt-4" v-for="item in model.partners" :key="item.name">
                  <img width="50" height="50" :src="item.hero.avatar" alt="">
                  <div class="flex ml-3">{{item.description }}</div>
                </div>
                <div class="border-bottom-3 mt-3"></div>
              </m-card>
            </div>
          </swiper-slide>
          <swiper-slide></swiper-slide>
        </swiper>
      </div>
  </div>
</template>

<script>
export default {
  name:"hero",
  props:{
    id:{required:true}
  },
  data(){
    return {
      model:null,
      currentSkillIndex:0
    }
  },
  computed:{
    currentSkills(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
      console.log(res.data);
    }
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
  .page-hero{
    .top{
      height: 50vw;
      background-size: auto 100%;
      background: #fff no-repeat top center;
    }
    .info{
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      .scores{
        .badge{
          margin: 0 0.25rem;
          display: block;
          width: 1rem;
          height: 1rem;
          line-height: .9rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,.2);
        }
      }
    }
    .skills{
      img.icon{
        border:3px solid transparent;
        border-radius: 50%;
      &.active{
        border:3px solid map-get($colors, 'primary');
      }
      }
    }
  .hero-items{
    img.icon{
      width: 3.4615rem;
      height: 3.4615rem;
      border-radius: 50%;
    }
  }
  }
</style>