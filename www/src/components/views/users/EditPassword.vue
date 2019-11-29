<template >
  <div class="edit_profile">
    <div class="container edit_profile__header">
      <div class="small-1">
        <article class="edit_profile__header__text">
          <img src="./src/assets/images/icons/arrow_left.svg" @click="$router.push({name:'offers_index'})">
          <span>Editar Contraseña</span>
        </article>
      </div>
    </div>

    <div class="small-11 container edit_profile__form">
      <div class="edit_profile__form__input_section">
        <label for="">Contraseña actual</label>
        <input type="password"
               name=""
               class="form__input"
               v-model="current_password"
               placeholder="Contraseña actual">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Nueva contraseña</label>
        <input type="password"
               name="contraseña"
               v-validate="'required|alpha_num|min:6'"
               class="form__input"
               v-model="password"
               placeholder="Ingresa tu nueva contraseña">
               <span style="color:red; font-size:12px" v-show="errors.has('contraseña')" class="showError">{{ errors.first('contraseña') }}</span>
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Confirma tu nueva contraseña</label>
        <input type="password"
               name="confirmar contraseña"
               v-validate="'required|alpha_num|min:6'"
               class="form__input"
               v-model="password_confirmation"
               placeholder="Confirma tu nueva contraseña">
               <span style="color:red; font-size:12px" v-show="errors.has('confirmar contraseña')" class="showError">{{ errors.first('confirmar contraseña') }}</span>
      </div>

      <div class="edit_profile__form__input_section">
        <div
          class="new_login__content--login_button small-12"
          @click="updatePassword()"
          :class="{'active' : valid_form }">
          GUARDAR CONTRASEÑA
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data(){
    return{
      data: {
        attributes:{
          current_password: '',
          password: '',
          password_confirmation: ''
        }
      },
      current_password: '',
      password: '',
      password_confirmation: '',
      valid_current_password: false,
      valid_password: false,
      valid_password_confirmation: false,
      valid_form: false
    }
  },
  mounted(){
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
  },
  methods: {
    checkPassword(){
      if(this.password == this.password_confirmation){
        return true
      }else{
        this.show_error_modal("Las contraseñas no coinciden");
        this.password = "";
        this.password_confirmation = "";
        this.valid_password = false;
        this.valid_password_confirmation = false;
        this.validateForm()
      }
    },
    validateForm(){
      if(this.valid_current_password &&
         this.valid_password &&
         this.valid_password_confirmation){
        this.valid_form = true
      }else{
        this.valid_form = false
      }
    },
    updatePassword(){
      if($(event.target).hasClass('active') && this.checkPassword()){
        this.data.attributes.current_password = this.current_password
        this.data.attributes.password = this.password
        this.data.attributes.password_confirmation = this.password_confirmation
        try {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.$http.put('users/update_password', {
                data: this.encrypt(this.data).toString()
              },
              {
                headers: {
                  // "Accept-Language": "es",
                  "Authorization": "Bearer " + this.getUserToken(),
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                }
              }).then(function(response){
                console.log(response);
                if(response.body.meta != undefined && response.body.meta != null){
                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                    this.checkToken(response.body.meta.authentication_token)
                  }
                }
                history.go(-1)
                this.show_error_modal("Se ha actualizado tu contraseña", " ", 'Cerrar', false, false)
              }, function(response){
                console.log(response.body.errors);
                this.show_error_modal(response.body.errors[0].details);
              });
            }
          });
        } catch (e) {
          this.show_error_modal(e.message);
        }
      }
    }
  },
  watch:{
    current_password(){
      if(this.current_password != '' && this.current_password.length > 5){
        this.valid_current_password = true
        this.validateForm()
      }
    },
    password(){
      if(this.password != '' && this.password.length > 5){
        this.valid_password = true
        this.validateForm()
      }
    },
    password_confirmation(){
      if(this.password_confirmation != '' && this.password_confirmation.length > 5){
        this.valid_password_confirmation = true
        this.validateForm()
      }
    }
  }
}
</script>

<style>
</style>
