import Home from '../components/views/Home.vue'
import SignUp from '../components/views/users/SignUp.vue'
import LogIn from '../components/views/users/LogIn.vue'
import OffersIndex from '../components/views/offers/Index.vue'
// Scan by User
import OfferShow from '../components/views/offers/scan_user/Show.vue'
import ClassShow from '../components/views/offers/scan_user/ShowClass.vue'
// Generate QR for scar by agent
// import OfferShow from '../components/views/offers/Show.vue'
import OfferRedeem from '../components/views/offers/Redeem.vue'
import OfferSubcategory from '../components/views/offers/Subcategory.vue'
import Tutorial from '../components/views/Tutorial.vue'
import VenueShow from '../components/views/venues/Show.vue'
import WaiterIndex from '../components/views/waiters/Index.vue'
import MyFavorites from '../components/views/users/MyFavorites.vue'
import MyRewards from '../components/views/users/MyRewards.vue'
import MyVouchersSub from '../components/views/users/MyVouchersSub.vue'
import TC from '../components/shared/TC.vue'
import ProgrammeRules from '../components/shared/ProgrammeRules.vue'
import Favourites from '../components/views/users/Favourites.vue'
import Discount from '../components/views/users/Discount.vue'
import Notifications from '../components/views/users/Notifications.vue'
import Search from '../components/shared/Search.vue'
import Landing from '../components/views/users/Landing.vue'
import PersonalizeIndex from '../components/views/offers/PersonalizeIndex.vue'
import PersonalizeIndex2 from '../components/views/offers/PersonalizeIndex2.vue'
import PersonalizeIndex3 from '../components/views/offers/PersonalizeIndex3.vue'
import Profile from '../components/views/users/Profile.vue'
import Venues from '../components/views/venues/Index.vue'
import NewProfile from '../components/views/users/NewProfile.vue'
import EditProfile from '../components/views/users/EditProfile.vue'
import EditPassword from '../components/views/users/EditPassword.vue'
// import TermsAndConditions from '../components/shared/TermsAndConditions.vue'
import RecoverPassword from '../components/views/users/RecoverPassword.vue'
import InputRut from '../components/shared/InputRut.vue'
import MyClasses from '../components/views/users/MyClasses.vue'
import UserKeys from '../components/views/users/UserKeys.vue'
import Referrals from '../components/views/users/Referrals.vue'

export const routes = [
    // { path: '/', component: Home, name: 'home' },
    { path: '/', component: OffersIndex, name: 'offers_index' },
    { path: '/users/sign_up', component: SignUp, name: "sign_up" },
    { path: '/users/log_in', component: Home, name: 'log_in' },
    // { path: '/offers', component: OffersIndex, name: 'offers_index' },
    { path: '/offers/categories/:id', component: OfferSubcategory, name: 'offer_subcategory' },
    { path: '/offers/:id', component: OfferShow, name: 'offer_show' },
    { path: '/classes/:id', component: ClassShow, name: 'class_show'},
    { path: '/offers/:id/redeem', component: OfferRedeem, name: 'offer_redeem', meta: { auth: true } },
    { path: '/tutorial', component: Tutorial, name: 'tutorial' },
    { path: '/venues/:id', component: VenueShow, name: 'venue_show' },
    { path: '/waiter/', component: WaiterIndex, name: 'waiter_index', meta: { auth: true } },
    { path: '/users/my_favorites', component: MyFavorites, name: 'my_favorites', meta: { auth: true } },
    { path: '/users/my_rewards', component: MyRewards, name: 'my_rewards', meta: { auth: true } },
    { path: '/users/my_vouchers/category/:id', component: MyVouchersSub, name: 'my_vouchers_subcategory', meta: { auth: true } },
    { path: '/programme_rules', component: ProgrammeRules, name: 'pr' },
    { path: '/terms', component: TC, name: 'tc' },
    { path: '/favourites', component: Favourites, name: 'favourites', meta: { auth: true } },
    { path: '/users/discount', component: Discount, name: 'discount', meta: { auth: true } },
    { path: '/users/notifications', component: Notifications, name: 'notifications', meta: { auth: true } },
    { path: '/search', component: Search, name: 'search' },
    { path: '/landing', component: Landing, name: 'landing' },
    { path: '/option_1_index', component: PersonalizeIndex, name: 'option_1_index' },
    { path: '/option_2_index', component: PersonalizeIndex2, name: 'option_2_index' },
    { path: '/option_3_index', component: PersonalizeIndex3, name: 'option_3_index' },
    { path: '/profile', component: Profile, name: 'profile', meta: { auth: true }  },
    { path: '/newprofile', component: NewProfile, name: 'newProfile', meta: { auth: true }  },
    { path: '/editprofile', component: EditProfile, name: 'editProfile', meta: { auth: true }  },
    { path: '/editpassword', component: EditPassword, name: 'editpassword', meta: { auth: true }  },
    { path: '/venues', component: Venues, name: 'venues', meta: { auth: true } },
    // { path: '/termsandconditions', component: TermsAndConditions, name: 'termsandconditions', meta: { auth: true } },
    { path: '/recoverpassword', component: RecoverPassword, name: 'recoverpassword'},
    { path: '/input_rut', component: InputRut, name: 'input_rut'},
    { path: '/users/my_classes', component: MyClasses, name: 'my_classes'},
    { path: '/users/keys', component: UserKeys, name: 'user_keys', meta: { auth: true } },
    { path: '/referrals', component: Referrals, name: 'referrals', meta: { auth: true } }
]
