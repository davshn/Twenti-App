import Vue from'vue'
import VueResource from 'vue-resource'
// import { countries } from '../assets/js/countries.js';

Vue.use(VueResource);

// $.getJSON('http://freegeoip.net/json/', function(result) {
//     var country_code = result.country_code;
//     for(var key in countries){
//         if(countries[key].code == country_code){
//             Vue.http.headers.common["DYNAMIC-NATIONALITY"] = countries[key].dial_code;
//         }
//     }
// });
Vue.http.options.root = 'http://ec2-54-191-209-22.us-west-2.compute.amazonaws.com/api/v1/'
// Vue.http.options.root = 'http://192.168.0.6:4000/api/';
// Vue.http.options.root = 'http://ec2-34-220-12-153.us-west-2.compute.amazonaws.com/api/'


// Servidor Sportlife
// Vue.http.options.root = 'https://srv-back-20181017.karrott.cl/api/';
// Servidor Karrott
// Vue.http.options.root = 'http://ec2-54-184-17-138.us-west-2.compute.amazonaws.com/api/'

Vue.http.options.emulateHTTP = true;

Vue.http.headers.common['Accept-Language'] = 'es'
Vue.http.headers.common["DYNAMIC-LANGUAGE"] = 'es';
Vue.http.headers.common["Content-Type"]= "application/vnd.api+json";
Vue.http.headers.common.Accept= "application/vnd.api+json";
Vue.http.headers.common["X-Frame-Options"] = "ALLOW-FROM https://m.facebook.com/";
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, HEAD'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Content-Type, Authentication, Accept-Language'
var flag = true;

Vue.http.interceptors.push(function(request, next) {
    flag = false;
    console.log(request);
    $(".header__loader").show();
    $(".loader").show();
    next(function(response) {
      console.log(response);
      flag = true;
      $(".header__loader").hide();
      $(".loader").hide();
    // this.handle_notifications(response);
    });
});
