<template>
  <el-row :gutter="12" style="margin: 10px">
    <el-col :span="8">
      <el-card shadow="hover">
        鼠标悬浮时显示
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never">
        从不显示
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable */
export default {
  name: "Anonymous",
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>

<style scoped>

</style>
