import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Preview from './views/Preview.vue'
import HomePage from './views/HomePage.vue'
import Page from './views/Page.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/page/:uid',
      name: 'page',
      component: Page
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '*',
      redirect: { name: 'not-found' }
    }
  ]
})
