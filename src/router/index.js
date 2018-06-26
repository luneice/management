/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const Table = resolve => require(['@/components/Table.vue' ], resolve);
const News = resolve => require(['@/components/News.vue' ], resolve);
const Score = resolve => require(['@/components/Score.vue' ], resolve);
const CourseTable = resolve => require(['@/components/CourseTable.vue' ], resolve);
export default new Router({
  routes: [
    {
      path: '/course/',
      name: 'CourseTable',
      component: CourseTable
    },
    {
      path: '/score/',
      name: 'Score',
      component: Score
    },
    {
      path: '/news/',
      name: 'News',
      component: News
    },
    {
      path: '/student/',
      name: 'Table',
      component: Table
    },
    {
      path: '/',
      name: 'Table',
      component: Table
    }
  ]
});
