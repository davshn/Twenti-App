<template>
  <article class="input_rut">
    <section class="input_rut__container">
      <div class="input_rut__container--header">
        <!-- <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/rut_pattern%402x.png" alt=""> -->
        <img src="./src/assets/images/backgrounds/rut_pattern@2x.png" alt="">
        <span class="input_rut__close" @click="updateLocationUser('')">Skip</span>
      </div>
      <div class="input_rut__container--content">
        <p class="input_rut__subtitle">Actualiza tu Sede</p>
        <p class="input_rut__title">
          Por favor selecciona la sede a la que asistes:
        </p>
        <div >
          <label for="">selecciona tu sede:</label>
          <div class="input_rut__container--input_section">
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
          <div
            class="input_rut__button"
            :class="{active : data.attributes.user_info_attributes.location_id!='' && !errors.any()}"
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
      locations: [],
      data: {
        attributes:{
          id: this.getUserId(),
          user_info_attributes: {
            id: this.getUserInfoId(),
            location_id: ''
          }
        }
      }
    }
  },
  mounted(){
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
    if(this.getUserId() != '' && this.getUserId() != null && this.getUserId() != undefined ){
      if(this.getUserInfoId()==''){
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
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          this.getAllLocations();
          this.data.attributes.user_info_attributes.id = response.body.included[0].id;
          this.updateUserInfoId(response.body.included[0].id);
        }, function(response){
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          if (response.status==401) {
            // this.show_error_modal(response.body.errors[0].details, "Un momento...");
            this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
          }else{
            this.show_error_modal(response.body.errors[0].details);
          }
            // this.errors_handler(response);
        })
      }else{
        this.getAllLocations();
      }
    }
  },
  methods: {
    getAllLocations(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
      if(this.getLocations().length!=0){
        this.locations=this.getLocations();
      }else{
        try{
            this.$http.get("app/locations?page=1&classes=true",
            {
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
            }
          ).then(function(response){
            this.locations=response.body.data;
            if(response.body.meta != undefined && response.body.meta != null){
              if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                this.checkToken(response.body.meta.authentication_token)
              }
            }
          }, function(response){
            if(response.body.meta != undefined && response.body.meta != null){
              if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                this.checkToken(response.body.meta.authentication_token)
              }
            }
          });
        }catch(e){
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
        }
      }
    },
    updateUser(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
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
              this.updateLocationUser(response.body.included[0].attributes.location_id);
              if(response.body.meta != undefined && response.body.meta != null){
                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                  this.checkToken(response.body.meta.authentication_token)
                }
              }
              // this.$router.push({name: 'offers_index'});
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

    }
  }
}
</script>
