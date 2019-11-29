<template>
    <div class="col-xs-12 no-padding">
        <app-header :title="$t('waiter.waiter')">
            <div slot="left-content">

            </div>
            <div slot="right-content" class="text-center log-out">
              <span @click="logOut()" class="gold-text pull-right">
                  Salir
              </span>
            </div>
        </app-header>
        <div class="col-xs-12 text-center">
            <div @click="scanQR()" class="new_login__content--login_button small-12 active scan">
                Escanear codigo QR
            </div>
            <div class="col-xs-12" v-if="scan">
                <h3 class="gold-text">
                    {{ $t("waiter.info") | capitalize }}
                </h3>
                <app-instance-object
                  :objects="offers"
                  :object_type="'offer'"
                  :route = "''"
                  ></app-instance-object>
                <span class="user col-xs-12 no-padding">
                    {{ $t("common.user") | capitalize }}
                </span>
                <div class="user-info col-xs-12">
                    <div class="row">
                        <span class="gold-text">Nombre: </span> {{ user.attributes.name + user.attributes.last_name }}
                    </div>
                    <!-- <div class="row">
                        <span class="gold-text">Mobile: </span> {{ user.mobile }}
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // var done = function(err, status){
    //   if(err){
    //     console.error(err._message);
    //   } else {
    //     console.log('QRScanner is initialized. Status:');
    //     console.log(status);
    //     // QRScanner.scan(callback);
    //     if (status.authorized){
    //       QRScanner.show()
    //     }else{
    //       console.log("yucas");
    //     }
    //   }
    // };
    // var callback = function(err, contents){
    //   if(err){
    //     console.error(err._message);
    //   }
    //   alert('The QR Code contains: ' + contents);
    // };

    export default {
        data() {
            return {
                user: {},
                offers: [],
                scan: false,
                scanner_params: {
                  text_title: "", // Android only
                  text_instructions: "Coloca el codigo QR en el centro de la pantalla", // Android only
                  // camera: "front" || "back", // defaults to "back"
                  // flash: "on" || "off" || "auto", // defaults to "auto". See Quirks
                  drawSight: true //|| false //defaults to true, create a red sight/line in the center of the scanner view.
                }
            }
        },
        methods: {
            logOut(){
              this.updateShowDrawer(false);
              this.deleteSession('log_in', true);
            },
            // scanQR(){
            //   var vm = this
            //   if(cordova.plugins != undefined && cordova.plugins != null){
            //     this.scanQRTemp()
            //   }else{
            //     cloudSky.zBar.scan(vm.scanner_params, vm.onSuccess, vm.onFailure)
            //   }
            // },
            scanQR() {
                var vm = this;
                vm.offers = []
                console.log(vm.getAgentId());
                try {
                  this.$http.post('app/users/check_user',{agent_id: this.getAgentId()},{
                    headers:
                    this.getUserToken() != '' ?
                    {
                        "Authorization": "Bearer " + this.getUserToken(),
                        "X-Device-ID" : this.buildDeviceId(),
                        "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                    } :
                    {
                      "X-Device-ID" : this.buildDeviceId(),
                      "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                    }
                  })
                  .then(function(response){
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                    if(cordova.plugins != undefined && cordova.plugins != null){
                      this.scanQRTemp()
                    }else{
                      cloudSky.zBar.scan(vm.scanner_params, vm.onSuccess, vm.onFailure)
                    }
                  }, function(response){
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                    if (response.status==401) {
                      // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                      this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                    }else{
                      this.show_error_modal(response.body.errors[0].details);
                    }
                  })
                } catch (e) {
                  vm.errors_handler(e.message);
                }
            },
            onSuccess(result){
              console.log("Listos");
              console.log(result);
              var vm = this
              vm.offers = []
              try{
                    let qr_string = result

                    var temp = {
                      attributes : {
                        qr_string: qr_string
                      }
                    }
                    var payload = JSON.parse(JSON.stringify(temp))

                    vm.$http.post("agents/"+ vm.getAgentId() +"/scan_qr",{
                      data: vm.encrypt(payload).toString()
                    },{
                      headers:
                      vm.getUserToken() != '' ?
                      {
                          "Authorization": "Bearer " + vm.getUserToken(),
                          "X-Device-ID" : vm.getDeviceId(),
                          "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                      } :
                      {
                        "X-Device-ID" : vm.getDeviceId(),
                        "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                      }
                    }
                    ).then(function(response){
                      console.log(response);
                      for (var i = 0; i < response.body.included.length; i++) {
                        if(response.body.included[i].type == "offers"){
                          this.offers.push(response.body.included[i])
                        }else if(response.body.included[i].type == "clients"){
                          this.user = response.body.included[i]
                        }
                      }
                      console.log(this.offers);
                      console.log(this.user);
                      this.scan = true;
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                        }
                      }
                    }, function(response){
                      this.show_error_modal(response.body.errors[0].details);
                    })

              }catch(e){
                  vm.show_error_modal(e.message);
              }
            },
            onFailure(result){
              console.log("Pailas");
              console.log(result);
              // this.show_error_modal(result);
            },
            scanQRTemp() {
                var vm = this;
                vm.offers = []
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        try{
                            if( result.format == "QR_CODE" ){
                              let qr_string = (result.text)

                              var temp = {
                                attributes : {
                                  qr_string: qr_string
                                }
                              }
                              var payload = JSON.parse(JSON.stringify(temp))

                              vm.$http.post("agents/"+ vm.getAgentId() +"/scan_qr",{
                                data: vm.encrypt(payload).toString()
                              },{
                                headers:
                                vm.getUserToken() != '' ?
                                {
                                    "Authorization": "Bearer " + vm.getUserToken(),
                                    "X-Device-ID" : vm.getDeviceId(),
                                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                } :
                                {
                                  "X-Device-ID" : vm.getDeviceId(),
                                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                }
                              }
                              ).then(function(response){
                                console.log(response);
                                for (var i = 0; i < response.body.included.length; i++) {
                                  if(response.body.included[i].type == "offers"){
                                    this.offers.push(response.body.included[i])
                                  }else if(response.body.included[i].type == "clients"){
                                    this.user = response.body.included[i]
                                  }
                                }
                                console.log(this.offers);
                                console.log(this.user);
                                this.scan = true;
                                if(response.body.meta != undefined && response.body.meta != null){
                                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                    this.checkToken(response.body.meta.authentication_token)
                                  }
                                }
                              }, function(response){
                                this.show_error_modal(response.body.errors[0].details);
                              })
                            }
                        }catch(e){
                            vm.show_error_modal(e.message);
                        }
                    },
                    function (error) {
                        vm.show_error_modal("Scanning failed: " + error);
                    }
                );
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
        }
    }
</script>

<style scoped>
    .user{
        margin-top: 20px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
        color: #212121;
    }

    .categories{
        padding-left: 0px;
    }

    .user-info{
        padding-top: 20px;
    }

    .log-out{
        margin-top: 2px;
    }

    .scan{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
