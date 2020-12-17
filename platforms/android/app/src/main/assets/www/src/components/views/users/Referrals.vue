<template>
  <article class="referrals">
    <section class="new_profile__header__text referrals__header">
      <img src="./src/assets/images/icons/arrow_left.svg" @click="$router.back()">
      <span>Plan referidos</span>
    </section>
    <img
      src="./src/assets/images/icons/icons_new/amigos.svg"
      alt=""
      class="referrals__image">
    <section class="referrals__form">
      <p class="referrals__form--title">¡Invita a tus amigos!</p>
      <p class="referrals__form--text">
        Recibe una clase de rumba gratis cuando tus amigos se registren y para
        ellos <span>un día de entrenamiento gratis</span> en Sportlife
      </p>
      <section class="referrals__form--content">
        <div class="edit_profile__form__input_section">
          <label for="">Nombre completo de tu amigo</label>
          <input type="text"
                 name="name"
                 class="form__input"
                 v-model="name"
                 placeholder="Nombre completo de tu amigo"
                 v-validate="'alpha_spaces'">
        </div>
        <div class="edit_profile__form__input_section">
          <label for="">Correo electrónico de tu amigo</label>
          <input type="email"
                 name="email"
                 class="form__input"
                 v-model="email"
                 placeholder="Correo electrónico de tu amigo"
                 v-validate="'email'">
        </div>
        <div class="edit_profile__form__input_section">
          <div
            v-if="email != '' &&
                  name != '' &&
                  !errors.has('email') &&
                  !errors.has('name')"
            class="new_login__content--login_button small-12 active"
            @click="createInvitation()">
            INVITAR
          </div>
          <div
            v-else
            class="new_login__content--login_button small-12">
            INVITAR
          </div>
        </div>
      </section>
    </section>
    <qr-button><qr-button>
  </article>
</template>

<script>
export default {
  data(){
    return{
      email:'',
      name: '',
      data: {
        attributes: {
          user_id: this.getUserId(),
          from: null,
          until: null,
          init_hour: "00:00",
          finish_hour: "23:59"
        },
        invited_users_attributes:[]
      }
    }
  },
  mounted(){
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
  },
  methods:{
    createInvitation(){
      let vm = this
      this.data.invited_users_attributes = []
      this.data.invited_users_attributes.push({email: this.email})
      try {
        console.log(this.data);
        this.$http.post('invitations/create', {
          data: this.encrypt(this.data).toString()
        },
        {headers:{
          "X-Device-ID" : this.buildDeviceId(),
          "Authorization" : 'Bearer ' + this.getUserToken(),
          "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
        }}).then(function(response){
          this.show_error_modal('Se ha enviado la invitación a '+this.name+', tu reward fue cargado en el menú Rewards.','¡Perfecto!','Aceptar')
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined &&
               response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          this.$router.push({name: 'offers_index'})
        }, function(response){
          if (response.body.data.message != null &&
              response.body.data.message != undefined &&
              response.body.data.message != '' ){
              this.show_error_modal(response.body.data.message.replace(/\[|\]|\'|\"|\(n\)/g, ''), '¡Ops!', 'Aceptar', false, false, false)
          }else{
            this.show_error_modal(response.body.data, '¡Ops!', 'Aceptar', false, false, false)
          }
        })
      } catch (e) {
        alert(e.message)
      }
    }
  }
}
</script>
