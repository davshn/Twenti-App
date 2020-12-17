<template>
  <div class="recover_password">
    <div class="container recover_password__header">
      <div class="small-1">
        <article class="recover_password__header__text">
          <img src="./src/assets/images/icons/arrow_left.svg" @click="$router.push({name:'offers_index'})">
        </article>
      </div>
    </div>

    <div class="header__loader">
      <app-loader class=" header__loader--element"></app-loader>
    </div>

    <div class="recover_password__info">
      <img
      src="https://s3-us-west-2.amazonaws.com/karrottsportlife/logo.svg">
      <p>Recuperar contraseña</p>
      <span>Digita tu correo electrónico para enviarte los pasos de recuperación de tu contraseña</span>
    </div>

    <div class="small-11 container recover_password__form">
      <div class="recover_password__form__input_section">
        <label for="">Correo electrónico</label>
        <input type="email"
        name=""
        class="form__input"
        v-model="forget_password_email.user.email"
        placeholder="Correo electrónico">
      </div>

      <div class="recover_password__form__input_section">
        <div
        class="new_login__content--login_button small-12"
        :class="{'active' : forget_password_email.user.email.indexOf('@') != -1}"
        @click="enviar_correo()">
        ENVIAR CORREO
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  data (){
    return{
      forget_password_email: {
        user: {
          email: ''
        }
      }
    }
  },
  methods: {
    enviar_correo(){
      this.$http.post('users/password', {data:this.encrypt(this.forget_password_email.user).toString()}).then(
        response => {
          // location.reload();
          this.show_error_modal('Hemos enviado las instrucciones a tu correo', ' ', 'Cerrar', false, false )
          this.$router.push({ name: 'offers_index' })
        },
        error => {
          this.show_error_modal('Tu correo no se encontró en la base de datos, Verifícalo Nuevamente', '', 'Cerrar', false, false)
        }
      );
    }
  }
}
</script>

<style>
</style>
