<template>
  <article class="cell my-vouchers">
    <div
      class="drawer_background"
      v-if="getShowDrawer()"
      @click="updateShowDrawer(false)">
    </div>
    <app-header
      :title="$t('common.offers')">
      <img
          src="./src/assets/images/icons/icons/ico_menu.svg"
          slot="left-content"
          @click="updateShowDrawer(true)"
          id="drawer_icon"/>
    </app-header>
    <transition
      name="slide">
      <v-touch
          @swipeleft="toggle_drawer()"
          tag="app-drawer"
          :margin_top="margin_top"
          v-if="getShowDrawer()"
          ></v-touch>
    </transition>
    <section class="offer_index__navbar">
      <div
        class="offer_index__navbar--category"
        :class="{ 'active' : getSelectedSection() == index }"
        v-for="(category, index ) in categories"
        @click.stop="index == 1 ? showMyClasses() : changeSelection(index)"
        :id="'category_id_' + index">
        <span style="white-space: pre;">{{category}}</span>
      </div>
      <!-- <div class="offer_index__navbar--category" style="display: none"></div> -->
    </section>
    <div
      id="my_classes_body"
      class="my_classes__content">
      <section v-if="getSelectedSection() == 1 && classes.length > 0">
        <app-instance-object
          :objects="classes"
          :object_type="'class'"
          :route = "'class_show'"
          :wrap = "'wrap'"
          ></app-instance-object>
      </section>
      <section
        v-else-if="classes.length <= 0 && getSelectedSection() == 1"
        class="my_classes__empty">
        <gym-icon class="my_classes__empty--icon"></gym-icon>
        <p class="my_classes__empty--title">Personal Trainer</p>
        <p class="my_classes__empty--text">
          Estamos preparando<br>una nueva experiencia para ti
        </p>
      </section>
      <section v-else-if="getSelectedSection() == 0">
        <div
          class="offer_index__content--offer offer_instance offer_in_list my_classes__location_content"
          v-for="(location, index) in locations"
          @click="showSchedule(location.attributes.schedule_image.url)">
          <div
            class="offer_in_list__container ">
            <div
              class="offer_in_list__title_container my_classes__location_content--no_margin">
              <p class="offer_in_list__title">
                {{location.attributes.name}}
              </p>
            </div>
            <p class="offer_in_list__expiry my_classes__location_content--no_margin">
              {{location.attributes.address}}
            </p>
          </div>
          <figure
            class="offer_in_list__image ">
            <image-loader
              class="remove_min"
              :url="getServerImage() + location.attributes.image.thumb.url">
            </image-loader>
          </figure>
        </div>
      </section>
      <qr-button></qr-button>
    </div>
    <app-footer
      :active_item="3"
      :active_section="'classes'">
  </article>
</template>

<script>
export default {
  data(){
    return{
      margin_top: "0px",
      categories: ['Horarios', 'Personal Trainer'],
      active: this.getSelectedSection(),
      classes: [],
      locations:[],
      actual_page: 1
    }
  },
  methods:{
    changeSelection(index){
      this.updateSelectedSection(index)
      this.active = index
    },
    findMyClasses(){
      try{
        this.$http.get("app/classes/classes", {
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
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          // if (response.body.data != undefined && response.body.data != null) {
          //   for (var i = 0; i < response.body.data.length; i++) {
          //     var offer = {attributes: response.body.data[i].attributes,
          //                  image_validator: true}
          //     offer.attributes.images = []
          //     offer.attributes.images = response.body.data[i].attributes.images
          //     this.classes.push(offer)
          //   }
          // }
          this.classes = response.body.data
          console.log(this.classes);
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
        });
      }catch(e){
        this.show_error_modal(e.message);
      }
    },
    findLocations(){
      var vm = this;
      vm.locations = []
      try{
          // vm.$http.get(vm.getServer()+"/v1/outlets/my_favorites?page="+vm.actual_page_favourites, {
          vm.$http.get("app/locations?page="+vm.actual_page+"&classes=true", {
              headers:
              {
                "X-Device-ID" : this.buildDeviceId(),
                "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
              }
          }).then(function(response){
              for(var key in response.body.data){
                if(response.body.data[key].attributes.location_type == 'Centro Deportivo'){
                  this.locations.push(response.body.data[key])
                }
              }
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
            if (response.status==401) {
              // this.show_error_modal(response.body.errors[0].details, "Un momento...");
              this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
            }else{
              this.show_error_modal(response.body.errors[0].details);
            }
          })
      }catch(e){
          vm.errors_handler(e.message);
      }
    },
    showSchedule(url){
      if(url != undefined && url != null && url != ''){
        this.updateScheduleImage(url)
        this.updateScheduleModal(true)
      }
    },
    showMyClasses(){
      if(this.getUserToken() != '' &&
         this.getUserToken() != undefined &&
         this.getUserToken() != null){
        this.active = 1
        this.updateSelectedSection(1)
      }else{
        this.show_error_modal(this.login_message, '¡Hola!', 'Ingresa Aquí', true)
      }
    }
  },
  mounted(){
    var headerHeight = this.$el.children[0].offsetHeight;
    var subHeaderHeight = this.$el.children[1].offsetHeight;
    var footerHeight = this.$el.children[3].offsetHeight;
    this.resize_body(this.$el, "#my_classes_body", [
      headerHeight,
      subHeaderHeight,
      footerHeight
    ]);
    this.findLocations()
    if(this.getSelectedSection() == 1 &&
       this.getUserToken() != '' &&
       this.getUserToken() != undefined &&
       this.getUserToken() != null){
      this.findMyClasses()
    }
    this.updateScheduleModal(false)
    this.updateScheduleImage('')
    var vm = this;
    navigator.geolocation.getCurrentPosition(vm.findPosition);
  },
  watch:{
    active(){
      if(this.active == 1){
        this.findMyClasses()
      }else{
        this.findLocations()
      }
    }
  }
}
</script>
