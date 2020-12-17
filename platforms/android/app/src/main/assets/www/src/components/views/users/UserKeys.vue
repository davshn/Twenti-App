<template>
  <article class="user_key">
    <transition
      name="slideInUp">
      <v-touch
        @pandown="hideUserKey()"
        tag="section"
        class="user_key__container"
        v-show="loaded">
          <!-- <div class="user_key__touch_line"></div> -->
          <div v-show="getUserAccessState() != 'DENIED'">
            <p class="user_key__title">Hola, bienvenido a Sportlife</p>
            <p class="user_key__text">Puedes ingresar al gimnasio<br>con éste código</p>
            <div class="user_key__qr--container" style="" v-if="qr" id="qrcontent">
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey">
              </div>
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey2"
                >
              </div>
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey3"
                >
              </div>
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey4"
                >
              </div>
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey5"
                >
              </div>
              <div
                class="col-xs-12 text-center user_key__qr"
                id="qrcodekey6"
                >
              </div>
            </div>

          </div>
          <div
            class="user_key__no_access"
            v-show="getUserAccessState() == 'DENIED'">
            <p class="user_key__text user_key__no_access--text">Espera unos segundos a que se genere tu QR</p>
            <img
              src="./src/assets/images/pago.svg"
              alt="">
            <p class="user_key__text" style="padding: 0 15px">
              Puede ser que al momentono hayamos registrado tu pago.
              Acércate a un punto de pago y continúa entrenando.
            </p>
          </div>
          <div class="user_key__close" >
            <div class="user_key__close--button" @click="hideUserKey()">
              Cerrar
            </div>
          </div>
      </v-touch>
    </transition>
  </article>
</template>

