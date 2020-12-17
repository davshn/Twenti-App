<template>
    <div class="col-xs-12 no-padding">
        <app-header :title="$t('common.redeem')"></app-header>
        <div class="col-xs-12" id="redeem_body">
            <h3 class="col-xs-12">
                {{ offer.attributes.title }}
            </h3>
            <p class="col-xs-12">
                {{ $t("redeem.msg") }}
            </p>
        </div>
        <div
            class="col-xs-12 text-center"
            id="qrcode"
            v-show="qr == false">
        </div>
        <div class="col-xs-12">
          <router-link tag="a"
            :to="{ name: 'offers_index' }"
            class="gold-button col-xs-12 text-center new_login__content--login_button active" v-show="qr == false">
            {{ $t("common.done") | capitalize }}
          </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pin: '',
                actual_input: 0,
                qr: true,
                encripted_code: '',
                offer: {
                    id: '',
                    attributes: {
                        img: '',
                        title: '',
                        "offer-expiry": '',
                        description: '',
                        venues: [],
                        tc: ''
                    }
                }
            }
        },
        methods:{
            add_password(event) {
                if(this.actual_input <= 3){
                    var input = $(this.$el).find("input[type='number']")[this.actual_input];
                    var target = $(event.target).hasClass("circle-btn") ?
                        $(event.target) :
                        $(event.target).parents(".circle-btn");
                    var number = Number($(target).find("span").text());
                    $(input).val(number);
                    this.actual_input++;
                }
            },
            reset_pin(){
                this.actual_input = 0;
                $(this.$el).find("input[type='number']").val('');
            },
            submit_pin(){
                var str = '';
                $(this.$el).find("input[type='number']").each(function(){
                    str += $(this).val();
                });
                var vm = this;
                navigator.geolocation.getCurrentPosition(vm.findPosition);
                try{
                    var temp = {
                      attributes : {
                        email: this.getUserEmail(),
                        mobile: this.getUserMobile(),
                        password: str
                      }
                    }
                    var payload = JSON.parse(JSON.stringify(temp))
                    this.$http.post(this.getServer()+"/v1/users/auth_for_qr",{
                        data: this.encrypt(payload).toString()
                    }, {
                        headers:{
                            "Authorization": "Bearer " + this.getUserToken(),
                            "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                        }
                    }).then(function(response){
                        if(response.status == 200){
                            var qrcode = new QRCode(document.getElementById("qrcode"));
                            qrcode.makeCode('{"data":{"id_user":'+response.body.data.id+',"id_offer":'+this.offer.id+'}}');
                            this.qr = !this.qr;
                            $("canvas").width("100%");
                            $("canvas").css({"margin-left":"auto", "margin-right": "auto"});
                        }else{
                          console.log('Holi');
                            this.show_error_modal(response.body.errors[0].details, 'Error', 'Aceptar')
                        }
                        if(response.body.meta != undefined && response.body.meta != null){
                          if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                            this.checkToken(response.body.meta.authentication_token)
                          }
                        }
                    }, function(response){
                      console.log("que hache");
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                        }
                      }
                        this.$router.push({name: 'log_in'})
                        this.show_error_modal(response.body.errors[0].details, 'Error', 'Aceptar')
                        // this.errors_handler(response);
                    });
                }catch(e){
                  console.log("como vamos");
                  this.show_error_modal(e.body.errors[0].details, 'Error', 'Aceptar')
                    // this.errors_handler(e.message);
                }
            },
            getQRCode(){
              var vm = this;
              navigator.geolocation.getCurrentPosition(vm.findPosition);
              try {
                this.$http.get('app/offers/' + this.offer.id + "/redeem_code",{
                  headers:
                  this.getUserToken() != '' ?
                  {
                      "Authorization": "Bearer " + this.getUserToken(),
                      "X-Device-ID" : this.buildDeviceId(),
                      "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                  } :
                  {
                    "X-Device-ID" : this.buildDeviceId(),
                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                  }
                }).then(function(response){
                  if(response.status == 200){
                    this.encripted_code = response.body.meta.qr_code
                    var qrcode = new QRCode(document.getElementById("qrcode"));
                    // qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":'+this.offer.id+'}}');
                    qrcode.makeCode(this.encripted_code);
                    this.qr = !this.qr;
                    $("canvas").width("90%");
                    $("canvas").css({"margin-left":"auto", "margin-right": "auto"});
                    $("img").css({"margin-left":"auto", "margin-right": "auto"});
                    // this.remove_cache_vouchers();
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                  }else{
                    this.show_error_modal(response.body.errors[0].details, '', 'Regresar')
                  }

                }, function(response){
                  if(response.body.meta != undefined && response.body.meta != null){
                    if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                      this.checkToken(response.body.meta.authentication_token)
                    }
                  }
                  this.show_error_modal(response.body.errors[0].details, '', 'Regresar')
                  // this.errors_handler(response)
                })
              } catch (e) {
                this.show_error_modal(response.body.errors[0].details)
              }
            }
        },
        mounted(){
          if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
            if(typeof this.$route.params.offer != null && typeof this.$route.params.offer != undefined ){
                this.offer = this.$route.params.offer;
            }
            // var qrcode = new QRCode(document.getElementById("qrcode"));
            // qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":'+this.offer.id+'}}');
            // this.qr = !this.qr;
            // $("canvas").width("100%");
            // $("canvas").css({"margin-left":"auto", "margin-right": "auto"});
            // $("img").css({"margin-left":"auto", "margin-right": "auto"});
            // this.remove_cache_vouchers();
            this.getQRCode()
          } else {
            this.$router.push({name: 'log_in'})
          }

        }
    }
</script>

<style scoped lang="scss">
    #redeem_body h3{
        margin-top: 24px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 20px;
        color: #212121;
    }

    #redeem_body p{
        margin-top: 8px;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        text-align: center;
        line-height: 16px;
        color: #616161;
    }

    #redeem_body .circle-btn{
        width: 48px;
        height: 48px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
        border-radius: 100px;
        position: relative;
        display: inline-block;
    }

    #redeem_body .circle-btn span{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 23px;
        text-align: center;
        line-height: 24px;
        color: #0064CA;
        position: absolute;
        top: 50%;
        left: 48%;
        transform: translate(-50%,-50%);
    }

    #redeem_body .row:not(:last-child){
        position: relative;
        margin-bottom: 24px;
    }

    #redeem_body .row:not(:last-child) .circle-btn:first-child{
        float: left;
    }

    #redeem_body .row:not(:last-child) .circle-btn:nth-child(2){
        display: block;
        margin: auto;
    }

    #redeem_body .row:not(:last-child) .circle-btn:last-child{
        position: absolute;
        top: 0px;
        right: 0px;
    }

    #redeem_body .redeem_btn{
        width: 128px;
        height: 48px;
        background-color: #0064CA;
        box-shadow: 0 4px 8px 0 rgba(189,189,189,0.54);
        border-radius: 100px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        line-height: 24px;
        color: #FFFFFF;
        float: right;
        padding: 12px;
    }

    #qrcode{
        padding-top: 20px;
        margin-bottom: 20px;
        width: 100vw;
        img{
            width: 80%;
        }
    }

    div.app-form-group input.square-input{
        width: 35px;
        height: 35px;
        font-size: 20px;
    }
</style>
