<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <elife />
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic />
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu';
import Elife from '@/components/index/life';
import Artistic from '@/components/index/artist';
export default {
  components: {
     Emenu,
     Elife,
     Artistic
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>

