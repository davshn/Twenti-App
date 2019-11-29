<template>
  <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click.prevent="change_active($event); updateChangedVenue()">
    <path fill-rule="evenodd" d="M15.3163233,18.7988781 C13.4283233,20.4048781 10.6023233,20.4048781 8.70732325,18.8078781 C5.14832325,15.8078781 2.15732325,13.7098781 2.00432325,9.47387812 C1.81232325,4.15087812 8.06132325,1.97187812 11.6113233,6.31487812 C11.8053233,6.55287812 12.1933233,6.54787812 12.3863233,6.30987812 C15.9243233,1.95187812 22.2613233,4.15987812 21.9923233,9.59987812 C21.7903233,13.6938781 18.8993233,15.7508781 15.3163233,18.7988781 Z"/>
  </svg>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" @click.prevent="change_active($event); updateChangedVenue()" class="star">
      <polygon points="24 29.27 30.18 33 28.54 25.97 34 21.24 26.81 20.63 24 14 21.19 20.63 14 21.24 19.46 25.97 17.82 33" transform="translate(-14 -14)"/>
    </svg> -->

    <!-- <div
        class="star"
        @click.prevent="change_active($event)"></div> -->
</template>

<script>
    export default {
        props: {
            itemid: {
                type: [String,Number],
                default: -1
            },
            status: {
                type: [String,Boolean],
                default: false
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            status: function(){
                if(this.status && this.status != "not_included" || this.status == "true"){
                    $(this.$el).addClass("active");
                }
            }
        },
        methods: {
            change_active(event){
              var vm = this;
              navigator.geolocation.getCurrentPosition(vm.findPosition);
                if(this.getUserToken()){
                    // var target = $(event.target).hasClass("star") ? $(event.target) : $(event.target).parents(".star");
                    var target = $(event.target).prop("tagName") == "svg" ? $(event.target) : $(event.target).parents("svg");
                    if($(target).hasClass("active")){
                        $(target).removeClass("active");
                        try{
                            this.$http.post("app/locations/"+this.itemid+"/remove_from_favorites", null, {
                                headers:{
                                    "Authorization": "Bearer " + this.getUserToken(),
                                    "X-Device-ID" : this.buildDeviceId(),
                                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                }
                            })
                            .then(function(response){
                                // this.remove_cache_vouchers();
                                if(response.body.meta != undefined && response.body.meta != null){
                                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                    this.checkToken(response.body.meta.authentication_token)
                                  }
                                }
                                if(this.getLocationsCount() > 0){
                                  this.updateLocationsCount(this.getLocationsCount() - 1)
                                }else {
                                  this.updateLocationsCount(0)
                                }
                            }, function(response){
                              if(response.body.meta != undefined && response.body.meta != null){
                                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                  this.checkToken(response.body.meta.authentication_token)
                                }
                              }
                                $(target).addClass("active");
                                // this.$router.push({ name: "log_in" });
                                // this.checkLoginUser('log_in');
                                if (response.status==401) {
                                  // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                                  this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                                }else{
                                  this.show_error_modal(response.body.errors[0].details);
                                }
                                // this.errors_handler(response);
                            });
                        }catch(e){
                          this.show_error_modal(e.message);
                            // this.errors_handler(e.message);
                        }
                    }else{
                        $(target).addClass("active");
                        try{
                            this.$http.post("app/locations/"+this.itemid+"/add_to_favorites", null, {
                                headers:{
                                    "Authorization": "Bearer " + this.getUserToken(),
                                    "X-Device-ID" : this.buildDeviceId(),
                                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                }
                            })
                            .then(function(response){
                              if(response.body.meta != undefined && response.body.meta != null){
                                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                  this.checkToken(response.body.meta.authentication_token)
                                }
                              }
                              this.updateLocationsCount(this.getLocationsCount() + 1)
                                // this.remove_cache_vouchers();
                            }, function(response){
                              if(response.body.meta != undefined && response.body.meta != null){
                                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                  this.checkToken(response.body.meta.authentication_token)
                                }
                              }
                                $(target).removeClass("active");
                                // this.$router.push({ name: "log_in" });
                                // this.checkLoginUser('log_in');
                                if (response.status==401) {
                                  // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                                  this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                                }else{
                                  this.show_error_modal(response.body.errors[0].details);
                                }
                                // this.errors_handler(response);
                            });
                        }catch(e){
                          this.show_error_modal(e.message);
                            // this.errors_handler(e.message);
                        }
                    }
                }else{
                  this.checkLoginUser('log_in');
                    // this.$router.push({ name: "log_in" });
                }
            },
            updateChangedVenue() {
                var changed_venue = this.getIsChangedVenue();
                this.updateIsChangedVenue(changed_venue+=1);
            }
        },
        mounted(){
            if(this.status && this.status != "not_included" || this.status == "true"){
              if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
                $(this.$el).addClass("active");
              }
            }
            if(this.center == true){
                $(this.$el).addClass("center");
            }
        }
    }
</script>

<style scoped lang="css">
  svg{
    fill: #B0BEC5;
  }

  svg.active{
    fill: #f44336;
  }
</style>
