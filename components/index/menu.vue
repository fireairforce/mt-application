<template>
  <div class="m-menu">
      <dl class="nav">
          <dt>全部分类</dt>
          <dd v-for="(item,idx) in menu" :key="idx">
              <i :class="item.type" />{{item.title}}<span class="arrow" />
          </dd>
      </dl>
  </div>
</template>

<script>
export default {
   data() {
       return{
           menu: [{
               type:'food',
               title:'美食'
           },{
               type: 'takeout',
               title:'外卖'
           }]
       }
   }
}
</script>

<style>

</style>