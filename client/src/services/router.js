import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld';
import Browse from '../components/Browse';
import Login from '../components/Login';
import Registre from '../components/Registre';
import ForgotPassword from '../components/ForgotPassword';
import Settings from '../components/Settings';
import { store } from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        name: 'Landing',
        path: '/',
        component: HelloWorld
      },
      {
        name: 'Browse',
        path: '/browse',
        component: Browse
      },
      {
        name: 'Login',
        path: '/login',
        component: Login
      },
      {
        name: 'Register',
        path: '/register',
        component: Registre
      },
      {
        name: 'ForgotPassword',
        path: '/forgotPassword',
        component: ForgotPassword
      },
      {
        name: 'Settings',
        path: '/settings',
        component: Settings
      },
      {
        name: 'SettingsTab',
        path: '/settings/:tab',
        component: Settings
      },
  ]
})

const   openRoutes = ['Login', 'Register', 'ForgotPassword', 'Browse', 'Landing']

router.beforeEach((to, from, next) => {
    if (openRoutes.includes(to.name))
        next()
    else if (store.state.authentication.loggedIn)
        next()
    else
        next('/login')
  })

export default router;