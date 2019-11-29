import Vue from'vue'

Vue.filter('capitalize', function(val){
    if(!val) return '';
    val = val.toString();
    val = val.replace(/\b\w/g, l => l.toUpperCase());
    var res = "";
    for (var i = 0; i < val.length; i++) {
        if(i > 0 && /[áéíóúAÉÍÓÚÑñ]/.test(val[i-1])){
            res += val[i].toLowerCase();
        }else{
        	res += val[i];
        }
    }
    return res;
});

Vue.filter('titleCase', function (val) {
  return val.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
})

Vue.filter('upperCase', function(val){
    if(!val) return '';
    val = val.toString();
    return val.toUpperCase();
});

Vue.filter('lowerCase', function(val){
    if(!val) return '';
    val = val.toString();
    return val.toLowerCase();
});
