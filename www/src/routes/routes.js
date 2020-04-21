import Home from '../components/views/Home.vue'
import SignUp from '../components/views/users/SignUp.vue'
import LogIn from '../components/views/users/LogIn.vue'


export const routes = [
    // { path: '/', component: Home, name: 'home' },
    { path: '/', component: Home, name: 'offers_index' },
    { path: '/users/sign_up', component: SignUp, name: "sign_up" },
    { path: '/users/log_in', component: Home, name: 'log_in' }
]
