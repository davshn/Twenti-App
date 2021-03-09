import Vue from'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
// Vue.http.options.root = 'http://ec2-54-191-209-22.us-west-2.compute.amazonaws.com/api/v1/'
Vue.http.options.root = 'http://192.168.1.117:4000/api/v1/';


Vue.http.options.emulateHTTP = true;
Vue.http.headers.common['Accept-Language'] = 'es'
Vue.http.headers.common["DYNAMIC-LANGUAGE"] = 'es';
Vue.http.headers.common["Content-Type"]= "application/vnd.api+json";
Vue.http.headers.common.Accept= "application/vnd.api+json";
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
    });
});
