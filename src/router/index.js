import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: "*",
  component: () => import(/* webpackChunkName: "about" */ '../views/Error404.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Ble',
    name: 'Ble',
    component: () => import(/* webpackChunkName: "about" */ '../views/BleConnection.vue')

  },
  {
    path: '/about',
    name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/core/CoreComponentIndex.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
      },
      {
        path: '/customizeReceipt',
        name: 'Customize Receipt',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/CustomizeReceipt.vue')
      },
      {
        path: '/GenerateTicket',
        name: 'Generate Ticket',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/GenerateTicket.vue')
      },
      {
        path: '/RegisterProduct',
        name: 'RegisterProduct',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterProduct.vue')
      },
      {
        path: '/ReceiptList',
        name: 'ReceiptList',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ReceiptList.vue')
      },
      {
        path: '/ProductReturn',
        name: 'ProductReturn',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductReturn.vue')
      },
      // {
      //   path: '/settings',
      //   name: 'Settings',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
      // },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next)=>{
  if (to.path !== '/signup' && to.path !== '/login' && router.app.$store.state.defaultStore.userLoggedIn !== 1){
    next({
      path: '/login',
      replace: true
    })
  } else {
    next();
  }
  if (to.path == '/' && router.app.$store.state.defaultStore.userLoggedIn == 1) {
    next({
      path: '/dashboard',
      replace: true
    })
  }
})

export default router
