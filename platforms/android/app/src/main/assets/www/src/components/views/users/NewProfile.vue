<template >
  <div class="container new_profile">
    <div class="container new_profile__header">
      <div class="small-1">
        <article class="new_profile__header__text">
          <img src="./src/assets/images/icons/arrow_left.svg" @click="$router.back()">
          <span>Perfil</span>
        </article>
      </div>
    </div>

    <div class="small-5 container new_profile__info">
      <div class="row new_profile__info__basic">
        <div class="col-xs-4 new_profile__info__basic__image">
          <img :src="current_url" alt="">
        </div>
        <div class="col-xs-8 new_profile__info__basic__info" style="justify-content: flex-end;">
          <div class="edit_photo" @click="takePicture()">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_cambiarfoto.svg" alt="">
          </div>
          <div class="edit_text" @click="$router.push({name:'editProfile'})"><article>EDITAR INFORMACIÓN</article></div>
        </div>
      </div>
      <div class="row new_profile__info__data-basic">
        <div class="col-xs-12">
          <p>{{activeUser()}}</p>
          <span>{{getUserEmail()}}</span>
        </div>
      </div>
      <div class="row new_profile__info__data-app">
        <div class="col-xs-4">
          <span>REWARDS</span>
          <div class="">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_rewards.svg" alt="">
            <span class="data-app_number">{{this.getRewardsCount()}}</span>
          </div>
        </div>
        <!-- <div class="col-xs-4">
          <span class="">LOCACIONES</span>
          <div class="">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_locaciones.svg" alt="">
            <span class="data-app_number">{{this.getLocationsCount()}}</span>
          </div>
        </div> -->
        <div class="col-xs-4">
          <span>CANJES</span>
          <div class="">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_redenciones.svg" alt="">
            <span class="data-app_number">{{this.getRedemptionsCount()}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="small-6 container new_profile__options">
      <div class="col-xs-12" style="padding: 0;">
        <div class="new_profile__options__container"
             @click="$router.push({name:'editpassword'})">
          <article class="new_profile__options__container__data">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_cambiarcontrasena.svg" alt="">
            <span>CAMBIAR CONTRASEÑA</span>
          </article>
        </div>
        <div class="new_profile__options__container"
             @click="updateTermsAndConditions(true)">
          <article class="new_profile__options__container__data">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_politicas.svg" alt="">
            <span>VER TÉRMINOS Y CONDICIONES</span>
          </article>
        </div>
        <!-- <div class="new_profile__options__container">
          <article class="new_profile__options__container__data">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_calificar.svg" alt="">
            <span style="color:#AAAEB7">CALIFICAR SPORTLIFE</span>
          </article>
        </div> -->
        <div class="new_profile__options__container"
             @click="logOut()">
          <article class="new_profile__options__container__data">
            <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/perfil_cerrarsesion.svg" alt="">
            <span>CERRAR SESIÓN</span>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      current_photo: '',
      cameraOptions: {},
      current_url: this.getProfilePicture(),
      data: {
        attributes:{}
      }
    }
  },
  mounted(){
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
    try {
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
        if (response.body.included[0] != null && response.body.included[0] != undefined) {
          if(response.body.included[0].attributes.picture.url != null){
            this.current_url = this.getServerImage() + response.body.included[0].attributes.picture.thumb.url
          }
        }
        this.updateFavoritesCount(response.body.data.attributes.favorite_offers)
        this.updateLocationsCount(response.body.data.attributes.favorite_locations)
        this.updateRewardsCount(response.body.data.attributes.rewards)
        this.updateRedemptionsCount(response.body.data.attributes.redeems)
        if(response.body.meta != undefined && response.body.meta != null){
          if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
            this.checkToken(response.body.meta.authentication_token)
          }
        }
      }, function(response){
        this.$router.push({name: 'log_in'})
      });
    } catch (e) {

    }
  },
  methods: {
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
      console.log(user);
      return user;
    },
    takePicture(){
       var vm = this
       console.log(navigator);
       console.log(Camera);
       this.cameraOptions = {
           // Some common settings are 20, 50, and 100
          quality: 50,
          // destinationType: Camera.DestinationType.FILE_URI,
          destinationType: Camera.DestinationType.DATA_URL,
          // In this app, dynamically set the picture source, Camera or photo gallery
          // sourceType: Camera.PictureSourceType.CAMERA,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
       }
      //  navigator.camera.getPicture(vm.onSuccess(), vm.onFail(), vm.cameraOptions);
      navigator.camera.getPicture(function cameraSuccess(imageUri) {
        vm.current_url = imageUri
        console.log("Camera Success");
        vm.current_photo = "data:image/jpeg;base64," + imageUri
        console.log(vm.current_photo)
        var ob = {}
        ob.image_data = vm.current_photo
        vm.data.attributes.user_info_attributes.picture = ob
        // vm.current_url = URL.createObjectURL(imageUri)
        var picture = {attributes:{picture: vm.current_photo}}
        vm.$http.put('app/users/update_picture', {
           data: vm.encrypt(picture).toString()
        }, {
          headers:
          {
            "Authorization": "Bearer " + vm.getUserToken(),
            "X-Device-ID" : vm.getDeviceId(),
            "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
          }
        }).then(function(response){
          vm.current_url = vm.getServerImage() + response.body.data.attributes.picture.thumb.url
          vm.updateProfilePicture(vm.current_url)
          // this.data.attributes.rut = this.data.attributes.rut.slice(0, -1);
          // this.updateUserEmail(response.body.data.attributes.email);
          // this.updateUserName(response.body.included[0].attributes.name);
          // this.updateUserLastName(response.body.included[0].attributes.last_name);
          // this.updateUserGender(response.body.included[0].attributes.gender);
          // this.updateNationality(response.body.included[0].attributes.nationality);
          // this.updateUserMobile(response.body.data.attributes.mobile);
          // this.updateNotifications(response.body.data.attributes.notifications);
          // this.updateLocationUser(response.body.included[0].attributes.location_id);
          // this.show_error_modal('Tu perfil se ha actualizado con exito', " ");
          // this.$router.push({name: 'newProfile'});
        }, function(response){
          vm.data.attributes.rut = vm.data.attributes.rut.slice(0, -1)
          if (response.status==401) {
            // this.show_error_modal(response.body.errors[0].details, "Un momento...");
            vm.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
          }else{
            if(typeof response.body.errors[0].details != "object"){
              vm.show_error_modal(response.body.errors[0].details);
            }else{
              let message = []
              for(var key in response.body.errors[0].details){
                message.push(response.body.errors[0].details[key])
              }
              vm.show_error_modal(message);
            }
          }
          // this.show_error_modal(response.body.errors[0].details);
        });
      }, function cameraError(error) {
          console.debug("No se pudo cargar la imagen: " + error, "app");

      }, vm.cameraOptions);
     },
  }
}
</script>

<style>
</style>
