import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from "../views/User.vue";
import maskMapLink from "../views/maskMapLink.vue";
import webRTC from "../views/webRTC.vue";
import roomManage from "../views/roomManage.vue";
import roomMonitor from "../views/roomMonitor.vue";
import testPage from "../views/testPage.vue";
import ChatRoom from "../views/chatRoom.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/webRTC',
    name: 'webRTC',
    component: webRTC
  },
  {
    path: '/maskMap',
    name: 'maskMapLink',
    component: maskMapLink
  },  
  {
    path: '/users/:userId',
    name: 'user',
    component: User
  },
  {
    path: '/roomManage',
    name: 'roomManage',
    component: roomManage
  },
  {
    path: '/roomMonitor',
    name: 'roomMonitor',
    component: roomMonitor
  },
  {
    path: '/chatRoom/:roomId',
    name: 'chatRoom',
    component: ChatRoom
  },
  {
    path: '/testPage',
    name: 'testPage',
    component: testPage
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router




// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })


