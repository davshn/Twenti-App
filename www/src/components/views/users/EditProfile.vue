<template >
  <div class="edit_profile">
    <div class="container edit_profile__header">
      <div class="small-1">
        <article class="edit_profile__header__text">
          <img
            src="./src/assets/images/icons/arrow_left.svg"
            @click="$router.back()">
          <span>Editar información</span>
        </article>
      </div>
    </div>
    <div class="small-11 container edit_profile__form">
      <p>Recuerda guardar los cambios que realices</p>
      <div class="edit_profile__form__input_section">
        <label for="">Correo electrónico</label>
        <input type="text"
               name=""
               class="form__input"
               v-model="data.attributes.email"
               @input="changed = true">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">RUT</label>
        <!-- <input type="text"
          data-vv-delay="0"
          name="rut"
          v-validate="'alpha_num|required'"
          class="form__input"
          v-model="data.attributes.rut "
          @input="changed = true">
        <span
          style="color:red; font-size:12px"
          v-if="errors.has('rut')"
          class="showError">{{ errors.first('rut') }}</span> -->
        <div class="new_login__rut_content">
          <input
            data-vv-delay="0"
            name="rut"
            v-validate="'alpha_num|required'"
            class="form__input"
            type="text"
            v-model="data.attributes.rut"
            placeholder="RUT">
          <input type="text"
            data-vv-delay="0"
            name="validador"
            v-validate="'alpha_num|required|length:1'"
            class="form__input"
            v-model="validator "
            @input="changed = true">
        </div>
        <span
          style="color:red; font-size:12px"
          v-show="errors.has('rut')"
          class="showError">{{ errors.first('rut') }}</span>
        <span
          style="color:red; font-size:12px"
          v-show="errors.has('validador')"
          class="showError">{{ errors.first('validador') }}</span>
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Nombre</label>
        <input type="text"
               name=""
               class="form__input"
               v-model="data.attributes.user_info_attributes.name "
               @input="changed = true">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Apellido</label>
        <input type="text"
               name=""
               class="form__input"
               v-model="data.attributes.user_info_attributes.last_name"
               @input="changed = true">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Soy</label>
        <div class="new_login__content--input_buttons">
          <div
            class="button_selector"
            :class="{ active: getUserGender() == 'Female' || getUserGender() == 'Femenino' }"
            :gender="'Female'"
            @click="selectGender()">
            Mujer
          </div>
          <div
            class="button_selector"
            :class="{ active: getUserGender() == 'Male' || getUserGender() == 'Masculino' }"
            :gender="'Male'"
            @click="selectGender()">
            Hombre
          </div>
        </div>
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Teléfono</label>
        <input type="text"
               name=""
               type="number"
               pattern="\d*"
               class="form__input"
               placeholder="Número de teléfono"
               v-model="data.attributes.mobile"
               @input="changed = true">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Fecha de nacimiento</label>
        <input
          data-vv-delay="0"
          name="birthday"
          class="form__input"
          type="text"
          placeholder="DD/MM/AAAA"
          v-model="data.attributes.user_info_attributes.birthday"
          onfocus="(this.type='date')"
          @input="changed = true">
      </div>
      <div class="edit_profile__form__input_section">
        <label for="">Selecciona tu sede:</label>
        <select
          v-model="data.attributes.user_info_attributes.location_id"
          @input="changed = true">
          <option
            :value='null'
            selected
            disabled>Seleccione una sede</option>
          <option
            v-for="location in locations"
            :value="location.id"
            v-if="location.attributes.location_type == 'Centro Deportivo'">{{location.attributes.name}}</option>
          <option value='158'>Otro</option>
        </select>
      </div>
      <!-- <div class="edit_profile__form__input_section">
        <label for="">Ciudad</label>
        <input type="text"
               name="nationality"
               class="form__input"
               placeholder="Ingresa tu ciudad de residencia"
               v-model="data.attributes.user_info_attributes.nationality">
      </div> -->
      <div class="edit_profile__form__input_section">
        <div
          class="new_login__content--login_button small-12"
          :class="{active : changed}"
          @click="updateUser()">
          GUARDAR CAMBIOS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      changed: false,
      validator: '',
      locations: [],
      data: {
        attributes:{
          id: '',
          email: '',
          mobile: '',
          rut: '',
          user_info_attributes: {
            id: '',
            name: '',
            last_name: '',
            // nationality: this.getNationality(),
            gender: '',
            birthday: '',
            location: '',
            location_id: ''
          }
        }
      }
    }
  },
  mounted(){
    console.log("This is te user id " + this.getUserId());
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
    if(this.getUserId() != '' && this.getUserId() != null && this.getUserId() != undefined ){
      try{
          // vm.$http.get(vm.getServer()+"/v1/outlets/my_favorites?page="+vm.actual_page_favourites, {
          this.$http.get("app/locations?page=1&classes=true",
          ).then(function(response){
              this.locations=response.body.data;
          }, function(response){

          })
      }catch(e){

      }
      this.$http.get("app/users/"+this.getUserId(), {
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
      }).then(function(response){
        this.data.attributes.id = response.body.id
        this.data.attributes.email = response.body.data.attributes.email
        this.data.attributes.mobile = response.body.data.attributes.mobile
        if(response.body.data.attributes.rut != null &&
           response.body.data.attributes.rut != undefined){
          this.data.attributes.rut = response.body.data.attributes.rut.slice(0, -1)
          this.validator = response.body.data.attributes.rut.slice(-1)
        }
        this.data.attributes.user_info_attributes = response.body.included[0].attributes;
        this.updateUserMobile(response.body.data.attributes.mobile);
        this.data.attributes.user_info_attributes.id = response.body.included[0].id;
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
    validateAllFields(){
      if(
        data.attributes.user_info_attributes.birthday != getUserBirthday() ||
        data.attributes.user_info_attributes.gender != getUserGender() ||
        data.attributes.user_info_attributes.last_name != getUserLastName() ||
        data.attributes.user_info_attributes.name != getUserName() ||
        data.attributes.email != getUserEmail() ||
        data.attributes.mobile != getUserMobile() ||
        data.attributes.rut != getUserRut()){
        return true
      }else{
        return false
      }
    },
    logOut(){
      this.deleteSession('offers_index', true);
    },
    activeUser(){
      var user = "";
      if(this.getUserName() != ""){
        user =  this.getUserName()+' '+this.getUserLastName();
      }
      else if(this.getUserEmail() != "" && this.getUserEmail() != null){
        user = this.getUserEmail().split('@')[0];
      }else{
        user =this.$t("common.guest");
      }
      return user;
    },
    selectGender(){
      $('.button_selector').removeClass('active');
      $(event.target).addClass('active');
      this.data.attributes.user_info_attributes.gender = $(event.target).attr('gender')
      this.changed = true
    },
    updateUser(){
      try {
        this.$validator.validateAll().then((result) => {
          if (result) {
            var rut = this.data.attributes.rut
            if(this.validator == this.validateRut(rut)){
              this.data.attributes.rut = this.data.attributes.rut + this.validator
              this.$http.put('app/users/update_profile', {
                 data: this.encrypt(this.data).toString()
              }, {
                headers:
                {
                  "Authorization": "Bearer " + this.getUserToken(),
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                }
              }).then(function(response){
                this.data.attributes.rut = this.data.attributes.rut.slice(0, -1);
                this.updateUserEmail(response.body.data.attributes.email);
                this.updateUserName(response.body.included[0].attributes.name);
                this.updateUserLastName(response.body.included[0].attributes.last_name);
                this.updateUserGender(response.body.included[0].attributes.gender);
                this.updateNationality(response.body.included[0].attributes.nationality);
                this.updateUserMobile(response.body.data.attributes.mobile);
                this.updateNotifications(response.body.data.attributes.notifications);
                this.updateLocationUser(response.body.included[0].attributes.location_id);
                this.show_error_modal('Tu perfil se ha actualizado con exito', " ");
                // this.$router.push({name: 'newProfile'});
              }, function(response){
                this.data.attributes.rut = this.data.attributes.rut.slice(0, -1)
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
            }else{
              // alert("El Rut no es correcto, este es el validador correcto " + this.validateRut(rut))
              this.updateShowToast(true)
            }
          }
        });
      } catch (e) {
        this.show_error_modal(e.message);
      }
    }
  }
}
</script>

<style>
</style>
