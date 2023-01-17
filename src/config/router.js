import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/components/LandingPage.vue'
import UserProfile from '@/components/UserProfile.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: LandingPage, name: 'home' },
  { path: '/user', component: UserProfile, name: 'user' },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
