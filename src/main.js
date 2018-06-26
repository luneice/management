// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import { VTable, VPagination } from 'vue-easytable';
import 'vue-easytable/libs/themes-base/index.css';
import Header from '@/components/Header';
import VeRadar from 'v-charts/lib/radar.common';
Vue.config.productionTip = false;
// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Vue.component(VeRadar.name, VeRadar);
Vue.use(Header);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
