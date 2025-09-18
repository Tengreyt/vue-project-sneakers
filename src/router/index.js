import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('../pages/Home.vue')
const Favorites = () => import('../pages/Favorites.vue')
const Profile = () => import('../pages/Profile.vue')

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: Home 
    },
    { 
        path: '/favorites', 
        name: 'Favorites', 
        component: Favorites 
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
