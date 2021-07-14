<template>
  <article class="coupon__container">
    <article class="coupon" v-if="charged" v-show="!show_camera">
      <section class="coupon__nav">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg" alt="" @click="goBack()">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg" alt="" @click="$router.push({name: 'notifications'})">
      </section>
      <section class="coupon__gallery">
        <img :src="coupon.attributes.image.url" alt="">
      </section>
      <section class="coupon__header">
        <p class="coupon__header--principal" v-html="coupon.attributes.title">
        </p>
        <p class="coupon__header--secondary">
          Martes a Jueves de 9 a 12
        </p>
        <p class="coupon__header--sub_text">
          Válido hasta el 1 de Abril de 2020
        </p>
      </section>
      <section class="coupon__description">
        <p class="coupon__description--text" v-html="coupon.attributes.description">
        </p>
      </section>
      <section class="coupon__terms_and_conditions">
        <p>
          Términos y condiciones
        </p>
        <p v-html="coupon.attributes.terms_and_conditions"></p>
      </section>
    </article>
    <section class="coupon__redemption" v-show="!show_camera">
      <p class="coupon__redemption--title">
        ¿Cómo redimir esta promoción?
      </p>
      <p class="coupon__redemption--text">
        1. Acércate al establecimiento que ofrece éste cupón <br>
        2. Busca el código QR en el xxx de establecimiento <br>
        3. Lee el código QR con el lector que incluimos debajo de estos pasos
      </p>
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/instancia_cupon_qr.svg"
        alt=""
        class="coupon__redemption--icon"
        @click="scanQR()">
    </section>
    <div
      class="instance__qr_lector"
      v-show="show_camera">
      <p class="instance__qr_lector--text">
        Coloque el código en el centro de la pantalla
      </p>
      <section class="instance__qr_lector--section">
        <div class="qr_lector__indicator">
          <section class="qr_lector__indicator--top_corner">
          </section>
          <section class="qr_lector__indicator--top_corner">
          </section>
        </div>
        <div class="qr_lector__indicator">
          <section class="qr_lector__indicator--bottom_corner">
          </section>
          <section class="qr_lector__indicator--bottom_corner">
          </section>
        </div>
      </section>
    </div>
    <modal-payment
      :current_client="current_client"
      :offer_id="$route.params.id"
      @handle-cancel-modal-payment="closePaymentModal"
      v-if="show_payment_modal"></modal-payment>
  </article>

</template>

<script>
export default {
  data(){
    return{
      charged:false,
      coupon:{},
      show_camera: false,
      current_client: null,
      show_payment_modal: false,
      scanner_params: {
        text_title: "", // Android only
        text_instructions: "Coloque el código en el centro de la pantalla", // Android only
        // camera: "front" || "back", // defaults to "back"
        // flash: "on" || "off" || "auto", // defaults to "auto". See Quirks
        drawSight: true //|| false //defaults to true, create a red sight/line in the center of the scanner view.
      }
    }
  },
  mounted(){
    this.findCoupon()
  },
  beforeDestroy(){
    var vm = this
    QRScanner.destroy(function(status){
      vm.show_camera = false
    });
    vm.$el.style.background="#FFFFFF"
  },
  methods:{
    closePaymentModal(){
      this.show_payment_modal = false
    },
    findCoupon(){
      try {
        this.$http.get('offers/'+this.$route.params.id,
        ).then(function(response){
          this.coupon = response.body.data
          console.log(response);
          console.log("Congrats");
          this.charged = true
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },

    scanQR() {
      var vm = this;
      if(cordova.plugins != undefined &&
         cordova.plugins != null &&
         cordova.plugins.barcodeScanner != undefined &&
         cordova.plugins.barcodeScanner != null &&
         cordova.platformId != 'android'){
           console.log("pluging barcode Scanner");
        this.scanQRTemp()
      }else{
        var callback = function(err, contents){
          if(err){
            console.log("ERROR");
            alert(err._message);
          }
          // alert('The QR Code contains: ' + contents);
          vm.onSuccess(contents)
          QRScanner.destroy(function(status){
            vm.show_camera = false
            vm.$el.style.background="#FFFFFF"
          });

        };
        QRScanner.show(function(status){
          vm.$el.style.background ="transparent"
          vm.show_camera = true
          QRScanner.scan(callback)
        });
      }
    },
    onSuccess(result){
      console.log("Ok Scan");
      console.log(result);
      var vm = this
      // vm.offers = []
      this.show_camera = false
      // alert(result)
      this.current_client = result
      this.show_payment_modal = true
    },
    onFailure(result){
      console.log("Error");
      console.log(result);
      alert(result)
      // this.show_error_modal(result);
    },
    scanQRTemp() {
        var vm = this;
        vm.offers = []
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              alert(result)
          },
          function (error) {
            alert(error)
          }
        );
    },









  }
}
</script>

<style lang="css">
</style>
