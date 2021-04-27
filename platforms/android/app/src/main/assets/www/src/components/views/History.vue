<template>
  <article class="notifications">
    <section class="coupon__nav" style="padding: 30px 0 0; text-align: left!important">
      <img
        style="margin:none !important"
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
    </section>
    <p class="notifications__title">Historial de compras</p>
    <section
      class="notifications__section"
      v-for="(coupon, index) in purchaces" v-if="charged">
      <div class="notifications__section--image">
        <img :src="coupons.find(element=> element.id == coupon.offer_id).image.url" alt="">
      </div>
      <div class="notifications__section--info">
        <p
          class="notifications__section--title"
          v-html="coupons.find(element=> element.id == coupon.offer_id).title"></p>
        <p
          class="notifications__section--text"
          v-html="coupons.find(element=> element.id == coupon.offer_id).description"></p>
        <section class="notifications__section--container">
          <div
            class="notifications__section--button history_button"
            @click="$router.push({name:'coupon', params:{ id:coupon.offer_id}})"
            v-if="coupons.find(element=> element.id == coupon.offer_id).published">
            <p>Ver descuento</p>
          </div>
          <div
            class="notifications__section--button history_button"
            @click="generate_qr(coupon.ticket_id)"
            v-if="!coupon.validate_sale">
            <p>Validar Compra</p>
          </div>
          <div
            style="background-color:#E0E0E0!important "
            class="notifications__section--button history_button"
            v-else-if="coupon.validate_sale">
            <p style="color: #9E9E9E!important">Compra Validada</p>
          </div>
        </section>

      </div>
    </section>
    <section v-if="show_qr_modal" class="sale_modal">
      <div class="sale_modal__content">
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
      show_qr_modal:false,
      charged: false,
      purchaces:[],
      coupons:[
      {
        title: "Éxito",
        text: "Hasta 20% de descuento en computadores y tablets de la marca Lenovo",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio1.png",
        link: "coupon",
        review: true,
        visible: true
      },
      {
        title: "Falabella",
        text: "Hasta 20% de descuento en zapatos para niños",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio2.png",
        link: "coupon",
        review: false,
        visible: true
      },
      {
        title: "Farmatodo",
        text: "Hasta 15% de descuento en productos de cuidado personal",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/farma.png",
        link: "coupon",
        review: false,
        visible: true
      },
      {
        title: "Falabella",
        text: "Hasta 10% de descuento en ropa deportiva para mujer",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio2.png",
        link: "coupon",
        review: false,
        visible: false
      },


      ]
    }
  },
  mounted(){
    this.find_my_purchaces()
  },
  methods:{
    close_modal(){
      this.purchaces = []
      this.find_my_purchaces()
      this.qr = true;
      this.show_qr_modal=false;
    },
    generate_qr(value){
      var vm = this;
      this.show_qr_modal = true
      setTimeout(function(){
        var qrcode = new QRCode(document.getElementById("qrvalidate"));
        qrcode.makeCode(value.toString());
        vm.qr = !vm.qr;
        $("canvas").width("90%");
        $("canvas").css({"margin-left":"auto", "margin-right": "auto"});
        $("#qrvalidate img").css({"margin-left":"auto", "margin-right": "auto"});
      }, 1000);
      // qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":'+this.offer.id+'}}');
    },
    find_my_purchaces(){
      var vm = this
      try{
            this.$http.get("find_my_purchaces?id="+this.getUserId(), {
                headers: {
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                }

            }).then(function(response){
                console.log(response);
                this.purchaces = response.body.data
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
                // this.errors_handler(response);
            });
        }catch(e){
          this.show_error_modal(e.message);
            // this.errors_handler(e.message);
        }
    }
  }
}
</script>
