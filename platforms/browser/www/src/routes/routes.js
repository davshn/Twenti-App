// import SignUp from '../components/views/users/SignUp.vue'
import Home from '../components/views/Home.vue'
import LogIn from '../components/views/users/LogIn.vue'
import Coupon from '../components/views/Coupon.vue'
import Coupons from '../components/views/Coupons.vue'
import ValidateSale from '../components/views/ValidateSale.vue'


export const routes = [
    { path: '/', component: Home, name: 'offers_index' },
    { path: '/coupons', component: Coupons, name: 'coupons' },
    { path: '/users/log_in', component: Home, name: 'log_in' },
    { path: '/:id/coupon', component: Coupon, name: 'coupon' },
    { path: '/validate_sale', component: ValidateSale, name: 'validate_sale' },
]
