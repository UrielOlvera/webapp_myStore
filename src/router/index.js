import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    children: [
      // {
      //   path: '',
      //   component: () => import('../views/Estadisticas.vue')
      // },
      {
        path: '/productos',
        children: [
          {
            path: '',
            component: () => import( '../views/Productos/Inventario.vue')
          },
          {
            path: '/productos/update-stock',
            component: () => import( '../views/Productos/UpdateStock.vue')
          }
        ],
        component: () => import( '../views/Productos/Productos.vue')
      },
      {
        path: '/proveedores',
        component: () => import( '../views/Proveedores.vue')
      },
      {
        path: '/wallets',
        component: () => import( '../views/Wallets.vue')
      },
      {
        path: '',
        component: () => import( '../views/Caja.vue')
      }
    ],
    component: () => import( '../views/Dashboard.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
