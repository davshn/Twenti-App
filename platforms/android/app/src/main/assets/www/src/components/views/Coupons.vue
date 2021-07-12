<template>
  <article class="" v-if="charged" style="padding: 40px 0 30px; min-height: 100vh; background-color: #fafafa; position: relative">
    <span
      @click="closeSession()"
      style="position: absolute; top: 15px; right: 15px;">Cerrar Sesión</span>
    <section>
      <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
        <div
          class="new_login__content--login_button small-12 active"
          @click="$router.push({name:'validate_sale'})">
          Validar Compra
        </div>
      </div>
    </section>
    <section>
      <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
        <div
          class="new_login__content--login_button small-12 active"
          @click="openQR()">
          QR del comercio
        </div>
      </div>
    </section>
    <section style="padding: 24px;">
      <section class="category__info" v-if="charged">
        <p class="category__info--title">Cupones activos</p>
        <section class="category__info--content">
          <section
            class="category__info--section"
            v-for="(section, index) in coupons"
            v-if="section.published"
            @click="$router.push({name:'coupon', params:{id:section.id}})">
            <div class="category_section__header">
              <div class="category_section__header--container">
                <div class="category_section__header--discount">
                  <p>
                    {{'-'+section.discount_value+'%'}}
                  </p>
                </div>
                <img :src="section.image.url" alt="">
              </div>
              <div class="category_section__header--title">
                <p>
                  {{section.title}}
                </p>
              </div>
            </div>
            <p class="category_section__text">
              {{section.description}}
            </p>
          </section>
        </section>
      </section>
    </section>
    <section v-if="show_qr_modal" class="sale_modal">
      <div class="sale_modal__content" style="padding-bottom: 30px;">
        <span
          @click="close_modal() "
          style="position: absolute; top: 15px; right: 15px;">Cerrar</span>
        <div
            class="col-xs-12 text-center"
            id="qrvalidate"
            v-show="qr == false">
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      qr: true,
      show_qr_modal: false,
      coupons:[],
      commerce_name:'',
      charged: false
    }
  },
  methods:{
    close_modal(){
      this.qr = true;
      this.show_qr_modal=false;
    },
    send_request(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
        try{
            this.$http.get("find_coupons?id="+this.getCommerceRef(), {
                headers: {
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                }

            }).then(function(response){
                console.log(response);
                this.coupons = response.body.meta
                this.charged = true;
                if(response.body.meta != undefined && response.body.meta != null){
                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                    this.checkToken(response.body.meta.authentication_token)
                  }
                }
            }, function(response){
              if(response.body.meta != undefined && response.body.meta != null){
                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                  this.checkToken(response.body.meta.authentication_token)
                }
              }
                this.show_error_modal(response.body.errors[0].details);
            });
        }catch(e){
          this.show_error_modal(e.message);
        }
    },
    openQR(){
      var vm = this;
      this.show_qr_modal = true
      setTimeout(function(){
        var qrcode = new QRCode(document.getElementById("qrvalidate"));
        qrcode.makeCode(vm.getCommerceRef().toString());
        vm.qr = !vm.qr;
        $("canvas").width("90%");
        $("canvas").css({"margin-left":"auto", "margin-right": "auto"});
        $("#qrvalidate img").css({"margin-left":"auto", "margin-right": "auto"});
      }, 500);
      // qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":'+this.offer.id+'}}');
    },
  },
  mounted(){
    this.send_request()
  }
}
</script>

<style lang="css">
</style>
