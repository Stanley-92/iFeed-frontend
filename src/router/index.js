import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import CreateAccount from '@/components/CreateAccount.vue'
import Verify from '@/components/Verify.vue'
import Mainfeed from '@/components/Mainfeed.vue'
import CommentCard from '@/components/CommentCard.vue'
import ProfileUser from '@/components/ProfileUser.vue'
import ChatPanel from '@/components/ChatPanel.vue'






const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/chat', name: 'Chat', component: ChatPanel},
  { path: '/create', name: 'CreateAccount', component: CreateAccount },
  { path: '/verify', name: 'Verify', component: Verify},
  { path: '/feed', name: 'Mainfeed', component: Mainfeed },
  { path: '/comment', name: 'Comment', component: CommentCard},
  { path: '/profile', name: 'Chat', component: ProfileUser},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
