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
      </div>
    </section>
    <section
      class="new_login__client_logo grid-x" style="text-align:center">
      <img
        src="https://aibai.s3.us-west-2.amazonaws.com/logo_aibai.jpg"
        class="home__image_home"
        style="margin: 0 auto!important">
    </section>
    <section
      class="new_login__content grid-x">
      <div
        class="new_login__content--input_section small-12">
        <input
          data-vv-delay="0"
          v-validate="'required'"
          name="user"
          class="form__input"
          id="validation"
          @input="validation()"
          type="text"
          placeholder="Correo Electrónico">
      </div>
      <div class="new_login__content--input_section  small-12">
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
      <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
        <div
          class="new_login__content--login_button small-12"
          :class="{'active': (email_checked || rut_checked) && data.attributes.password != '' }"
          @click="login()">
          Acceder
        </div>
      </div>
      <div class="" style="display flex; align-items: center; justify-content: center; width: 100%; text-align: center">
        <span
        class="new_login__content--forget_password">
          Olvidé mi contraseña
        </span>
      </div>

    </section>
    <section class="new_login__links">
      <p>
        ¿No tienes una cuenta?
      </p>
      <div class="new_login__links--button"  @click="$router.push({name: 'sign_up'})" class="">
        <b>Regístrate</b>
      </div>
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
    toggle_password_view () {
      this.show_password = !this.show_password;
    },
    login(){
      if(this.data.attributes.email != "" && this.data.attributes.password != ""){
        try {
          this.$http.post('find_user', {
            data:this.data
          }
          ).then(function(response){
            console.log("Create Session");
            console.log(response);
            this.updateLogin(false)
            this.updateUserPData(this.data.attributes.password)
            this.saveUserData(response.body.data)
          },function(response){
            console.log("Error");
            console.log(response);
            this.updateLogin(true)
            alert('Por favor, verifique los valores indexados')
          })
        } catch (e) {
          console.log("Error");
          console.log(e);
          this.updateLogin(true)
          alert('Por favor, verifique los valores indexados')
        }
      } else {
        this.updateLogin(true)
        alert('Por favor, verifique los valores indexados')

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
    }),
    this.data.attributes.email = this.getEmail()
    this.data.attributes.password = this.getUserPData()
    if(this.data.attributes.email != "" && this.data.attributes.password != ""){
      this.login()
    }
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
