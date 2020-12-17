<template>
  <div
    class="cell my-vouchers">
    <div
      class="drawer_background"
      v-if="getShowDrawer()"
      @click="updateShowDrawer(false)">
    </div>
    <app-header
      :title="$t('common.my_vouchers')">
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

    <!-- Hide Locations favorites -->

    <!-- <section class="offer_index__navbar">
      <div
        class="offer_index__navbar--category active tab"
        @click.stop="toggle_tab($event)"
        id="my_offers">
        <span style="white-space: pre;">Ofertas</span>
      </div><div
        class="offer_index__navbar--category tab"
        @click.stop="toggle_tab($event)"
        id="my_locations">
        <span style="white-space: pre;">Locaciones</span>
      </div>
    </section> -->

    <div
      class="cell my-vouchers__body"
      id="my_vouchers_body">
      <app-pull-refresh
        element="#my_vouchers_body"
        :refresh="refresh">
      </app-pull-refresh>
      <div
        class="small-12"
        id="vouchers"
        v-show="tab">
        <article class="instance_object" style="flex-wrap: wrap">
          <div
            class="instance_object__instance"
            v-for="(object, index) in favorites"
            @click="$router.push({name: 'offer_show', params: {
                id: object.id ? object.id : object.attributes.id,
                is_favorite: object.attributes['is_favorite']
              }})"
            v-if="object.attributes.published">
            <figure
              class="instance_object__image">
              <image-loader
                v-if="object.image_validator"
                :url="getServerImage() + object.attributes.images[0].image.thumb.url"></image-loader>
            </figure>
            <div class="instance_object__favourite" @click.stop>
              <instance-favorites
                :itemid="object.id ? object.id : object.attributes.id"
                :status="object.attributes['is_favorite']"
                :current_offer="index"
                class="instance_object__favourite--icon">
              </instance-favorites>
            </div>
            <div
              class="instance_object__title_container">
              <p class="instance_object__title">
                {{object.attributes.title}}
              </p>
            </div>
            <p
              class="instance_object__expiry">
              Hasta el {{object.attributes['expiration']}}
            </p>
          </div>
          <div v-if="favorites.length==0"
               class="my-vouchers__body__not-favorites">
            <svg  fill="#DCDEE2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 20">
              <g id="ico_likes" transform="translate(0 -29.836)">
                <g id="Group_1" data-name="Group 1" transform="translate(0 29.836)">
                  <path id="Path_1" data-name="Path 1" class="cls-1" d="M21.322,31.8a5.848,5.848,0,0,0-9.249.655,8.657,8.657,0,0,0-.573.914,8.65,8.65,0,0,0-.573-.914A5.848,5.848,0,0,0,1.678,31.8,6.8,6.8,0,0,0,0,36.358a8.335,8.335,0,0,0,2.351,5.514,52.025,52.025,0,0,0,5.885,5.412c.89.747,1.81,1.519,2.79,2.362l.029.025a.682.682,0,0,0,.888,0l.029-.025c.98-.844,1.9-1.616,2.79-2.362a52.017,52.017,0,0,0,5.885-5.412A8.335,8.335,0,0,0,23,36.358,6.8,6.8,0,0,0,21.322,31.8ZM13.89,46.274c-.767.644-1.557,1.306-2.39,2.018-.833-.712-1.622-1.375-2.39-2.018-4.675-3.921-7.763-6.511-7.763-9.916a5.486,5.486,0,0,1,1.341-3.681,4.489,4.489,0,0,1,7.139.545,7.813,7.813,0,0,1,1.031,2.019.677.677,0,0,0,1.281,0,7.813,7.813,0,0,1,1.031-2.019,4.489,4.489,0,0,1,7.139-.545,5.486,5.486,0,0,1,1.342,3.681C21.652,39.763,18.564,42.354,13.89,46.274Z" transform="translate(0 -29.836)"/>
                </g>
              </g>
            </svg>
            <div class="my-vouchers__body__not-favorites--text">
              <p>
                <br>
                <b>¡Aquí podrás ver tus ofertas favoritas!</b>
              </p>
            </div>
          </div>

        </article>
      </div>
      <!-- <div
        class="small-12"
        id="locations"
        v-show="!tab">
        <app-instance-object
          :objects="locations"
          :object_type="'location'"
          :route = "'venue_show'"
          :wrap = "'wrap'"
          ></app-instance-object>
          <div v-if="locations.length==0"
               class="my-vouchers__body__not-favorites">
            <svg  fill="#DCDEE2" style="margin-top:35%;width:100%;height:100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 20">
              <g id="ico_likes" transform="translate(0 -29.836)">
                <g id="Group_1" data-name="Group 1" transform="translate(0 29.836)">
                  <path id="Path_1" data-name="Path 1" class="cls-1" d="M21.322,31.8a5.848,5.848,0,0,0-9.249.655,8.657,8.657,0,0,0-.573.914,8.65,8.65,0,0,0-.573-.914A5.848,5.848,0,0,0,1.678,31.8,6.8,6.8,0,0,0,0,36.358a8.335,8.335,0,0,0,2.351,5.514,52.025,52.025,0,0,0,5.885,5.412c.89.747,1.81,1.519,2.79,2.362l.029.025a.682.682,0,0,0,.888,0l.029-.025c.98-.844,1.9-1.616,2.79-2.362a52.017,52.017,0,0,0,5.885-5.412A8.335,8.335,0,0,0,23,36.358,6.8,6.8,0,0,0,21.322,31.8ZM13.89,46.274c-.767.644-1.557,1.306-2.39,2.018-.833-.712-1.622-1.375-2.39-2.018-4.675-3.921-7.763-6.511-7.763-9.916a5.486,5.486,0,0,1,1.341-3.681,4.489,4.489,0,0,1,7.139.545,7.813,7.813,0,0,1,1.031,2.019.677.677,0,0,0,1.281,0,7.813,7.813,0,0,1,1.031-2.019,4.489,4.489,0,0,1,7.139-.545,5.486,5.486,0,0,1,1.342,3.681C21.652,39.763,18.564,42.354,13.89,46.274Z" transform="translate(0 -29.836)"/>
                </g>
              </g>
            </svg>
            <div class="my-vouchers__body__not-favorites--text">
              <p>
                <br>
                <b>¡Guarda aquí tus locaciones favoritas!</b>
              </p>
            </div>

          </div>
      </div> -->
      <qr-button></qr-button>
    </div>
    <app-footer
      :active_item="0"
      :active_section="'voucher'"></app-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
      data() {
        return {
          vouchers_src: './src/assets/images/icons/Drawer/vouchers.svg',
          rewards_src: './src/assets/images/icons/Drawer/upgrade_grey.svg',
          vouchers_categories: [],
          rewards_categories: [],
          tab: true,
          actual_page_v: 1,
          actual_page_r: 1,
          is_changed: false,
          refreshed: false,
          favorites: [],
          locations: [],
          favorites_charged: false,
          locations_charged: false,
          current_offer: null,
          show_drawer: false,
          margin_top: "0px",
          reload_image: false
        }
      },
      methods: {
        toggle_drawer(){
          this.show_drawer = !this.show_drawer;
          this.updateShowDrawer(this.show_drawer)
          // if(this.getShowDrawer()){
          //   $(this.$el).find("#drawer_icon")
          //       .attr("src", "./src/assets/images/icons/close.svg");
          // }else{
          //   $(this.$el).find("#drawer_icon")
          //       .attr("src", "./src/assets/images/icons/icons/ico_menu.svg");
          // }
        },
        toggle_tab(event){
          var target = $(event.target).hasClass("tab") ?
            $(event.target) : $(event.target).parents(".tab");
          if(!$(target).hasClass("active")){
            $(target).addClass("active").siblings(".tab").removeClass("active");
            if($(target).attr("id") == "my_offers"){
              this.tab = true;
            }else{
              this.tab = false;
              this.refreshed = false;
            }
          }
          this.favorites = []
          this.locations = []
          this.send_request()
        },
        send_request(init = false){
          var flag = false;
          var flag2 = false;
          var vm = this;
          try{
            var not = "";
            if(vm.$route.params.notId != null){
              not = "?notification_id="+vm.$route.params.notId;
            }
            vm.$http.get("app/offers/favorites", {
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
              if (response.body.included != undefined && response.body.included != null) {
                for (var i = 0; i < response.body.included.length; i++) {
                  if(response.body.included[i].attributes.favoritable_type == 'Offer'){
                    var offer = {attributes: response.body.included[i].attributes.model,
                                 image_validator: true}
                    offer.attributes.images = []
                    offer.attributes.images = response.body.included[i].attributes.model_images
                    offer.attributes.is_favorite = true
                    this.favorites.push(offer)
                  }
                }
                this.updateFavoritesCount(this.favorites.length)
              }
              console.log(this.favorites);
              if(response.body.meta != undefined && response.body.meta != null){
                if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                  this.checkToken(response.body.meta.authentication_token)
                }
              }
              if (this.getUserToken() != ''){
                try{
                  vm.$http.get("app/locations?page="+vm.actual_page, {
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
                    for(var key in response.body.data){
                      if(response.body.data[key].attributes.is_favorite){
                        vm.locations.push(response.body.data[key]);
                      }
                    }
                    this.updateLocationsCount(this.locations.length)
                    // if(response.body.data.length > 0){
                    //   vm.actual_page_favourites++;
                    // }
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
              }
              this.favorites_charged = true
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
          vm.is_changed = false;
        },
        refresh() {
          var vm = this
          vm.favorites = [];
          vm.locations = [];
          vm.actual_page_v = 1;
          vm.actual_page_r = 1;
          vm.send_request();
          vm.refreshed = true;
        },
        insert_db_offers(){
          var vm = this;
          var db = window.openDatabase('FuseRewardsD', "1.0", "", 200000);
          db.transaction(function(tx) {
            tx.executeSql('UPDATE Cache SET vouchers = ?, rewards = ? WHERE id = 1',
              [JSON.stringify(vm.vouchers_categories), JSON.stringify(vm.rewards_categories)], function(tx,rs) {
            }, function(error) {
              vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
            });
          }, function(error) {
            vm.show_error_modal('Transaction ERROR: ' + error.message);
          }, function() {
          });
        },
        init_db_offers(){
          var vm = this;
          var db = window.openDatabase('FuseRewardsD', "1.0", "", 200000);
          db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM Cache', [], function(tx,rs) {
              if(rs.rows.length > 0){
                if(rs.rows.item(0).vouchers != null
                  && rs.rows.item(0).locations != null){
                  vm.vouchers_categories = JSON.parse(rs.rows.item(0).vouchers);
                  vm.rewards_categories = JSON.parse(rs.rows.item(0).rewards);
                  vm.actual_page++;
                }else{
                  vm.send_request(true);
                }
              }else{
                vm.send_request(true);
              }
            }, function(error) {
              vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
            });
          }, function(error) {
            vm.show_error_modal('Transaction ERROR: ' + error.message);
          }, function() {
          });
        },
        refreshFavorites(value){
          if (value) {
            console.log("Holi");
          }else{
            console.log("que hache");
          }
        }
      },
      mounted(){
        var vm = this;
        navigator.geolocation.getCurrentPosition(vm.findPosition);
        var headerHeight = this.$el.children[0].offsetHeight;
        // var subHeaderHeight = this.$el.children[1].offsetHeight;
        var footerHeight = this.$el.children[2].offsetHeight;
        this.resize_body(this.$el, "#my_vouchers_body", [
          headerHeight,
          // subHeaderHeight,
          footerHeight
        ]);
        this.send_request();
        var vm = this;
        $("#offers-body").scroll(function(){
          if($(this).scrollTop() >= ($(this).prop("scrollHeight") - $(this).height())){
            vm.send_request();
          }
        });
        if(this.$route.params.rewards != null){
          $("#img_rewards").parent().click();
        }
        if(this.$route.params.notId != null){
          this.send_request();
          $("#img_rewards").parent().click();
        }
        $(this.$el).find(".heart").on("click", function(){
          vm.is_changed = true;
        })
        console.log(this.getCurrentTab());
        if(this.getCurrentTab() != 'my_offers'){
          this.favorites = [];
          this.locations = [];
          this.actual_page_v = 1;
          this.actual_page_r = 1;
          $("#"+this.getCurrentTab()).click()
        }
        if(this.getUserRut() == '' ||
           this.getUserRut() == null ||
           this.getUserRut() == undefined){
          this.updateRutValidator(true)
        }
      },
      destroy(){
        this.updateCurrentTab("my_offers")
      },
      computed: {
        ...mapGetters({
          change_offer: 'getIsChangedVoucher'
        })
      },
      watch:{
        change_offer(){
          // this.refresh()
          var vm = this
          vm.favorites.splice(vm.getCurrentOffer(), 1)
          for (var i = 0; i < vm.favorites.length; i++) {
            if(i >= vm.getCurrentOffer()){
              vm.favorites[i].image_validator = false
            }
          }
          setTimeout(function(){
            for (var i = 0; i < vm.favorites.length; i++) {
              vm.favorites[i].image_validator = true
            }
          }, 100);

          // this.refresh()
        }
      }
    }
</script>

<style scoped>
.header {
    box-shadow: none;
}

</style>
