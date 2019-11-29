<template>
    <div class="grid-container grid-frame" v-if="charge_information">
        <app-header
          :transparent="true"
          :title="''"></app-header>
        <transition appear name="slideInRight">
          <div class="grid-y" id="venue_show_body">
            <div class="cell">

              <app-instance-header
                :offer="venue"
                :checked="true"
                :venue="true"
                v-if="charge_information"></app-instance-header>

              <transition name="slideInUp">
                <div class="grid-x" v-show="loaded">
                  <div class="cell">

                    <app-instance-title
                      :offer="venue"
                      :venue="true"></app-instance-title><!-- End. Title. -->

                    <div class="grid-x" v-if="has_manager">
                      <div class="cell">
                        <div class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Gerente</h2>
                              <div class="offerInstance__manager">
                                <div
                                  v-if="venue.attributes.manager_image.thumb.url != ''"
                                  class="offerInstance__manager--image"
                                  :style="{backgroundImage: 'url('+ getServerImage() + venue.attributes.manager_image.thumb.url +')'}">
                                </div>
                                <p
                                  class="offerInstance__manager--email"
                                  v-if="venue.attributes.manager_email != ''">
                                  {{venue.attributes.manager_email}}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="grid-x">
                      <div class="cell">
                        <div class="instance__tile instance__tile--block">
                          <div class="grid-x">
                            <div class="cell auto">
                              <div class="grid-y">
                                <div class="cell">
                                  <span>Abierto ahora</span>
                                </div>
                                <div class="cell">
                                  <div class="offerInstance__label">
                                    <div class="grid-x">
                                      <div class="cell shrink">
                                        <svg-calendar></svg-calendar>
                                      </div>
                                      <div class="cell auto">
                                        <p class="offerInstance__expiry">Hoy: {{calcSchedule(venue.attributes.location_schedule)}}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="cell shrink">
                              <!-- <svg-call class="icon__call"></svg-call> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <app-instance-description
                        :offer="venue"
                        :venue="true"
                        :tags= "[]"></app-instance-description>




                    <div class="grid-x">
                      <div class="cell">
                        <div class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Ofertas</h2>
                              <app-instance-object
                                :objects="offers"
                                :object_type="'offer'"
                                :route = "'offer_show'"
                                ></app-instance-object>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="grid-x">
                      <div class="cell">
                        <div class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Horarios de atención</h2>
                              <div
                                class="cell"
                                v-for="(schedule, index) in schedules"
                                v-if="index != 'works_on_holidays' && index != 'works_on_sundays'">
                                <div class="offerInstance__label">
                                  <div class="grid-x">
                                    <div class="cell shrink">
                                      <svg-calendar></svg-calendar>
                                    </div>
                                    <div class="cell auto">
                                      <p class="offerInstance__expiry">{{days[index]}}: {{calcSchedule(schedule)}}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
        <qr-button></qr-button>
    </div>
</template>

