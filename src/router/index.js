import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '@/store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path:"/book/:id",
    name:"Book",
    component: () => import(/* webpackChunkName: "Book" */ '../views/Book.vue')
  },
  {
    path:"/admin",
    name:"Admin",
    component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
    meta: { needAuth: true }
  },
  {
    path:"/login",
    name:"Login",
    component: () => import(/* webpackChunkName: "Book" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	const userInStore = store.state.users.user;
	const isAuthenticated = userInStore !== null ? true : false;
	const isProtected = to.matched.some((route) => route.meta.needAuth);

	if (!isAuthenticated && isProtected) {
		next({ name: 'Login' });
	} else {
		next();
	}
});

export default router
