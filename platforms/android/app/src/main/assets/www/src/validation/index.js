import Vue from'vue';
import VeeValidate, { Validator } from 'vee-validate';
import es from './locales/es.js';
import en from './locales/en.js';

Vue.use(VeeValidate, {
  locale: navigator.language.slice(0,2),
  dictionary: {
    en: { attributes: es },
    es: { attributes: es }
  }
});


Validator.addLocale(es);
Validator.extend('usuario', {
  messages: {
    en: (field, args) => {
      return `Mail incorrect`;
    },
    es: (field, args) => {
      return `Correo incorrecto`;
    }
  },
  // Returns a boolean value
  validate: value => {
    return /(^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$|^[0-9]{7,15}$)/i.test(value);
  }
});
