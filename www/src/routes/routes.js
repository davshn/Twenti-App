import Home from '../components/views/Home.vue'
import SignUp from '../components/views/users/SignUp.vue'
import LogIn from '../components/views/users/LogIn.vue'
import Categories from '../components/views/Categories.vue'
import Commerce from '../components/views/Commerce.vue'
import Coupon from '../components/views/Coupon.vue'
import InstanceCategory from '../components/views/InstanceCategory.vue'

export const routes = [
    // { path: '/', component: Home, name: 'home' },
    { path: '/', component: Home, name: 'offers_index' },
    { path: '/users/sign_up', component: SignUp, name: "sign_up" },
    { path: '/users/log_in', component: Home, name: 'log_in' },
    { path: '/categories', component: Categories, name: 'categories' },
    { path: '/commerce', component: Commerce, name: 'commerce' },
    { path: '/coupon', component: Coupon, name: 'coupon' },
    { path: '/category', component: InstanceCategory, name: 'instance_category' },
]
