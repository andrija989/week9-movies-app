import Vue from 'vue'
import Router from 'vue-router'
import AppMovies from '@/views/AppMovies'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'movies',
      component: AppMovies
    },
    {
      path: '/movies',
      name: 'AppMovies',
      component:AppMovies
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
})