<script>
    import Star from '../../shared/svg/Star.vue'
    import SliderInstance from '../../shared/SliderInstance.vue'

    export default {
        data(){
            return {
                loaded: false,
                has_manager: false,
                venue: {
                    attributes: {
                        img: {
                            url: ''
                        },
                        title: 'Bab Al Qasr',
                        'hotel-name': 'Abu Dhabi',
                        description: 'A lavishly imagined dream, Emirates Palace offers you a magical place to enjoy the quintessence of 5-star luxury hospitality and authentic local experiences. From 394 luxurious rooms and suites, to our award-winning culinary cuisine, Emirates Palace is the definition of an unrivalled Arabian fantasy.',
                        offers: [],
                        opening_time: "11:00 AM - 12:00 AM",
                        name: "",
                        manager_email: '',
                        manager_image: {
                          tumbl:{
                            url: ''
                          }
                        }
                    }
                },
                schedules: [],
                charge_information: false,
                offers: [],
                days: {'sunday':'Domingo',
                       'monday':'Lunes',
                       'tuesday':'Martes',
                       'wednesday':'Miércoles',
                       'thursday':'Jueves',
                       'friday':'Viernes',
                       'saturday':'Sábado'}
            }
        },
        methods:{
            toggle_text(event){
                var target = $(event.target).prop("tagName") == "div" ?
                    $(event.target) : $(event.target).parents("div");
                if(Number($(target).siblings("p").css("max-height").split("px")[0])
                    <= 80){
                    $(target).siblings("p").css("height","auto");
                    $(target).siblings("p").css("max-height","none");
                }else{
                    $(target).siblings("p").css("max-height","80px");
                }
            },
            calcSchedule(schedule){
              if(schedule.beginning != undefined &&
                 schedule.beginning != null &&
                 schedule.beginning != "" &&
                 schedule.beginning != undefined &&
                 schedule.ending != null &&
                 schedule.ending != ""){
                   if(schedule.beginning.second_of_day > 0 &&
                      schedule.ending.second_of_day > 0){
                     let open = Math.floor(schedule.beginning.second_of_day / 3600);
                     let close = Math.floor(schedule.ending.second_of_day / 3600);
                     return open.toString() + ":00 - " + close.toString() + ":00"
                   }
                   else {
                     return "Cerrado"
                   }
              }else{
                return "Cerrado"
              }
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            var swiper;
            try{
              if(this.getUserToken() != '' &&
                  (this.getLocationUser() == '' ||
                  this.getLocationUser() == null ||
                  this.getLocationUser() == undefined)){
                this.updateLocationUser(null);

              }
                // this.$http.get(this.getServer()+"/v1/outlets/"+this.$route.params.id,{
                this.$http.get("app/locations/"+this.$route.params.id,{
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
                    this.venue.id = response.body.data.id;
                    this.venue.attributes.img = response.body.data.attributes.image;
                    this.venue.attributes.name = response.body.data.attributes.title;
                    this.venue.attributes.description = response.body.data.attributes.description;
                    this.venue.attributes["is_favorite"] = response.body.data.attributes["is_favorite"];
                    this.venue.attributes.address = response.body.data.attributes.address;
                    this.venue.attributes.city = response.body.data.attributes.city;
                    this.venue.attributes.telephone = response.body.data.attributes.telephone;
                    this.venue.attributes.offers = response.body.data.attributes.offers;
                    this.venue.attributes.location_schedule = response.body.data.attributes.location_schedule;
                    this.venue.attributes.manager_email = response.body.data.attributes.manager_email;
                    this.venue.attributes.manager_image = response.body.data.attributes.manager_image;
                    if(response.body.data.attributes.manager_email != null ||
                       response.body.data.attributes.manager_image.url != null){
                         this.has_manager = true;
                    }
                    this.charge_information = true;
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                    for (var i = 0; i < response.body.included.length; i++) {
                      if(response.body.included[i].type == "offers" && !response.body.included[i].attributes.is_rewardable){
                        this.offers.push(response.body.included[i])
                      } else if(response.body.included[i].type == "location_schedules"){
                        this.schedules = response.body.included[i].attributes
                      }
                    }
                    console.log(this.schedules);
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
                }).then(function(respose){
                    swiper = new Swiper('.tag__slider-container', {
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        paginationClickable: true,
                        spaceBetween: 0,
                        freeMode: true,
                        loop: false,
                        runCallbacksOnInit:true,
                        onInit(swiper){
                            swiper.update();
                        }
                    });
                    this.loaded = true;
                }).then(function(response){
                    swiper.update();
                    console.log("hecho");
                })
            }catch(e){
              this.show_error_modal(e.message);
                // this.errors_handler(e.message);
            }
            $("#view_all").click();
            $("#view_all").click();
        },
        components: {
            "appStar": Star,
            "appSliderInstance": SliderInstance
        }
    }
</script>

<style scoped>

.swiper-container{
    max-width: 100vw;
    width: 100%;
}
</style>
