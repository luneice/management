<template>
  <el-menu
    :default-active="activeIndex"
    style="box-shadow: 0 0 5px 1px rgba(200, 200, 200, .8);"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item index="student">
      <router-link style="display: inline-block; height: 100%; width: 100%; text-decoration: none;" to="/student">学生信息</router-link>
    </el-menu-item>
    <el-menu-item index="score">
      <router-link style="display: inline-block; height: 100%; width: 100%; text-decoration: none;" to="/score">学生成绩</router-link>
    </el-menu-item>
    <el-menu-item index="course">
      <router-link style="display: inline-block; height: 100%; width: 100%; text-decoration: none;" to="/course">课程信息</router-link>
    </el-menu-item>
    <el-submenu index="dashboard">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
  export default {
    name: "Header",
    data() {
      return {
        activeIndex: location.href.split('/').pop() || 'student',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  router-link{
  
  }
</style>
