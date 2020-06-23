<template>
  <article
    class="new_login new_signup "
    style="padding-top: 0">
    <div class="header__loader">
      <app-loader class="header__loader--element"></app-loader>
    </div>
    <section
      class="new_login__content grid-x with_rut__content">
      <section class="coupon__nav" style="padding: 30px 0 0;">
        <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
      </section>
      <p class="notifications__title">Mi cuenta</p>
      <div class="with_rut__content--container" style="width: 100%; padding: 0!important">
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Primer nombre</label>
          <div class="new_login__rut_content">
            <input
              data-vv-delay="0"
              name="nombre"
              v-validate="'alpha_spaces|min:3'"
              class="form__input "
              type="text"
              v-model="data.attributes.first_name"
              placeholder="Primer nombre"
              style="height: 25px;">
              <span
                style="color:red; font-size:12px"
                v-show="errors.has('nombre')"
                class="showError">{{ errors.first('nombre') }}</span>
          </div>
        </div>
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Segundo Nombre</label>
          <input
            data-vv-delay="0"
            name="nombre"
            class="form__input "
            type="text"
            v-model="data.attributes.second_name"
            placeholder="Segundo nombre"
            style="height: 25px;">
        </div>
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Primer apellido</label>
          <div class="new_login__rut_content">
            <input
              data-vv-delay="0"
              name="primer apellido"
              v-validate="'alpha_spaces|min:3'"
              class="form__input "
              type="text"
              v-model="data.attributes.last_name"
              placeholder="Primer apellido"
              style="height: 25px;">
              <span
                style="color:red; font-size:12px"
                v-show="errors.has('nombre')"
                class="showError">{{ errors.first('nombre') }}</span>
          </div>
        </div>
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Segundo apellido</label>
          <div class="new_login__rut_content">
            <input
              data-vv-delay="0"
              name="segundo apellido"
              class="form__input "
              type="text"
              v-model="data.attributes.last_second_name"
              placeholder="Segundo apellido"
              style="height: 25px;">
              <span
                style="color:red; font-size:12px"
                v-show="errors.has('nombre')"
                class="showError">{{ errors.first('nombre') }}</span>
          </div>
        </div>
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Nombre de usuario</label>
          <div class="new_login__rut_content">
            <input
              data-vv-delay="0"
              name="nombre de usuario"
              v-validate="'alpha_spaces|min:3'"
              class="form__input "
              type="text"
              v-model="data.attributes.user_name"
              placeholder="Nombre de usuario"
              style="height: 25px;">
              <span
                style="color:red; font-size:12px"
                v-show="errors.has('nombre')"
                class="showError">{{ errors.first('nombre') }}</span>
          </div>
        </div>

        <div
          class="new_login__content--input_section  small-6"
          style="margin-top: 30px;">
          <label for="">Contraseña</label>
          <input
              name="contraseña"
              v-model="data.attributes.password"
              v-validate="'required|alpha_num|min:6'"
              data-vv-delay="0"
              class="form__input "
              id="user_password"
              type="password"
              placeholder="Contraseña"
              style="height: 25px;">
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
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label class="label-text-signup">Correo electrónico</label>
          <input
            data-vv-delay="0"
            v-validate="'required|email'"
            name="email"
            class="form__input "
            id="validation"
            @input="validation()"
            type="email"
            placeholder="Correo electrónico"
            v-model="data.attributes.email"
            style="height: 25px;">
            <span
              style="color:red; font-size:12px"
              v-show="errors.has('email')"
              class="showError">{{ errors.first('email') }}</span>
        </div>

        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Celular</label>
          <input
            data-vv-delay="0"
            pattern="\d*"
            name="telefono"
            v-validate="'numeric'"
            class="form__input "
            type="number"
            v-model="data.attributes.phone"
            placeholder="Celular"
            style="height: 25px;">
            <span
              style="color:red; font-size:12px"
              v-show="errors.has('telefono')"
              class="showError">{{ errors.first('telefono') }}</span>
        </div>
        <div
          class="new_login__content--input_section small-6"
          style="margin-top: 30px;">
          <label for="">Fecha de nacimiento</label>
          <input
            name="xyz"
            :value="this.date()"
            type="hidden">
          <input
            data-vv-delay="0"
            name="birthday"
            data-vv-as="Birth day"
            class="form__input "
            type="text"
            placeholder="DD/MM/YYYY"
            v-model="data.attributes.birthday"
            onfocus="(this.type='date')"
            style="height: 25px;">
        </div>
      </div>
      <section class="with_rut__container" style="width: 100%; padding: 0!important">
        <div
          class="new_login__content--input_section small-12"
          style="display: flex; align-items: center; justify-content: space-between; width: 100%">
          <div
            class="new_login__content--input_buttons" style="display: flex; align-items: center; justify-content: space-between; width: 100%">
            <p style="font-size: 14px!important;">Género</p>
            <div
              class="button_selector"
              :data-gender="$t('profile.gender_female')"
              @click="selectGender()">
              Femenino
            </div>
            <div
              class="button_selector active"
              :data-gender="$t('profile.gender_male')"
              @click="selectGender()">
              Masculino
            </div>
          </div>
        </div>

        <div
          class="new_login__content--login_button small-12 active">
          Guardar
        </div>
      </section>

    </section>
  </article>
