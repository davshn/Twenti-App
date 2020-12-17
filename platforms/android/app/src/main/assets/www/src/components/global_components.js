import header from './shared/Header.vue'
import footer from './shared/Footer.vue'
import selectInput from './shared/SelectInput.vue'
import facebookLogInButton from './shared/FacebookLogInButton.vue'
import slider from './shared/Slider.vue'
import modal from './shared/Modal.vue'
import drawer from './shared/Drawer.vue'
import loader from './shared/Loader.vue'
import errorModal from './shared/ErrorModal.vue'
import pullRefresh from './shared/PullRefresh.vue'
import discountSvg from './shared/icons/DiscountIcon.vue'
import serviceSvg from './shared/icons/ServiceIcon.vue'
import venuesSvg from './shared/icons/VenuesIcons.vue'
import offersSvg from './shared/icons/OffersIcon.vue'
import voucherSvg from './shared/icons/VoucherIcon.vue'
import starSvg from './shared/svg/Star.vue'
import loginForm from './shared/LoginForm.vue'
import favouriteCircle from './shared/FavouriteCircle.vue'
import homeButton from './shared/HomeButton.vue'
import container from './shared/Container.vue'
import instanceHeader from './shared/instance/InstanceHeader.vue'
import instanceTitle from './shared/instance/InstanceTitle.vue'
import instanceDescription from './shared/instance/InstanceDescription.vue'
import instanceModal from './shared/instance/InstanceModal.vue'
import clock from './shared/svg/Clock.vue'
import money from './shared/svg/Money.vue'
import inboxEmpty from './shared/svg/InboxEmpty.vue'
import arrowLeft from './shared/svg/ArrowLeft.vue'
import search from './shared/svg/Search.vue'
import location from './shared/svg/Location.vue'
import car from './shared/svg/Car.vue'
import starFill from './shared/svg/StarFill.vue'
import starOutline from './shared/svg/StarOutline.vue'
import favourite from './shared/svg/Favourite.vue'
import camera from './shared/svg/Camera.vue'
import call from './shared/svg/Call.vue'
import calendar from './shared/svg/Calendar.vue'
import finish from './shared/svg/Finish.vue'
import close from './shared/svg/Close.vue'
import New_home from './shared/icons/New_home.vue'
import New_vouchers from './shared/icons/New_vouchers.vue'
import New_favorites from './shared/icons/New_favorites.vue'
import New_places from './shared/icons/New_places.vue'
import New_rewards from './shared/icons/New_rewards.vue'
import New_class from './shared/icons/New_class.vue'
import InstanceObject from './shared/instance/InstanceObject.vue'
import InstanceFavorites from './shared/instance/InstanceFavorites.vue'
import ImageLoader from './shared/ImageLoader.vue'
import Slick from 'vue-slick'
import NewProfile from './views/users/NewProfile.vue'
import Favorite from './shared/svg/Favourite.vue'
import FavoriteButton from './shared/FavoriteButton.vue'
import ShareIcon from './shared/icons/ShareIcon.vue'
import TermsAndConditions from './shared/TermsAndConditions.vue'
import InputRut from './shared/InputRut.vue'
import ToastMessage from './shared/ToastMessage.vue'
import ScheduleModal from './shared/SchedulesModal.vue'
import InputLocation from './shared/InputLocation.vue'
import QRIcon from './shared/icons/QR_icon.vue'
import ListIcon from './shared/icons/ListIcon.vue'
import TableIcon from './shared/icons/TableIcon.vue'
import QrButton from './shared/QrButton.vue'
import UserKeys from './views/users/UserKeys.vue'
import OfferIcon from './shared/icons/Offer_icon.vue'
import GymIcon from './shared/icons/Gym_icon.vue'
import CodeModal from './shared/CodeModal.vue'
import ScheduleLoader from './shared/ScheduleLoader.vue'

var components = {
  header: header,
  footer: footer,
  selectInput: selectInput,
  facebookLogInButton: facebookLogInButton,
  slider: slider,
  modal: modal,
  drawer: drawer,
  loader: loader,
  errorModal: errorModal,
  pullRefresh: pullRefresh,
  discountSvg: discountSvg,
  serviceSvg: serviceSvg,
  venuesSvg: venuesSvg,
  offersSvg: offersSvg,
  voucherSvg: voucherSvg,
  starSvg: starSvg,
  loginForm: loginForm,
  favouriteCircle: favouriteCircle,
  homeButton: homeButton,
  container: container,
  instanceHeader: instanceHeader,
  instanceTitle: instanceTitle,
  instanceDescription: instanceDescription,
  instanceModal: instanceModal,
  clock: clock,
  money: money,
  inboxEmpty: inboxEmpty,
  arrowLeft: arrowLeft,
  search: search,
  location: location,
  car: car,
  starFill: starFill,
  starOutline: starOutline,
  favourite: favourite,
  camera: camera,
  call: call,
  calendar: calendar,
  finish: finish,
  close: close,
  'new-home': New_home,
  'new-vouchers': New_vouchers,
  'new-favorites': New_favorites,
  'new-places': New_places,
  'new-rewards': New_rewards,
  'new-class': New_class,
  instanceObject: InstanceObject,
  instanceFavorites: InstanceFavorites,
  slick: Slick,
  imageLoader: ImageLoader,
  newProfile: NewProfile,
  favoriteIcon: Favorite,
  favoriteButton: FavoriteButton,
  shareIcon: ShareIcon,
  termsAndConditions: TermsAndConditions,
  inputRut: InputRut,
  InputLocation: InputLocation,
  toastMessage: ToastMessage,
  scheduleModal: ScheduleModal,
  qrIcon: QRIcon,
  listIcon: ListIcon,
  tableIcon: TableIcon,
  qrButton: QrButton,
  userKeys: UserKeys,
  offerIcon: OfferIcon,
  gymIcon: GymIcon,
  codeModal: CodeModal,
  scheduleLoader: ScheduleLoader
}

module.exports = components;
