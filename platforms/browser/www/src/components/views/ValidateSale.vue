<template>
  <article class="">
    <section v-show="!show_camera">
      <section class="coupon__nav" style="padding: 30px 28px 0;">
        <img
          src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
          alt=""
          @click="goBack()">
      </section>
      <div class="sale_container" >
        <section>
          <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
            <div
              class="new_login__content--login_button small-12 active"
              @click="scanQR()">
              Escanear código QR
            </div>
          </div>
        </section>
        <section>
          <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
            <div
              class="new_login__content--login_button small-12 active"
              @click="show_code_modal = true">
              Ingresar código de compra
            </div>
          </div>
        </section>
      </div>
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
    <div class="sale_modal" v-if="show_code_modal">
      <div class="sale_modal__content">
        <span
          @click="show_code_modal=false; sale_code=''"
          style="position: absolute; top: 15px; right: 15px;">Cerrar</span>
        <p>Ingresa el código de la compra</p>
        <div
          class="new_login__content--input_section small-12">
          <input
            data-vv-delay="0"
            name="code"
            class="form__input"
            type="text"
            placeholder="Código de la compra"
            v-model="sale_code">
        </div>
        <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
          <div
            class="new_login__content--login_button small-12 active"
            @click="find_sale_by_ticket(sale_code)">
            Validar código
          </div>
        </div>
      </div>
    </div>
    <div class="sale_modal" v-if="show_detail_modal">
      <div class="sale_modal__content">
        <span
          @click="show_detail_modal=false; sale_code=''"
          style="position: absolute; top: 15px; right: 15px;">Cerrar</span>
        <p style="text-align: center; margin-bottom: 15px;">Resumen de la compra</p>
        <div
          class="new_login__content--input_section small-12" style="text-align: left;">
          <span><b>Fecha de creacion</b></span>
          <p style="margin-bottom: 10px;">{{sale_detail.created_at}}</p>
          <span><b>Código de la compra</b></span>
          <p style="margin-bottom: 10px;">{{sale_detail.ticket_id}}</p>
          <span><b>Nombre</b></span>
          <p style="margin-bottom: 10px;">{{sale_detail.first_name}}</p>
          <span><b>Apellido</b></span>
          <p style="margin-bottom: 10px;">{{sale_detail.last_name}}</p>
          <span><b>Email</b></span>
          <p style="margin-bottom: 10px;">{{sale_detail.email}}</p>
          <span><b>Total</b></span>
          <p style="margin-bottom: 10px;">$ {{sale_detail.total}}</p>
        </div>
        <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
          <div
            class="new_login__content--login_button small-12 active"
            @click="validate_sale(sale_code)">
            Validar compra
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      sale_detail : {
        'created_at': '',
        'ticket_id': '',
        'total': '',
        'email': '',
        'first_name': '',
        'last_name': ''
      },
      show_detail_modal: false,
      show_code_modal:false,
      show_camera:false,
      sale_code:'',
      scanner_params: {
        text_title: "", // Android only
        text_instructions: "Coloque el código en el centro de la pantalla", // Android only
        // camera: "front" || "back", // defaults to "back"
        // flash: "on" || "off" || "auto", // defaults to "auto". See Quirks
        drawSight: true //|| false //defaults to true, create a red sight/line in the center of the scanner view.
      }
    }
  },
  methods:{
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
    validate_sale(code){
      this.show_code_modal=false
      this.show_detail_modal = false
      try {
        this.$http.post("validate_sale", {
            TicketId: code
        }).then(function(response){
          console.log(response);
          alert("Compra valida")
          this.sale_code=''
        }, function(response){
          console.log(response);
          console.log("Error");
          alert("No se pudo validar la compra")
        });
      } catch (e) {
        alert(e)
        this.sale_code=''
      }
    },
    find_sale_by_ticket(code){
      this.show_code_modal=false
      try {
        this.$http.get("find_purchace_by_ticket",
         {
           params:{
             TicketId: code
           }
        }).then(function(response){
          console.log(response);
          this.sale_code=code
          this.sale_detail = {
            'created_at': response.body.data.created_at,
            'ticket_id': response.body.data.ticket_id,
            'total': response.body.data.total,
            'email': response.body.meta.email,
            'first_name': response.body.meta.first_name,
            'last_name': response.body.meta.last_name
          }
          this.show_detail_modal=true
        }, function(response){
          console.log(response);
          console.log("Error");
          alert("No se pudo encontrar la compra")
          this.show_detail_modal=false
          this.sale_code=''
        });
      } catch (e) {
        alert(e)
        this.show_detail_modal=true
        this.sale_code=''
      }
    },
    onSuccess(result){
      console.log("Ok Scan");
      console.log(result);
      var vm = this
      // vm.offers = []
      this.show_camera = false
      // alert(result)
      vm.sale_code = result
      this.find_sale_by_ticket(vm.sale_code)
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
