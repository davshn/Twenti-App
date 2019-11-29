<template>
  <article class="new_login new_signup">
    <div class="header__loader">
      <app-loader class="header__loader--element"></app-loader>
    </div>
    <section
      class="new_login__header grid-x">
      <div
        @click="redirect_back();">
          <svg-arrow-left></svg-arrow-left>
      </div>
    </section>
    <section
      class="new_login__client_logo grid-x">
      <img
        src="https://s3-us-west-2.amazonaws.com/karrottsportlife/logo.svg"
        class="home__image_home">
    </section>
    <section
      class="new_login__content grid-x">
      <p
        class="new_login__content--title">Cúentanos más de ti,</p>
      <p
        class="new_login__content--text">
        Queremos encontrar las mejores ofertas de acuerdo a tus preferencias
        <br>
        Los campos marcados con asterisco (<span class="new_login__content--text__red">*</span>) son obligatorios
      </p>
      <div
        class="new_login__content--input_section small-12">
        <label for="">RUT</label>
        <div class="new_login__rut_content">
          <input
            data-vv-delay="0"
            name="rut"
            v-validate="'alpha_num'"
            class="form__input"
            type="text"
            v-model="data.attributes.rut"
            placeholder="RUT">
          <input type="text"
            data-vv-delay="0"
            name="validador"
            v-validate="'alpha_num|length:1'"
            class="form__input"
            v-model="validator ">
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
      <div
        class="new_login__content--input_section small-12">
        <label class="label-text-signup">Correo electrónico<span class="new_login__content--text__red">*</span></label>
        <input
          data-vv-delay="0"
          v-validate="'required|email'"
          name="email"
          class="form__input"
          id="validation"
          @input="validation()"
          type="email"
          placeholder="Correo electrónico">
          <span
            style="color:red; font-size:12px"
            v-show="errors.has('email')"
            class="showError">{{ errors.first('email') }}</span>
      </div>

      <div class="new_login__content--input_section  small-12">
        <label for="">Contraseña (6 caracteres)<span class="new_login__content--text__red">*</span></label>
        <input
            name="contraseña"
            v-model="data.attributes.password"
            v-validate="'required|alpha_num|min:6'"
            data-vv-delay="0"
            class="form__input"
            id="user_password"
            type="password"
            placeholder="Contraseña">
            <span
              style="color:red; font-size:12px"
              v-show="errors.has('contraseña')"
              class="showError">{{ errors.first('contraseña') }}</span>
        <img
            :src="img_src"
            alt="Show PIN"
            @click="toggle_password_view();"
            class="form__icon--eye input_eye_logo"
            id="visibility"/>

      </div>
      <div
        class="new_login__content--input_section small-12">
        <label for="">Nombre</label>
        <input
          data-vv-delay="0"
          name="nombre"
          v-validate="'alpha_spaces|min:3'"
          class="form__input"
          type="text"
          v-model="data.attributes.user_info_attributes.name"
          placeholder="Nombre">
          <span
            style="color:red; font-size:12px"
            v-show="errors.has('nombre')"
            class="showError">{{ errors.first('nombre') }}</span>
      </div>
      <div
        class="new_login__content--input_section small-12">
        <label for="">Apellido</label>
        <input
          data-vv-delay="0"
          v-validate="'alpha_spaces|min:3'"
          name="apellido"
          class="form__input"
          type="text"
          v-model="data.attributes.user_info_attributes.last_name"
          placeholder="Apellido">
          <span
            style="color:red; font-size:12px"
            v-show="errors.has('apellido')"
            class="showError">{{ errors.first('apellido') }}</span>
      </div>
      <div
        class="new_login__content--input_section small-12">
        <label for="">Soy</label>
        <div
          class="new_login__content--input_buttons">
          <div
            class="button_selector"
            :data-gender="$t('profile.gender_female')"
            @click="selectGender()">
            Mujer
          </div>
          <div
            class="button_selector"
            :data-gender="$t('profile.gender_male')"
            @click="selectGender()">
            Hombre
          </div>
        </div>
      </div>
      <div
        class="new_login__content--input_section small-12">
        <label for="">Teléfono</label>
        <input
          data-vv-delay="0"
          pattern="\d*"
          name="telefono"
          v-validate="'numeric'"
          class="form__input"
          type="number"
          v-model="data.attributes.user_info_attributes.phone"
          placeholder="Número de teléfono">
          <span
            style="color:red; font-size:12px"
            v-show="errors.has('telefono')"
            class="showError">{{ errors.first('telefono') }}</span>
      </div>
      <div
        class="new_login__content--input_section small-12">
        <label for="">Fecha de nacimiento</label>
        <input
          name="xyz"
          :value="this.date()"
          type="hidden">
        <input
          data-vv-delay="0"
          name="birthday"
          data-vv-as="Birth day"
          class="form__input"
          type="text"
          placeholder="DD/MM/AAAA"
          v-model="data.attributes.user_info_attributes.birthday"
          onfocus="(this.type='date')"
          >
      </div>
      <div class="new_login__content--input_section small-12">
        <label for="">Sede<span class="new_login__content--text__red">*</span></label>
        <select
            name="sede"
            v-model="data.attributes.user_info_attributes.location_id"
            v-validate="'required'"
            :style="data.attributes.user_info_attributes.location_id=='' ? 'color:#dcdee2;' : ''">
          <option value='' selected disabled>Selecciona tu sede</option>
          <option v-for="location in locations" :value="location.id">{{location.attributes.name}}</option>
        </select>
        <span
          style="color:red; font-size:12px"
          v-show="errors.has('sede')"
          class="showError">{{ errors.first('sede') }}</span>
      </div>
      <p class="new_signup__terms_and_conditions">
        Al tocar el botón “Crear cuenta” aceptas <span @click="updateTermsAndConditions(true)">términos y condiciones</span> de uso.</p>
      <div
        class="new_login__content--login_button small-12 active"
        v-if="email_checked &&
              data.attributes.password != '' &&
              data.attributes.user_info_attributes.location_id!=''"
        @click="submit_form()">
        Crear cuenta
      </div>
      <div
        class="new_login__content--login_button small-12"
        v-else
        @click="$validator.validateAll()">
        Crear cuenta
      </div>
    </section>
  </article>
