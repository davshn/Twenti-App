<template>
    <div class="grid-container grid-frame offer_show_container">
        <app-header
          :transparent="true"
          :title="title"></app-header>
        <transition
            appear
            name="slideInRight">
          <div
            class="grid-y"
            id="offer_show_body">
            <div
                class="cell">
              <app-instance-header
                :offer="offer"
                :status="offer.attributes['is_favorite']"
                v-if="charge_information"></app-instance-header><!-- End. Header. -->
              <transition
                name="slideInUp">
                <div
                  class="grid-x"
                  v-show="loaded">
                  <div
                    class="cell">
                    <app-instance-title
                      :offer="offer"
                      :vouchers_count="vouchers_count"></app-instance-title><!-- End. Title. -->
                    <!-- <p @click="share()">Compartir</p> -->

                    <div class="cell grid-x" v-if="offer.attributes.published && !offer.attributes.is_class">
                      <section class="small-6 instance__button_container">
                        <favorite-button
                          :itemid="offer.id"
                          :status="is_favorite"
                          :offer = "offer"></favorite-button>
                      </section>
                      <section class="small-6 instance__button_container">
                        <div
                          class="instance__button_container--button"
                          @click.stop="share()">
                          <p>Compartir</p>
                          <share-icon style="height: 16px; width: 15px"></share-icon>
                        </div>
                      </section>
                    </div>

                    <app-instance-description
                      :offer="offer"
                      :tags= "offer.attributes.tags"></app-instance-description><!-- End. Description. -->

                    <div class="grid-x">
                      <div class="cell">
                        <div class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Locales adheridos</h2>
                              <app-instance-object
                                :objects="locations"
                                :object_type="'location'"
                                :route = "'venue_show'"
                                ></app-instance-object>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="grid-x">
                      <div class="cell">
                        <div class="instance__tile instance__terms-and-conditions">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Términos y condiciones</h2>
                              <p class="offerInstance__description">{{ offer.attributes.tc }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div><!-- End. Terms. -->
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>
        <div
          class="button--float"
          v-if="charge_information">
          <div class="" v-if="offer.attributes.published">
            <a
              v-if="offer.attributes.published && offer.attributes.has_code"
              class="button button--shadow instance__redeem_button"
              @click="checkPromotionalCode()">
              {{!offer.attributes.is_class ? 'Canjear oferta' : 'Validar asistencia'}}
            </a>
            <a
              v-else
              class="button button--shadow instance__redeem_button"
              @click="checKRutValidator($route.params.id, offer)">
              Canjear oferta
            </a>
          </div>
          <div class="button button--shadow instance__disabled_button" v-else>
            LA OFERTA NO ESTA DISPONIBLE
          </div>
        </div>
        <app-modal :title="$t('common.offers') |  capitalize"
            :subtitle="$t('drawer.tc') | capitalize"
            :description="offer.attributes.tc"
            :button_text="$t('common.agree_tc') | capitalize">
        </app-modal>
        <qr-button></qr-button>
    </div>

</template>

<script>
    import Info from './Offer_information.vue'
    export default {
        data(){
            return {
                loaded: false,
                offer: {
                    id: '',
                    attributes: {
                        img: '',
                        title: '',
                        "offer-expiry": '',
                        description: '',
                        venues: [],
                        tc: '',
                        "is-voucher": false,
                        tags:[],
                        is_class: false
                    }
                },
                unique: false,
                title: "",
                vouchers_count: 0,
                charge_information: false,
                locations: [],
                is_favorite: false
            }
        },
        methods:{
          checkPromotionalCode(){
            console.log("Aqui abre el modal de codigo");
          },
          checKRutValidator(route, offer){
            if(this.getUserRut() == '' ||
               this.getUserRut() == null ||
               this.getUserRut() == undefined){
              this.updateRutValidator(true)
            }else{
              this.updateRutValidator(false)
              this.checkLoginUser('offer_redeem', true, {id: route, offer: offer})
            }
          },
            shareInFacebook(){
              var vm = this
              window.plugins.socialsharing.shareViaFacebook(vm.offer.attributes.descripcion,
                                                             vm.offer.attributes.img[0].image.url,
                                                             "https://sportlife.karrott.cl"+vm.$route.fullPath,
                                                             function() {console.log('share ok')},
                                                             function(errormsg){alert(errormsg)})
              // window.plugins.socialsharing.share(vm.offer.attributes.name,
              //                                    vm.offer.attributes.descripcion,
              //                                    vm.offer.attributes.img[0].image.url,
              //                                    "http://ec2-34-219-158-63.us-west-2.compute.amazonaws.com"+vm.$route.fullPath)
            },
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
            toggle_modal(){
                $(this.$el).find("#modal_parent").css("display","block");
            },
            include_tags(string){
                if(string.indexOf(',') > -1){
                    var array = string.split(',');
                }else{
                    var array = [];
                    array.push(string);
                }
                return array;
            },
            clickToFavorite(){
              $(event.target).find('.favorite_button').first().click()
            },
            share() {
              $(".header__loader").show();
              $(".loader").show();
              var vm = this
              var obj = {};
              obj['og:type'] = 'object';
              obj['og:title'] = vm.offer.attributes.title;
              obj['og:url'] = "https://sportlife.karrott.cl"+vm.$route.fullPath;
              obj['og:description'] = vm.offer.attributes.description;
              obj['og:image']= vm.offer.attributes.img[0].image.url;
              var options = {
                              method: 'share_open_graph',
                              action: 'og.shares',
                              object: JSON.stringify(obj),
                              caption: 'Sportlife',
                              description: vm.offer.attributes.description,
                              href: "https://sportlife.karrott.cl"+vm.$route.fullPath,
                              message: 'Sportlife',
                              name: 'Sportlife',
                              picture: vm.offer.attributes.img[0].image.url,
                              quote: 'Sportlife',
                              version: 'v3.1'
                          };
              facebookConnectPlugin.showDialog(options,
                  function(response) {
                    $(".header__loader").hide();
                    $(".loader").hide();
                    // window.alert(response);
                  },
                  function(error) {
                    $(".header__loader").hide();
                    $(".loader").hide();
                    // window.alert(JSON.stringify(error));
                  }
              );
              function myFunction() {
                $(".header__loader").hide();
                $(".loader").hide();
              }
              setTimeout(myFunction, 6000);
            }
        },
        components: {
            "appInfo": Info
        },
        mounted(){
          console.log("Esta es generadora de QR");
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            if (window.cordova.platformId == "browser") {
              facebookConnectPlugin.browserInit('2128577704127876');
            }
            var redeemHeight = this.$el.children[1].offsetHeight;
            var footerHeight = this.$el.children[2].offsetHeight;
            try{
                var not = "";
                if(this.$route.params.notId != null){
                    not = "?notification_id="+this.$route.params.notId;
                }
                this.$http.get("app/offers/"+this.$route.params.id + not, {
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
                    this.offer.id = response.body.data.id;
                    this.offer.attributes.img = response.body.data.attributes.images;
                    this.offer.attributes.title = response.body.data.attributes.title;
                    this.offer.attributes.description = response.body.data.attributes.description;
                    this.offer.attributes.tc = response.body.data.attributes.tc;
                    this.offer.attributes["expiration"] = response.body.data.attributes["expiration"];
                    this.offer.attributes["is_favorite"] = response.body.data.attributes["is_favorite"];
                    this.offer.attributes.tags = response.body.data.attributes.tags;
                    this.offer.attributes.published = response.body.data.attributes.published;
                    this.offer.attributes.is_class = response.body.data.attributes.is_class;
                    this.updateCurrentFavorites(response.body.data.attributes.favorites)
                    this.title = response.body.data.attributes["category-name"];
                    this.vouchers_count = response.body.data.attributes['vouchers-count'];
                    this.is_favorite = response.body.meta.is_favorite
                    this.charge_information = true;
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                    for (var i = 0; i < response.body.included.length; i++) {
                      if(response.body.included[i].type == 'locations'){
                        this.locations.push(response.body.included[i])
                      }
                    }
                }, function(response){
                  if(response.body.meta != undefined && response.body.meta != null){
                    if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                      this.checkToken(response.body.meta.authentication_token)
                    }
                  }
                  this.show_error_modal(response.body.errors[0].details);
                }).then(function(response) {
                    if(this.offer.attributes.venues.length > 1 ){
                        this.unique = false
                        $(this.$el).find("[data-slider='slick']").slick({
                            arrows: false,
                            variableWidth: true,
                            infinite: true,
                            centerMode: true,
                            centerPadding: '0px',
                        });
                        $(this.$el).find("[data-slider='slick']").slick('slickNext');
                    }else{
                        this.unique= true
                    }
                    this.loaded = true;
                })
            } catch (e) {
              this.show_error_modal(e.message);
            }
            $("#view_all").click();
            $("#view_all").click();
        }
    }
</script>

<style scoped>
