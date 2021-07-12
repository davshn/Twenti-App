// import SignUp from '../components/views/users/SignUp.vue'
import Home from '../components/views/Home.vue'
import Coupon from '../components/views/Coupon.vue'
import Coupons from '../components/views/Coupons.vue'
import ValidateSale from '../components/views/ValidateSale.vue'


export const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/coupons', component: Coupons, name: 'coupons' },
    { path: '/:id/coupon', component: Coupon, name: 'coupon' },
    { path: '/validate_sale', component: ValidateSale, name: 'validate_sale' },
]
