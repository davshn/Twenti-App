<template>
  <article class="input_rut">
    <section class="input_rut__container">
      <div class="input_rut__container--header">
        <!-- <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/rut_pattern%402x.png" alt=""> -->
        <img src="./src/assets/images/backgrounds/rut_pattern@2x.png" alt="">
        <span class="input_rut__close" @click="updateRutValidator(false)">Skip</span>
      </div>
      <div class="input_rut__container--content">
        <p class="input_rut__subtitle">Actualiza tu RUT</p>
        <p class="input_rut__title">
          Ingresando tu RUT recibirás premios y beneficios exclusivos como usuarios VIP
        </p>
        <div >
          <label for="">ingresa tu RUT:</label>
          <div class="input_rut__container--input_section">
            <input type="number"
              data-vv-delay="0"
              name="rut"
              v-validate="'numeric|required'"
              class="form__input"
              v-model="data.attributes.rut "
              @input="changed = true"
              placeholder="RUT">
            <p class="divisor">-</p>
            <input type="text"
              data-vv-delay="0"
              name="validador"
              v-validate="'alpha_num|required|length:1'"
              class="form__input"
              v-model="validator "
              @input="changed = true">
            <span
              v-if="errors.has('rut')"
              class="showError">{{ errors.first('rut') }}</span>
            <span
              v-else-if="errors.has('validador')"
              class="showError">{{ errors.first('validador') }}</span>
          </div>
          <div
            class="input_rut__button"
            :class="{active : changed && !errors.any()}"
            @click="updateUser()">
            GUARDAR
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
      validator: '',
      data: {
        attributes:{
          id: this.getUserId(),
          email: this.getUserEmail(),
          mobile: this.getUserMobile(),
          rut: '',
          user_info_attributes: {
            id: this.getUserInfoId(),
            name: this.getUserName(),
            last_name: this.getUserLastName(),
            gender: this.getUserGender()
          }
        }
      }
    }
  },
  mounted(){
    console.log("Este es el token: " + this.getUserToken());
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
    if(this.getUserId() != '' && this.getUserId() != null && this.getUserId() != undefined ){
      this.$http.get("app/users/"+this.getUserId(), {
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
        if(response.body.data.attributes.rut != '' &&
           response.body.data.attributes.rut != null &&
           response.body.data.attributes.rut != undefined){
            this.updateUserRut(response.body.data.attributes.rut)
            this.updateRutValidator(false)

        } else {
          this.data.attributes.id = response.body.id
          this.data.attributes.email = response.body.data.attributes.email
          this.data.attributes.mobile = response.body.data.attributes.mobile
          this.data.attributes.rut = response.body.data.attributes.rut
          this.data.attributes.user_info_attributes = response.body.included[0].attributes;
          this.updateUserMobile(response.body.data.attributes.mobile);
          this.data.attributes.user_info_attributes.id = response.body.included[0].id;
        }
      }, function(response){
        if (response.status==401) {
          // this.show_error_modal(response.body.errors[0].details, "Un momento...");
          this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
        }else{
          this.show_error_modal(response.body.errors[0].details);
        }
          // this.errors_handler(response);
      })
    }
  },
  methods: {
    updateUser(){
      var rut = this.data.attributes.rut.toString()
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
      if(this.validator.toUpperCase() == this.validateRut(rut)){
        this.data.attributes.rut = this.data.attributes.rut + this.validator.toUpperCase()
        console.log(this.data);
        try {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.$http.put('app/users/update_profile', {
                 data: this.encrypt(this.data).toString()
              }, {
                headers:
                {
                  "Authorization": "Bearer " + this.getUserToken(),
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                }
              }).then(function(response){
                this.updateUserRut(response.body.data.attributes.rut)
                this.updateRutValidator(false)
                this.$router.push({name: 'offers_index'});
              }, function(response){
                if (response.status==401) {
                  // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                  this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                }else{
                  if(typeof response.body.errors[0].details != "object"){
                    this.show_error_modal(response.body.errors[0].details);
                  }else{
                    let message = []
                    for(var key in response.body.errors[0].details){
                      message.push(response.body.errors[0].details[key])
                    }
                    this.show_error_modal(message);
                  }
                }
                // this.show_error_modal(response.body.errors[0].details);
              });
            }
          });
        } catch (e) {
          this.show_error_modal(e.message);
        }
      }else{
        // alert("El Rut no es correcto, este es el validador correcto " + this.validateRut(rut))
        this.updateShowToast(true)
      }

    }
  }
}
</script>