</template>

<script>
    import { countries } from '../../../assets/js/countries.js'
    export default{
        data(){
            return {
                locations: [],
                show_password: true,
                focus: false,
                email_checked: false,
                mobile_checked: false,
                img_src: './src/assets/images/icons/visibility.svg',
                countries: [],
                country_selected: {
                    code: 'CO',
                    dial_code: '+57',
                    name: 'Emiratos Árabes Unidos'
                },
                validator: '',
                password: 'password',
                pass: '',
                validate_rut: false,
                attributes: {
                    password: '',
                    'password-confirmation': '',
                    mobile: '',
                    email: '@gmail.com'
                },
                data: {
                    attributes: {
                        password: '',
                        'password-confirmation': '',
                        mobile: '',
                        email: '',
                        rut: '',
                        user_info_type: 'Client',
                        user_info_attributes:{
                          name: "",
                          last_name: "",
                          gender: "",
                          birthday: "",
                          location_id: ""
                        }
                    }
                }
            }
        },
        methods: {
            selectGender(){
              $('.button_selector').removeClass('active');
              $(event.target).addClass('active');
              this.data.attributes.user_info_attributes.gender = $(event.target).attr('data-gender')
            },
            toggle_password_view(){
                this.show_password = !this.show_password;
            },
            toggle_modal(){
                $(this.$el).find("#modal_parent").css("display","block");
            },
            add_password(event,num) {
                if($(event.target).val().length > 1){
                    $(event.target).val($(event.target).val()[0]);
                }
                // Added from walmart
                if($(event.target).val()){
                    if(this.attributes.password.length <= num){
                        this.attributes.password += $(event.target).val();
                    }
                    if($(event.target).next().prop("tagName") != "IMG"){
                        $(event.target).next().focus().click();
                    }
                }else{
                    this.attributes.password = this.attributes.password.slice(0, num)
                        + this.attributes.password.slice(num+1);
                    $(event.target).prev().focus().click();
                }
            },
            submit_form(){
              console.log(this.getUserRegistrationId());
              console.log(this.data.attributes);
              var rut = this.data.attributes.rut;
              if(this.data.attributes.user_info_attributes.location_id==''){
                this.data.attributes.user_info_attributes.location_id=null
              }
              this.$validator.validateAll().then((result) => {
                if(rut != ''){
                  if(this.validator == this.validateRut(rut)){
                    this.data.attributes.rut = this.data.attributes.rut + this.validator
                    this.validate_rut = true
                  } else {
                    this.validate_rut = false
                    // alert("El Rut no es correcto, este es el validador correcto " + this.validateRut(rut))
                    this.updateShowToast(true)
                  }
                }else{
                  this.validate_rut = true
                  this.data.attributes.rut = null
                }

                if(this.validate_rut){
                  try{
                      if (result) {
                        console.log('entra a validator')
                        this.$http.post("users", {
                            data: this.encrypt(this.data).toString()
                        }, {
                          headers: {
                            "X-Device-ID" : this.buildDeviceId(),
                            "FCM-ID" : this.getFcmId(),
                            "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                          }
                        }).then(function(response){
                          if(response.body.meta != undefined && response.body.meta != null){
                            if(response.body.meta.uuid != undefined &&
                               response.body.meta.uuid != null){
                              this.updateUserIdEncrypt(response.body.meta.uuid);
                            }
                            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                              this.checkToken(response.body.meta.authentication_token)
                            }
                            this.updateUserId(response.body.data.id)
                            this.updateUserEmail(response.body.data.attributes.email)
                            this.updateUserMobile(response.body.data.attributes.mobile)
                            this.updateUserName(response.body.included[0].attributes.name)
                            this.updateUserLastName(response.body.included[0].attributes.last_name)
                            this.updateUserRut(response.body.data.attributes.rut)
                            this.updateLocationUser(response.body.included[0].attributes.location_id)
                            this.updateUserInfoId(response.body.included[0].id);
                            this.create_user_db(this, this.getDB(), response);
                            this.$router.push({name: 'offers_index'})
                          }
                        }, function(response){
                          if(response.body.meta != undefined && response.body.meta != null){
                            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                              this.checkToken(response.body.meta.authentication_token)
                            }
                          }
                          if(typeof response.body.errors[0].details != "object"){
                            this.data.attributes.rut = this.data.attributes.rut.slice(0, -1);
                            this.show_error_modal(response.body.errors[0].details);
                          }else{
                            let message = []
                            for(var key in response.body.errors[0].details){
                              message.push(response.body.errors[0].details[key])
                            }
                            if(this.data.attributes.rut != '' &&
                               this.data.attributes.rut != undefined &&
                               this.data.attributes.rut != null){
                              this.data.attributes.rut = this.data.attributes.rut.slice(0, -1);
                            }
                            this.show_error_modal(message);
                          }
                        });
                    }
                  }catch(e){
                    this.show_error_modal(e.message);
                  }
                }
              });
            },
            create_email(array){
                var event = array[0];
                var num = array[1];
                switch(num){
                    case 1:
                        var email = this.attributes.email;
                        this.attributes.email = $(event).val() +
                            email.slice(email.indexOf('@'), email.length);
                        break;
                    case 2:
                        var email = this.attributes.email;
                        this.attributes.email =
                            email.slice(0, email.indexOf('@')+1) +
                            $(event).val();
                        if(email.indexOf('.') >= 0){
                            this.attributes.email +=
                                email.slice(email.indexOf('.'), email.length);
                        }
                        break;
                    case 3:
                        var email = this.attributes.email;
                        if(this.attributes.email.indexOf('.') >= 0){
                            this.attributes.email =
                                email.slice(0, email.indexOf('.')) +
                                $(event).val();
                        }else{
                            this.attributes.email += $(event).val();
                        }
                        break;
                    default:
                        break;
                }
            },
            validation(){
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(re.test($("#validation").val())){
                  this.data.attributes.email = $("#validation").val();
                  this.email_checked = true;
                  this.mobile_checked = false;
                }
            },
            redirect_back(){
                window.history.back();
            },
            date(){
              let today = new Date();
              let last = 1000 * 60 * 60 * 24 * 1825;
              let sub = today.getTime() - last;
              let fe = new Date(sub);
              let f = (fe.getFullYear()+"-"+(fe.getMonth()+1)+"-"+fe.getDate());
              return f;
            }
        },
        watch: {
            show_password(val){
                if(this.show_password){
                    this.img_src = './src/assets/images/icons/visibility.svg';
                    $("#user_password").prop("type",'password');
                }else{
                    this.img_src = './src/assets/images/icons/visibility_off.svg';
                    $("#user_password").prop("type",'text');
                }
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
          console.log(typeof this.date());
            // this.setupPush();
            // this.init_db();
            try{
                // vm.$http.get(vm.getServer()+"/v1/outlets/my_favorites?page="+vm.actual_page_favourites, {
                this.$http.get("app/locations?page=1&classes=true",
                ).then(function(response){
                    this.locations=response.body.data.filter(location => location.attributes.location_type == 'Centro Deportivo');
                }, function(response){

                })
            }catch(e){

            }
            // this.check_user();
            // var headerHeight = this.$el.children[0].offsetHeight;
            // this.resize_body(this.$el.children[1], this.$el.children[1], [
            //     headerHeight
            // ]);
            // for(var key in countries){
            //     this.countries.push(countries[key]);
            // }
            // var maxHeight = $("#content").children().first().height() +
            //     this.$el.children[0].clientHeight;
            // if(maxHeight < document.documentElement.clientHeight){
            //     $("#content").children().first().addClass("center");
            // };
            // this.data.attributes.email = this.getUserEmailSignup();
            // this.data.attributes.mobile = this.getUserMobileSignup();
            // this.data.attributes.password = this.getUserPassword();
            var vue = this;
            $("#validation").focusin(function(){
                vue.focus = true;
            })
            $("#validation").focusout(function(){
                vue.focus = false;
            })
        }
    }
</script>
