<template>
  <article class="input_rut">
    <section class="input_rut__container input_rut__container_code">
      <div class="input_rut__container--header">
        <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/rut_pattern%402x.png" alt="">
        <span class="input_rut__close" @click="updateCodeModal(false)">Cerrar</span>
      </div>
      <div class="input_rut__container--content">
        <p
          class="input_rut__title"
          v-if="validated_code">
          Código promocional
        </p>
        <p class="input_rut__subtitle">
          {{
            validated_code ?
              'Ingresa este código en la página web del proveedor' :
              'Ingresa la palabra OK y podrás ver tu código promocional para esta oferta'
          }}
        </p>
        <p class="input_rut__random_code">
          <!-- {{validated_code ? promocional_code : random_code}} -->
          {{validated_code ? promocional_code : "ok"}}
        </p>
        <div >
          <div
            class="input_rut__container--input_section input_rut__container--code"
            v-if="!validated_code">
            <input
              type="text"
              data-vv-delay="0"
              name="validator_code"
              class="form__input"
              :value="validator_code"
              @keypress="validator_code = $event.target.value; changed = true;"
              @input="validator_code = $event.target.value; changed = true;"

              placeholder="Ingresa el texto validador">
            <span
              v-if="changed && !validated_code"
              style="padding-top:23px; padding-left:5px"
              class="showError">El validador no coincide</span>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      changed:  false,
      validator_code: '',
      validated_code: false,
      promocional_code:''
    }
  },
  props:{
    code:{
      type: String
    },
    random_code: {
      type: String
    },
    offer_id: {
      type: String
    }
  },
  watch: {
    validator_code(){
      this.validateCode()
    }
  },
  methods: {
    confirmRedeemption(){
      var vm = this
      console.log(vm.offer_id);
      navigator.geolocation.getCurrentPosition(vm.findPosition);
      try{
        var temp = {
          offer_id: Number(vm.offer_id)
        }
        vm.$http.post("app/offers/redeem_by_code",{
          data: vm.encrypt(temp).toString()
        },{
          headers:
          {
              "Authorization": "Bearer " + vm.getUserToken(),
              "X-Device-ID" : vm.getDeviceId(),
              "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
          }
        }
        ).then(function(response){
          console.log(response);
          this.validated_code = true
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          this.promocional_code=response.body.data
        }, function(response){
          this.show_error_modal(response.body.errors[0].details);
        })
      }catch(e){
          vm.show_error_modal(e.message);
      }
    },
    validateCode(){
      if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
        // if (this.validator_code == this.random_code){
        console.log("CODIGONUEVO");
        console.log(this.validator_code);
        if (this.validator_code.toLowerCase()=="ok"){
          this.confirmRedeemption();
        }else{
          this.validated_code = false
        }
      }else{
        this.$router.push({name: 'log_in'})
      }
    },
  }
}
</script>