</template>

<script>
    export default{
        data(){
            return {
                charging: false,
                finded_rut: false,
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
                    phone: '3102345678',
                    email: 'juan123@gmail.com',
                    first_name: "Juan",
                    second_name:"Carlos",
                    last_name: "Ramirez",
                    last_second_name: "Castro",
                    user_name:"Juan123",
                    genre: "Male",
                    birthday: "12/08/1980"
                  }
                }
            }
        },
        methods: {
          validateFields(){
            if(this.data.attributes.password != '' &&
              this.data.attributes.phone != '' &&
              this.data.attributes.email != '' &&
              this.data.attributes.first_name != "" &&
              this.data.attributes.second_name !="" &&
              this.data.attributes.last_name != "" &&
              this.data.attributes.last_second_name != "" &&
              this.data.attributes.user_name !="" &&
              this.data.attributes.genre != "" &&
              this.data.attributes.birthday != ""){
              return true
            } else {
              return false
            }
          },
          findRut(){
            console.log(this.finded_rut);
            console.log("Change finded rut");
            var rut = this.data.attributes.rut;
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
              this.charging = true
              console.log(this.charging);
              try {
                this.$http.get('app/users/check_user_in_deporwin', {
                  headers: {
                    "X-Device-ID" : this.getDeviceId(),
                    "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                  },
                  params:{
                    rut: this.data.attributes.rut
                  }
                }).then(function(response){
                  this.charging = false
                  this.finded_rut = true
                  console.log(this.finded_rut);
                  if(response.body['Personas'].length > 0){
                    var data = response.body['Personas'][0]
                    this.data.attributes.email = data["Email"]
                    this.data.attributes.user_info_attributes.phone = data["TelefonoMovil"]
                    this.data.attributes.user_info_attributes.name = data["Nombre"]
                    this.data.attributes.user_info_attributes.last_name = data["Apellido1"]
                    // this.data.attributes.user_info_attributes.gender = data["Apellido1"]
                    this.data.attributes.user_info_attributes.birthday = data["FechaNacimiento"]
                    this.validation()
                  }else{
                    this.show_error_modal("No te hemos encontrado en los registros de sportlife", "Lo sentimos")
                  }
                  this.data.attributes.rut = this.data.attributes.rut.substring(0, this.data.attributes.rut.length - 1);
                }, function(response){
                  this.charging = false
                  this.show_error_modal("No te hemos encontrado en los registros de sportlife", "Lo sentimos")
                  this.finded_rut = true
                  this.data.attributes.email = ""
                  this.data.attributes.user_info_attributes.phone = ""
                  this.data.attributes.user_info_attributes.name = ""
                  this.data.attributes.user_info_attributes.last_name = ""
                  this.data.attributes.user_info_attributes.birthday = ""
                  this.data.attributes.rut = this.data.attributes.rut.substring(0, this.data.attributes.rut.length - 1);
                })
              } catch (e) {

              }
            }
          },
          returnBack(){
            console.log(this.finded_rut);
            console.log("Return back rut");
            this.finded_rut = false
          },
            selectGender(){
              $('.button_selector').removeClass('active');
              $(event.target).addClass('active');
              this.data.attributes.genre = $(event.target).attr('data-gender')
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
              if(this.validateFields()){
                this.data.attributes["password-confirmation"] = this.data.attributes.password
                try{
                  console.log('entra a validator')
                  this.$http.post("create_user", {
                      data: this.data
                  // }, {
                    // headers: {
                    //   "X-Device-ID" : this.buildDeviceId(),
                    //   "FCM-ID" : this.getFcmId(),
                    //   "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                    // }
                  }).then(function(response){
                    console.log(response);
                    console.log("Usuario creado");
                    this.updateLogin(false)
                    this.$router.push({name: 'categories'})
                  }, function(response){
                    console.log(response);
                    console.log("Error");
                    this.updateLogin(true)
                    alert("El usuario no pudo ser creado, revise la información suministrada")
                  });
                }catch(e){
                  this.updateLogin(true)
                  alert("El usuario no pudo ser creado, revise la información suministrada")
                }
              }else{
                this.updateLogin(true)
                alert("Revise los campos solicitados")
              }
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
                if(re.test(this.data.attributes.email)){
                  // this.data.attributes.email = $("#validation").val();
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

        }
    }
</script>
