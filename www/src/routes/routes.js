import Home from '../components/views/Home.vue'
import SignUp from '../components/views/users/SignUp.vue'
import LogIn from '../components/views/users/LogIn.vue'
import Categories from '../components/views/Categories.vue'
import InstanceCategory from '../components/views/InstanceCategory.vue'
import Commerce from '../components/views/Commerce.vue'
import Coupon from '../components/views/Coupon.vue'
import Profile from '../components/views/Profile.vue'
import UserHistory from '../components/views/History.vue'
import Favorites from '../components/views/Favorites.vue'
import Points from '../components/views/Points.vue'
import Notifications from '../components/views/Notifications.vue'
import Support from '../components/views/Support.vue'

export const routes = [
    // { path: '/', component: Home, name: 'home' },
    { path: '/', component: Home, name: 'offers_index' },
    { path: '/users/sign_up', component: SignUp, name: "sign_up" },
    { path: '/users/log_in', component: Home, name: 'log_in' },
    { path: '/categories', component: Categories, name: 'categories' },
    { path: '/instance_category', component: InstanceCategory, name: 'instance_category' },
    { path: '/commerce', component: Commerce, name: 'commerce' },
    { path: '/coupon', component: Coupon, name: 'coupon' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/history', component: UserHistory, name: 'user_history' },
    { path: '/favorites', component: Favorites, name: 'favorites' },
    { path: '/points', component: Points, name: 'points' },
    { path: '/notifications', component: Notifications, name: 'notifications' },
    { path: '/support', component: Support, name: 'support' },
]
