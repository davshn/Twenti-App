import Vue from'vue'
import resource from './resource/index.js'
import router from './routes/index.js'
import UUID from 'vue-uuid'
import VueCordova from 'vue-cordova'
import VueCordovaDevice from 'vue-cordova-device'
import mixins from './Vue/mixins.js'
import i18n from './i18n/index.js'
import filters from './Vue/filters.js'
import es from './validation/locales/es.js';
import en from './validation/locales/en.js';
import VueTouch from 'vue-touch';
import VeeValidate, { Validator } from 'vee-validate';
const VueValidationEs = require('vee-validate/dist/locale/es');
import ProgressiveImage from 'progressive-image/dist/vue'
import VueMoment from 'vue-moment'
import App from './App.vue'
import components from './components/index.js'
const moment = require('moment')
require('moment/locale/es')

Vue.use(UUID)
Vue.use(VueCordovaDevice)
Vue.use(VueCordova);
Vue.use(require('vue-moment'), {
    moment
})
Vue.use(VueTouch);

document.addEventListener("deviceready", function(){
  router.beforeEach((to, from, next) => {
    console.log(router);
    var vm = router.app
    console.log(vm);
    console.log(vm.$el);
    if(to.meta.auth){
        try{
            if(router.app.getUserToken() == "" || router.app.getUserToken() == null
              || router.app.getUserToken() == undefined){
                console.log("router interceptor")
                if (from.name="log_in") {
                  this.updateShowDrawer(true)
                  console.log("router interceptor from login")
                }
                if(navigator.geolocation){
                  navigator.geolocation.getCurrentPosition(router.app.findPosition);
                }
            }
        }catch(e){
          console.log("router interceptor error")
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(router.app.findPosition);
          }
        }
    }
    next();
  });
  //
    new Vue({
        el: "#app",
        router: router,
        render: h => h(App),
        i18n: i18n,
        store: mixins,
        codova_device: VueCordovaDevice
    });
}, false);

jQuery.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
      });
      return this;
    }
});

VueTouch.config.swipe = {
  direction: "horizontal"
}
Vue.use(VeeValidate, {
  locale: navigator.language.slice(0,2),
  dictionary: {
    en: VueValidationEs,
    es: VueValidationEs
  }
});

VueTouch.config.pan = {
  threshold: 200
}
