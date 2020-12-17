import Vue from'vue'
import VueI18n from 'vue-i18n'
import { locales } from './locales.js'
Vue.use(VueI18n);
var i18n = new VueI18n({
  locale: navigator.language.slice(0,2),
  messages: locales,
  fallbackLocale: 'en'
});
module.exports = i18n;
