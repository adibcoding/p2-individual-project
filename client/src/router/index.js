import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import MassageView from '../views/MassageView.vue'
import MassageReview from '../views/MassageReview.vue'
import OrderList from '../views/OrderList.vue'
import AddOrder from '../views/AddOrder.vue'
import { useMainStore } from '../stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',

      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/massages',
      name: 'massages',
      component: MassageView
    },
    {
      path: '/massages/:id',
      name: 'massagesreview',
      component: MassageReview
    },
    {
      path: '/orders',
      name: 'orderlist',
      component: OrderList
    },
    {
      path: '/addorder/:massageId',
      name: 'addorder',
      component: AddOrder
    }
  ]
})


router.beforeEach((to, from) => {
  const store = useMainStore()
  if(store.isLogged && to.name == 'login') {
    console.log(from)
    return `${from.fullPath}`
  }

  if(!store.isLogged && to.name == 'addorder') {
    console.log(from)
    return `${from.fullPath}`
  }

  if(!store.isLogged && to.name == 'orderlist') {
    console.log(from)
    return `${from.fullPath}`
  }
  
})


export default router

