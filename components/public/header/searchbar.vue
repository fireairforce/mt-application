<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="logo" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="focus" @blur="blur" @input="input" placeholder="搜索商家或地点"></el-input>
          <button class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in hotPlace" v-bind:key="idx">{{item}}</dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
          <a href="#">故宫博物馆</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">名宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund">
              <p class="txt">随时退</p>
            </i>
          </li>
          <li>
            <i class="single">
              <p class="txt">不满意免单</p>
            </i>
          </li>
          <li>
            <i class="overdue">
              <p class="txt">过期退</p>
            </i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search:'',
      isFocus: false,
      hotPlace: [
          '火锅',
          '啤酒',
          '海鲜',
          '自助餐'
      ],
      searchList: [
          '奶茶',
          '烤鸭',
          '烤鱼'
      ]
    };
  },
  computed: {
    //   判断是否展示热门搜索框
      isHotPlace() {
          //   聚焦且没有值
          return this.isFocus && !this.search
      } ,
      isSearchList() {
          return this.isFocus && this.search; 
      }
  },
  methods:{
      focus() {
          this.isFocus = true;
      },
      blur() {
          let self = this;
          //   这里添加一个延时的效果避免链接无法跳转
          process.nextTick(()=>{
              self.isFocus = false;
          })
      },
    //   通过element的input组件里面自带的监听功能来监听input的变化
      input() {
          console.log(`hhhh`);
      }
  }
};
</script>

<style>
</style>