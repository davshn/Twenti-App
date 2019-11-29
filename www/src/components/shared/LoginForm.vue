<template>
  <article
    class="new_login">
    <div class="header__loader">
      <app-loader class="header__loader--element"></app-loader>
    </div>
    <section
      class="new__login__header grid-x">
      <div
        class="cell shrink">
        <div
          @click="redirect_back();">
            <svg-arrow-left></svg-arrow-left>
        </div>
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
        class="new_login__content--title small-12">¡Bienvenido!</p>
      <p
        class="new_login__content--text small-12">
        Por favor inicia sesión para continuar
      </p>
      <div
        class="new_login__content--input_section small-12">
        <label class="label-text">Correo electrónico o RUT</label>
        <input
          data-vv-delay="0"
          v-validate="'required'"
          name="user"
          class="form__input"
          id="validation"
          @input="validation()"
          type="text"
          placeholder="Correo electrónico o RUT">
      </div>
      <div class="new_login__content--input_section  small-12">
        <label for="">Contraseña</label>
        <input
            name="password"
            v-model="data.attributes.password"
            v-validate="'required'"
            data-vv-delay="0"
            class="form__input"
            required
            id="user_password"
            minlength="6"
            type="password"
            placeholder="Contraseña">
        <img
            :src="img_src"
            alt="Show PIN"
            @click="toggle_password_view();"
            class="form__icon--eye input_eye_logo"
            id="visibility"/>

      </div>
      <span
        class="new_login__content--forget_password">
        <a @click="$router.push({name: 'recoverpassword'})">Olvidé mi contraseña</a>

      </span>
      <div
        class="new_login__content--login_button small-12"
        :class="{'active': (email_checked || rut_checked) && data.attributes.password != '' }"
        @click="submit_form()">
        Ingresar
      </div>
    </section>
    <section class="new_login__links">
      <p>
        ¿No tienes una cuenta aún? <span @click="$router.push({name: 'sign_up'})">Regístrate</span>
      </p>
    </section>
  </article>
</template>

<script>
export default{
  data(){
    return {
      img_src: './src/assets/images/icons/visibility.svg',
      show_password: true,
      focus: false,
      email_checked: false,
      rut_checked: false,
      validate_form: false,
      data: {
        attributes: {
          email: '',
          rut: '',
          password: ''
        }
      }
    }
  },
  methods: {
    redirect_back(){
      this.$router.back();
    },
    // validateBeforeSubmit () {
    //   this.$validator.validateAll().then(result => {
    //     if (result) {
    //       this.submit_form();
    //       return;
    //     }
    //     $('.is-danger').animateCss('shake');
    //   });
    // },
    toggle_password_view () {
      this.show_password = !this.show_password;
    },
    submit_form () {
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
      if($(event.target).hasClass('active')){
        if(this.rut_checked){
          this.data.attributes.rut = this.data.attributes.rut.replace(/-/g, '').toUpperCase()
        }
        try{
          console.log("Device ID");
          console.log(this.buildDeviceId());
          if(this.data.attributes.password != "" &&
            (this.data.attributes.email != "" || this.data.attributes.rut != "") ){
            this.$http.post("users/sign_in", {
              data: this.encrypt(this.data).toString()
            }, {
              headers: {
                "X-Device-ID" : this.buildDeviceId(),
                "FCM-ID" : this.getFcmId(),
                "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
              }
            }).then(function(response){
                if(response.body.meta != undefined && response.body.meta != null){
                  if(response.body.meta.uuid != undefined &&
                     response.body.meta.uuid != null){
                    this.updateUserIdEncrypt(response.body.meta.uuid);
                  }
                  if(response.body.meta.authentication_token != undefined &&
                    response.body.meta.authentication_token != null){
                    this.checkToken(response.body.meta.authentication_token)
                    // this.deleteSession('home', false);
                    this.create_user_db(this, this.getDB(), response);
                  }
                  if(response.body.data.attributes.user_info_type == "Agent"){
                    this.updateRole(response.body.data.attributes.user_info_type)
                    this.updateAgentId(response.body.data.attributes.user_info_id)
                    this.$router.push({name: 'waiter_index'})
                  } else {
                    this.updateUserInfoId(response.body.included[0].id);
                    this.updateUserId(response.body.data.id);
                    if(response.body.included[0].attributes.picture.url != null){
                      this.updateProfilePicture(this.getServerImage() + response.body.included[0].attributes.picture.thumb.url)
                    }
                    this.$router.push({name: 'offers_index'})
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
          }else{
            this.show_error_modal(this.$t("common.required_fields"));
          }
        }catch(e){
          this.show_error_modal(e.message);
        }
      }
    },
    validation(){
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(re.test($("#validation").val())){
        this.data.attributes.email = $("#validation").val().toLowerCase();
        this.data.attributes.rut = "";
        this.email_checked = true;
        this.rut_checked = false;
      // }
      }else{
          this.data.attributes.rut = $("#validation").val();
          this.data.attributes.email = "";
          this.email_checked = false;
          this.rut_checked = true;
      }
    },
    validateBeforeChange () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.change_step();
          return;
        }
        $('.is-danger').animateCss('shake');
      });
    },
    change_step(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
      if(this.email_checked || this.rut_checked){
        try{
            this.$http.post("app/users/check_user_existence", {
              data: {
                attributes: this.encrypt(this.data.attributes).toString()
              }
            }, {
              headers: {
                "X-Device-ID" : this.buildDeviceId(),
                "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
              }
            }).then(function(response){
              this.updateUserEmailSignup(this.data.attributes.email);
              this.updateUserMobileSignup(this.data.attributes.mobile);
              this.updateUserPassword(this.data.attributes.password);
              this.updateUserEmail(this.data.attributes.email)
              if(response.body.included != undefined && response.body.included != null){
                this.updateUserName(response.body.included[0].attributes.name)
                this.updateUserLastName(response.body.included[0].attributes.last_name)
              }
              if(response.body.meta != undefined && response.body.meta != null){
                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                  this.checkToken(response.body.meta.authentication_token)
                }
              }
              this.$router.push({ name: 'sign_up' });
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
      }
    }
  },
  watch: {
    show_password(val){
      var pass;
      if(this.show_password){
        this.img_src = './src/assets/images/icons/visibility.svg';
        $(this.$el).find("#user_password").attr("type", "password");
      }else{
        this.img_src = './src/assets/images/icons/visibility_off.svg';
        $(this.$el).find("#user_password").attr("type", "text");
      }
    }
  },
  mounted(){
    // this.init_db();
    // this.check_user();
    var maxHeight = $("#content").children().first().height() +
      this.$el.children[0].clientHeight;
    if(maxHeight < document.documentElement.clientHeight){
      $("#content").children().first().addClass("center");
    }
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

<style scoped>
    .center{
        position: absolute;
        top: 50%;
        transform: translateY(-60%);
    }
</style>
