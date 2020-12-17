import Vue from'vue'

require('moment/locale/es')
export const moment = require('moment')

Vue.use(require('vue-moment'), {
    moment
})

console.log(Vue.moment().locale()) //es
