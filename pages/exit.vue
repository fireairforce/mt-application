<template>
  <div class=""></div>
</template>

<script>
export default {
  layout: "blank",
  // 这里使用一个nuxt的中间件来完成,因为退出这里是没有交互来完成的
  // 必须要到了界面里面来才执行
  middleware: async (ctx) => {
    let { status, data } = await ctx.$axios.get(`/users/exit`);
    if (status === 200 && data && data.code === 0) {
      window.location.href = "/";
    }
  },
};
</script>
