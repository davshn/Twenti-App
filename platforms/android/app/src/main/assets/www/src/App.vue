<template>
    <div class="vue_body">
        <router-view ref="vueBody" ></router-view>
    </div>
</template>

<script>
  export default{
    mounted(){
      if (localStorage.current_token == null || localStorage.current_token == undefined){
        window.localStorage.setItem('current_token', '')
      }
      var vm = this
      setTimeout(function(){
        // vm.init_db()
        vm.setupPush()
        vm.buildDeviceId()
       }, 2000)
      console.log("Inicializador de Push Notifications");
      console.log("UUID");
      console.log(localStorage.device_id);
      console.log(this.$uuid.v1());
      vm.updateShowUserKey(false)
    },
    methods:{
      onDone(err, status){
        if (err) {
         // here we can handle errors and clean up any loose ends.
         console.error(err);
        }
        if (status.authorized) {
          console.log("scanner authorized");
          // W00t, you have camera access and the scanner is initialized.
          // QRscanner.show() should feel very fast.
        } else if (status.denied) {
          console.log("scanner denied");
         // The video preview will remain black, and scanning is disabled. We can
         // try to ask the user to change their mind, but we'll have to send them
         // to their device settings with `QRScanner.openSettings()`.
        } else {
          console.log("scanner other error");
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/stylesheets/application.scss';

  .slick-list{
      overflow: scroll;
  }
</style>