<script>
export default {
  data(){
    return{
      qr: true,
      difference: 0,
      destroy: false,
      qrcodes: [],
      loaded: false,
      add: '',
      counter: 0,
      generate_qr: null,
      times: 1,
      qrcode: null,
      flag: 0
    }
  },
  mounted(){
    var vm = this;
    console.log(window.cordova.plugins.Brightness);
    var brightness = cordova.plugins.brightness;
    console.log(brightness);
    var vm = this
    brightness.setBrightness(0.9, vm.success(), vm.error());
    // success([-1,0-1]) float 0-1 is a brightness level, -1 represents a system default
    // brightness.getBrightness(([-1,1]), alert("Error"));
    // prevents sleep


    navigator.geolocation.getCurrentPosition(vm.findPosition);
    this.qr = true;
    console.log("Inicio QR");
    // this.qrcode = new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L});
    console.log("QR Preparado");
    // this.qrcodes = [new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L})];
    this.qrcodes = [new QRCode(document.getElementById("qrcodekey"), {correctLevel : QRCode.CorrectLevel.L}),
                    new QRCode(document.getElementById("qrcodekey2"), {correctLevel : QRCode.CorrectLevel.L}),
                    new QRCode(document.getElementById("qrcodekey3"), {correctLevel : QRCode.CorrectLevel.L}),
                    new QRCode(document.getElementById("qrcodekey4"), {correctLevel : QRCode.CorrectLevel.L}),
                    new QRCode(document.getElementById("qrcodekey5"), {correctLevel : QRCode.CorrectLevel.L}),
                    new QRCode(document.getElementById("qrcodekey6"), {correctLevel : QRCode.CorrectLevel.L}),]

    window.setTimeout(function(){
      vm.loaded = true
    }, 400)

    try {
      this.$http.get('access/verify_user_state', {
        headers: {
          "Authorization": "Bearer " + this.getUserToken(),
          "X-Device-ID" : this.getDeviceId(),
          "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
        }
      }).then(function(response){
        if(response.body.meta != undefined && response.body.meta != null){
          if(response.body.meta.authentication_token != undefined &&
             response.body.meta.authentication_token != null){
            this.checkToken(response.body.meta.authentication_token)
          }
          if (response.body.meta.timestamps != undefined &&
             response.body.meta.timestamps != null) {
            vm.difference = new Date().getTime() - Number(response.body.meta.timestamps);
          }
          if (response.body.meta.uuid != undefined &&
             response.body.meta.uuid != null) {
            vm.updateUserIdEncrypt(response.body.meta.uuid)
            vm.add = vm.getUserIdEncrypt();
          }
        }
        this.updateUserAccessState(response.body.data.status)
        console.log(this.getUserAccessState());
        if((this.getUserAccessState() == 'INVITED' || this.getUserAccessState() == 'GRANTED') && document.getElementsByClassName("user_key__qr")[0] != null){
          clearInterval()
          // this.qr = false;
          // this.qrcode = new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L});
          // this.qrcodes = [new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L})];
          vm.makeQRCode()
          vm.generate_qr = window.setInterval(function(){
            this.qr = false;

            // this.qrcode = new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L});
            this.qrcodes = [new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L})];
            // this.qrcodes = [new QRCode(document.getElementById("qrcodekey")),
            //                new QRCode(document.getElementById("qrcodekey2")),
            //                new QRCode(document.getElementById("qrcodekey3")),
            //                new QRCode(document.getElementById("qrcodekey4")),
            //                new QRCode(document.getElementById("qrcodekey5")),
            //                new QRCode(document.getElementById("qrcodekey6"))]
            document.getElementById("qrcodekey") != null ? vm.makeQRCode() : '';
            // const parent = document.getElementById("qrcontent");
            // while (parent.childElementCount > 1) {
            //   parent.lastChild.remove();
            // }
            // for (var i = 0; i < 5; i++) {
            //   var item = document.getElementsByClassName("user_key__qr")[0].cloneNode(true)
            //   document.getElementById("qrcontent").appendChild(item);
            // }
          }, 9000)
        } else if(response.body.data.status != 'DENIED'){
          // this.show_error_modal(response.body.data.status, " ")
          this.updateUserAccessState('DENIED')
          this.qr = false;
        }
      }, function(response){
        if(response.body.meta != undefined && response.body.meta != null){
          if(response.body.meta.authentication_token != undefined &&
             response.body.meta.authentication_token != null){
            this.checkToken(response.body.meta.authentication_token)
          }
        }
        if((this.getUserAccessState() == 'INVITED' || this.getUserAccessState() == 'GRANTED') && document.getElementsByClassName("user_key__qr")[0] != null){
          vm.add = vm.getUserIdEncrypt()
          // this.qr = false;
          // this.qrcode = new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L});
          // this.qrcodes = [new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L})];
          vm.makeQRCode()
          vm.generate_qr = window.setInterval(function(){
            this.qr = false;
            // this.qrcode = new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L});
            this.qrcodes = [new QRCode(document.getElementsByClassName("user_key__qr")[0], {correctLevel : QRCode.CorrectLevel.L})];
            // this.qrcodes = [new QRCode(document.getElementById("qrcodekey")),
            //                new QRCode(document.getElementById("qrcodekey2")),
            //                new QRCode(document.getElementById("qrcodekey3")),
            //                new QRCode(document.getElementById("qrcodekey4")),
            //                new QRCode(document.getElementById("qrcodekey5")),
            //                new QRCode(document.getElementById("qrcodekey6"))];
            document.getElementById("qrcodekey") != null ? vm.makeQRCode() : '';

          }, 9000)
        }
        response.body.data.message != undefined ? this.show_error_modal(response.body.data.message) : ''
      })
    } catch (e) {
      this.show_error_modal(e.message)
    }
    this.counter += 1
  },
  destroy(){

    this.loaded = false
    this.destroy = true
    clearInterval(vm.generate_qr)
  },
  watch:{
    counter(){
      var vm = this
      window.setTimeout(function(){
        vm.counter >= 120 ? vm.hideUserKey() : vm.counter += 1
      }, 1000)
    }
  },
  methods:{
    hideUserKey(){
      // event.stopPropagation()
      let vm = this
      vm.loaded = false
      console.log("down");
      var brightness = cordova.plugins.brightness;
      brightness.setBrightness(-1, vm.success(), vm.error());
      window.setTimeout(function(){
        vm.updateShowUserKey(false)
        this.qrcodes.map(function(qrcode){
          qrcode.clear()
        })
        clearInterval(vm.generate_qr)
      }, 500)
    },
    makeQRCode(){
      this.qr = true;
      var time_send = new Date().getTime() - this.difference;
      console.log(this.getUserId()+"//"+time_send+"//"+this.getDeviceId()+"."+this.add);
      console.log(this.encrypt(this.getUserId()+"//"+time_send+"//"+this.getDeviceId()).toString()+"."+this.add);
      var vm = this;
      console.log(this.qrcode);
      // this.qrcode.makeCode("<"+vm.encrypt(vm.getUserId()+"//"+time_send+"//"+vm.getDeviceId()).toString()+"."+vm.add+">");



      this.qrcodes.map(function (qrcode){
        // qrcode.clear();
        qrcode.makeCode("<"+vm.encrypt(vm.getUserId()+"//"+time_send+"//"+vm.getDeviceId()).toString()+"."+vm.add+">");
      })

      if(this.flag > 0){
        this.flag += 1
        const parent = document.getElementById("qrcontent");
        while (parent.childElementCount > 1) {
          parent.lastChild.remove();
        }
        for (var i = 0; i < 5; i++) {
          var item = document.getElementsByClassName("user_key__qr")[0].cloneNode(true)
          document.getElementById("qrcontent").appendChild(item);
          console.log(item);
        }
      }

    },
    success(e){
      console.log(e);
      // alert("Brightness set successfully");
    },
    error(e){
      // alert("Error setting brightness");
    }
  }
}
</script>
