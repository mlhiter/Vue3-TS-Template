import { createRouter, createWebHashHistory } from 'vue-router'
import constRoutes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
  if (to.meta.isProtected !== false) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
