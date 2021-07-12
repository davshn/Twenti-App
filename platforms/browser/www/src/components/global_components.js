import loader from './shared/Loader.vue'
import errorModal from './shared/ErrorModal.vue'
import pullRefresh from './shared/PullRefresh.vue'
import loginForm from './shared/LoginForm.vue'
import arrowLeft from './shared/svg/ArrowLeft.vue'
import close from './shared/svg/Close.vue'
import QRIcon from './shared/icons/QR_icon.vue'
import ListIcon from './shared/icons/ListIcon.vue'
import TableIcon from './shared/icons/TableIcon.vue'
import QrButton from './shared/QrButton.vue'
import CodeModal from './shared/CodeModal.vue'
import ScheduleLoader from './shared/ScheduleLoader.vue'
import ModalPayment from './views/ModalPayment.vue'

var components = {
  loader: loader,
  errorModal: errorModal,
  pullRefresh: pullRefresh,
  loginForm: loginForm,
  arrowLeft: arrowLeft,
  close: close,
  qrIcon: QRIcon,
  listIcon: ListIcon,
  tableIcon: TableIcon,
  qrButton: QrButton,
  codeModal: CodeModal,
  scheduleLoader: ScheduleLoader,
  modalPayment: ModalPayment
}

module.exports = components;
