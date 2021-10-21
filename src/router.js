import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Intro.vue';
import Playground from '@/views/Playground.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Home',
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground,
    },
  ],
});
