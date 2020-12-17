<template>
  <article
    class="cell">
    <div
      class="drawer_background"
      v-if="getShowDrawer()"
      @click="updateShowDrawer(false)">
    </div>
    <app-header
      :title="$t('common.offers')"
      :offers_view="true">
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
        :class="{ 'active' : active == index }"
        v-for="(category, index ) in categories"
        @click.stop="active = index; scrollToActive(); updateCurrentCategory(index)"
        :id="'category_id_' + index">
        <span style="white-space: pre;">{{category.attributes.name}}</span>
      </div>
    </section>
    <v-touch
      @swipeleft.prevent="swipeToLeftCategories()"
      @swiperight.prevent="swipeToRightCategories()"
      tag="section"
      class="cell"
      id="offers-body"
      style="position: relative">
      <app-pull-refresh
          element="#offers-body"
          :refresh="refresh">
      </app-pull-refresh>
      <v-touch
        @swipeleft.prevent="swipeToLeftCategories()"
        @swiperight.prevent="swipeToRightCategories()"
        tag="section"
        v-for="(category, index) in categories"
        v-if="active == index"
        class="offer_index__content">
        <v-touch
          @swipeleft.prevent="swipeToLeftCategories()"
          @swiperight.prevent="swipeToRightCategories()"
          tag="div"
          class="offer_index__content--offer offer_instance"
          v-for="(offer, index) in category.offers"
          v-show="getInBlocks()"
          :id="'swipper_card_' + index">
          <figure
            class="offer_instance__image"
            @click="$router.push({name: 'offer_show', params: {
                id: offer.id,
                is_voucher: offer.attributes['is-voucher'],
                is_favorite: offer.attributes['is-favorite']
            }})">
            <div
              v-if="(offer.attributes.redeem_limit - offer.attributes.redeem_count)<=10 &&
                    (offer.attributes.redeem_limit - offer.attributes.redeem_count) >= 0"
              class="offer_instance__image--available_text">
              <b>MENOS DE 10 DISPONIBLES</b>
            </div>
            <image-loader
              :url="getServerImage() + offer.attributes.images[0].image.thumb.url">
              </image-loader>
          </figure>

          <div class="offer_instance__favourite" @click.stop="reload = true">
            <app-favourite
                :itemid="offer.id"
                :status="offer.attributes['is_favorite']"
                class="offer_instance__favourite--icon">
            </app-favourite>
          </div>
          <div
            class="offer_instance__title_container">
            <p class="offer_instance__title">
              {{offer.attributes.title}}
            </p>
          </div>

          <p class="offer_instance__expiry">
            Hasta el {{offer.attributes['expiration'] | moment("dddd DD MMM") | capitalize }}
          </p>
        </v-touch>
        <v-touch
          @swipeleft.prevent="swipeToLeftCategories()"
          @swiperight.prevent="swipeToRightCategories()"
          tag="div"
          class="offer_index__content--offer offer_instance offer_in_list"
          v-for="(offer, index) in category.offers"
          v-show="!getInBlocks()"
          :id="'swipper_list_' + index">
          <div class="offer_in_list__favourite" @click.stop="reload = true">
            <app-favourite
                :itemid="offer.id"
                :status="offer.attributes['is_favorite']"
                class="offer_instance__favourite--icon">
            </app-favourite>
          </div>
          <div class="offer_in_list__container">
            <div
              class="offer_in_list__title_container">
              <p class="offer_in_list__title">
                {{offer.attributes.title}}
              </p>
            </div>
            <p class="offer_in_list__expiry">
              Hasta el {{offer.attributes['expiration']}}
            </p>
          </div>
          <figure
            class="offer_in_list__image"
            @click="$router.push({name: 'offer_show', params: {
                id: offer.id,
                is_voucher: offer.attributes['is-voucher'],
                is_favorite: offer.attributes['is-favorite']
            }})"> <!-- revisar aca -->
            <div
              v-if="(offer.attributes.redeem_limit - offer.attributes.redeem_count)<=10 &&
                    (offer.attributes.redeem_limit - offer.attributes.redeem_count) >= 0"
              class="offer_instance__image--available_text2">
              <p><b>MENOS DE 10 DISPONIBLES</b></p>
            </div>
            <img
              :src="getServerImage() + offer.attributes.images[0].image.thumb.url"
              alt=""
              style="white-space: nowrap;">
          </figure>
        </v-touch>
      </v-touch>
      <!-- <div
        class="offer_style__button"
        @click="checkReload()">
        <qr-icon></qr-icon>
      </div> -->
      <qr-button></qr-button>
    </v-touch>
    <app-footer
      :active_item="2"
      :active_section="'home'">
  </article>
</template>

