<template>
  <section class="m-style">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <!-- v-bind用于绑定动态的属性值 -->
      <dd :class="{active:kind === 'all'}" kind="all" keyword="景点">全部</dd>
      <dd :class="{active:kind === 'part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd :class="{active:kind === 'spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd :class="{active:kind === 'movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd :class="{active:kind === 'travel'}" kind="travel" keyword="旅游"></dd>
    </dl>
    <ul class="ibody">
        <li 
          v-for="item in cur"
          :key="item.title"
        >
           <el-card
             :body-style="{ padding: '0px' }"
             shadow="never"
           >
              <img :src="item.img" class="change">
              <ul class="cbody">
                  <li class="title">{{ item.title }}</li>
                  <li class="pos"><span>{{ item.pos }}</span></li>
                  <li class="price">￥<em>{{ item.price }}</em></li>              
              </ul>
           </el-card>
        </li>
    </ul>
  </section>
</template>

<script>
export default {
    data:() => {
        return {
            kind: 'all',
            list: {
                all: [],
                part: [],
                spa: [],
                movie: [],
                travel: []
            }
        }
    },
    computed: {
        cur() {
            return this.list[this.kind];
        }
    },
    methods: {
      over(){}
    },
    async mounted() {

    },
};
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>