<script>
  import Favourite from '../.././shared/svg/Favourite.vue'
  export default{
    data(){
      return {
        categories: [],
        show_drawer: false,
        margin_top: "0px",
        url: "app/offers",
        actual_page: 1,
        active: 0,
        in_blocks: true,
        reload: false,
        offers: [],
        slider_ready: false,
        slickOptions: {
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: true,
          variableWidth: true
        }
      }
    },
    components: {
      "appFavourite": Favourite
    },
    methods: {
      swipeToLeftCategories(){
        console.log("swipe left");
        event.stopPropagation()
        if(this.active < this.categories.length-1){
          this.active += 1
          // $('.offer_index__navbar--category')[this.active].scrollIntoView({block: "end", behavior: "smooth"})
          this.scrollToActive()
          this.updateCurrentCategory(this.active)
          console.log(this.getCurrentCategory());
        }
      },
      swipeToRightCategories(){
        console.log("swipe right");
        event.stopPropagation()
        if(this.active > 0){
          this.active -= 1
          this.scrollToActive()
          this.updateCurrentCategory(this.active)
          console.log(this.getCurrentCategory());
          // $('.offer_index__navbar--category')[this.active].scrollIntoView({block: "end", behavior: "smooth"})
        }
      },
      scrollToActive(){
        // $(event.target)[0].scrollIntoView({block: "end", behavior: "smooth"})
        var left = $($('.offer_index__navbar--category')[this.active]).offset().left
        var width = $(".offer_index__navbar").first().width();
        var diff = (left - width/2) + $($('.offer_index__navbar--category')[this.active]).width()/2 + 16
        $(".offer_index__navbar").first().animate({
                  scrollLeft: $(".offer_index__navbar").first().scrollLeft()+diff
        }, 500);
      },
      checkReload(){
        if(this.reload){
          this.refresh()
          this.reload = false
        }
        this.updateInBlocks(!this.getInBlocks())
      },
      toggle_drawer(){
        this.show_drawer = !this.show_drawer;
        this.updateShowDrawer(this.show_drawer)
      },
      send_request(init = false) {
        console.log("Envio de request");
        try{
          // this.$http.get(this.getServer()+this.url+"?page="+vm.actual_page, {
          this.$http.get(this.url+"?page="+this.actual_page, {
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
            this.offers = response.body.data
            this.photos = response.body.included
            // this.mergeCategoriesWithOffers()
            // console.log(this.categories);
            console.log(this.offers);
            if(response.body.meta.rewards_count != undefined && response.body.meta.rewards_count != null){
                this.updateRewardsCount(response.body.meta.rewards_count);
            }
            if(response.body.meta != undefined && response.body.meta != null){
              if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                this.checkToken(response.body.meta.authentication_token)
              }
            }
            this.findCategories();
            this.slider_ready = true
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
          });
        }catch(e){
          this.show_error_modal(e.message);
        }
      },
      refresh() {
        this.actual_page = 1;
        this.categories =  [];
        // this.findCategories();
        this.send_request(true);
      },
      mergeCategoriesWithOffers(){
        for (var i = 0; i < this.categories.length; i++) {
          this.$set(this.categories[i], 'offers', [])
          // this.categories[i].offers = []
          for (var j = 0; j < this.offers.length; j++) {
            if(this.offers[j].relationships.categories.data.length > 0 &&
               (this.offers[j].relationships.categories.data[0].id == this.categories[i].id)){
                this.categories[i].offers.push(this.offers[j])
            }
          }
        }
        this.checkCategories()
      },
      checkCategories(){
        for (var i = 0; i < this.categories.length; i++) {
          if(this.categories[i].offers.length <= 0){
            this.categories.splice(i, 1)
          }
        }
        console.log("Categories");
        console.log(this.categories);
      },
      onKeyboardHide(){
        var headerHeight = this.$el.children[0].offsetHeight;
        var footerHeight = this.$el.children[2].offsetHeight;
        var components = [headerHeight, footerHeight];
        this.resize_body(this.$el, "#search-body", components);
      },
      findCategories(){
        // if(this.getCategories().length <= 0){
        try {
          this.$http.get('app/categories',{
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
          })
          .then(function(response){
            console.log(response);
            this.updateCategories(response.body.data)
            this.categories = response.body.data
            if(this.getCurrentCategory() != ''){
              this.active = Number(this.getCurrentCategory())
              console.log(this.active);
              var vm = this
              setTimeout(function(){
                vm.scrollToActive()
                console.log($('#category_id_'+ vm.active));
              }, 500);
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
            console.log(response);
            alert(response)
          })
        } catch (e) {
          alert(e.message)
        }
        // }
      }
    },
    mounted(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(this.findPosition);
      var headerHeight = this.$el.children[0].offsetHeight;
      // var footerHeight = this.$el.children[2].offsetHeight;
      var footerHeight = $('#footer-user').height();
      var categoryContainer = $('.offer_index__navbar').height();
      var components = [headerHeight, footerHeight, categoryContainer];
      this.resize_body(this.$el, "#offers-body", components);
      this.updateShowDrawer(this.show_drawer);
      vm.send_request();
      document.addEventListener('hidekeyboard', vm.onKeyboardHide, false);
      $('.offer_style__button').css('bottom', ($('#footer-user').height() + 15) + 'px')
      let data_test = {attributes:{email:'test@mail.com',rut: '',password: 'TestAccount' }}
      console.log(this.encrypt(data_test).toString());
    },
    //
    watch:{
      categories(){
        this.mergeCategoriesWithOffers()
      }
    }
  }
</script>

<style scoped>
  #offers-body{
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }
</style>
