<template>
  <article>
    <div
      class="grid-container grid-frame offer_show_container"
      v-show="!show_camera">
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
                    <div class="grid-x" v-if="offer.attributes.is_class">
                      <div class="cell">
                        <div
                          class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Tus clases</h2>
                              <p class="offerInstance__description">
                                {{ offer.attributes.user_available_class }} clases disponibles de {{offer.attributes.user_all_class}}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <app-instance-description
                      :offer="offer"
                      :tags= "offer.attributes.tags"></app-instance-description><!-- End. Description. -->
                    <div class="grid-x" v-if="!offer.attributes.is_class">
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

                    <div class="grid-x" v-if="offer.attributes.is_class && offer.attributes.trainers.length > 0">
                      <div class="cell">
                        <div class="instance__tile">
                          <div class="grid-x">
                            <div class="cell">
                              <h2 class="offerInstance__sectionTitle">Entrenadores</h2>
                              <div class="offerInstance__sectionTitle--trainers">
                                <div
                                  v-for="(trainer, index) in offer.attributes.trainers"
                                  v-if="trainer.attributes.image.thumb != undefined"
                                  class="offerInstance__manager--image"
                                  :style="{backgroundImage: 'url('+ getServerImage() + trainer.attributes.image.thumb.url +')'}">
                                </div>
                              </div>
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
              v-if="offer.attributes.has_code"
              class="button button--shadow instance__redeem_button"
              @click="checkPromotionalCode()">
              {{!offer.attributes.is_class ? 'Canjear oferta' : 'Validar asistencia'}}
            </a>
            <a
              v-else
              class="button button--shadow instance__redeem_button"
              @click="scanQR()">
              {{!offer.attributes.is_class ? 'Canjear oferta' : 'Validar asistencia'}}
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
        <code-modal
          v-if="offer.attributes.has_code && getCodeModal()"
          :random_code="random_code"
          :code="offer.attributes.reedem_code"
          :offer_id="offer.id">
        <qr-button></qr-button>
    </div>
    <div
      class="instance__qr_lector"
      v-show="show_camera">
      <p class="instance__qr_lector--text">
        Ubique el código QR<br>en el centro del recuadro
      </p>
      <section class="instance__qr_lector--section">
        <div class="qr_lector__indicator">
          <section class="qr_lector__indicator--top_corner">
          </section>
          <section class="qr_lector__indicator--top_corner">
          </section>
        </div>
        <div class="qr_lector__indicator">
          <section class="qr_lector__indicator--bottom_corner">
          </section>
          <section class="qr_lector__indicator--bottom_corner">
          </section>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
    import Info from './../Offer_information.vue'
    export default {
        data(){
            return {
              random_code: '',
              show_camera: false,
              voucher_id: null,
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
                        is_class: false,
                        trainers: []
                    }
                },
                unique: false,
                title: "",
                vouchers_count: 0,
                charge_information: false,
                locations: [],
                is_favorite: false,
                scanner_params: {
                  text_title: "", // Android only
                  text_instructions: "Coloca el codigo QR en el centro de la pantalla", // Android only
                  // camera: "front" || "back", // defaults to "back"
                  // flash: "on" || "off" || "auto", // defaults to "auto". See Quirks
                  drawSight: true //|| false //defaults to true, create a red sight/line in the center of the scanner view.
                }
            }
        },
        beforeDestroy(){
          var vm = this
          QRScanner.destroy(function(status){
            vm.show_camera = false
          });
          vm.$el.style.background="#fafafa"
        },
        methods:{
          checkPromotionalCode(){
            console.log("Aqui abre el modal de codigo");
            if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
              if(this.getUserRut() != '' && this.getUserRut() != undefined && this.getUserRut() != null){
                var vm = this
                try{
                  var temp = {
                    offer_id: Number(vm.offer.id)
                  }
                  vm.$http.post("app/offers/checkVoucherExistence",{
                    data: vm.encrypt(temp).toString()
                  },{
                    headers:
                    {
                        "Authorization": "Bearer " + vm.getUserToken(),
                        "X-Device-ID" : vm.getDeviceId(),
                        "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                    }
                  }
                  ).then(function(response){
                    console.log(response);
                    if(response.status == 200){
                      this.random_code = Math.random().toString(36).substring(2, 8);
                      this.updateCodeModal(true);
                    }else{
                      this.updateCodeModal(false);
                      this.show_error_modal(response.body.data, 'Aviso!', 'Cerrar')
                    }
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                  }, function(response){
                    this.show_error_modal(response.body.errors[0].details);
                  })

                }catch(e){
                    vm.show_error_modal(e.message);
                }

              }else{
                this.updateRutValidator(true)
              }
            }else{
              this.$router.push({name: 'log_in'})
            }
          },
          scanQR() {
            var vm = this;
            vm.offers = []
            console.log(vm.getAgentId());
            if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
              if(this.getUserRut() != '' && this.getUserRut() != undefined && this.getUserRut() != null){
                this.updateRutValidator(false)
                try {
                  this.$http.get('app/offers/' + this.offer.id + "/redeem_scan",{
                    headers:
                    this.getUserToken() != '' ?
                    {
                        "Authorization": "Bearer " + this.getUserToken(),
                        "X-Device-ID" : this.buildDeviceId(),
                        "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                    } :
                    {
                      "X-Device-ID" : this.buildDeviceId()
                    }
                  }).then(function(response){
                    if(response.status == 200){
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                        }
                        if(response.body.meta.voucher_id != undefined && response.body.meta.voucher_id != null){
                          this.voucher_id = response.body.meta.voucher_id
                        }
                      }
                      if(this.getUserRut() != '' &&
                         this.getUserRut() != null &&
                         this.getUserRut() != undefined){
                        this.updateRutValidator(false)
                        if(cordova.plugins != undefined && cordova.plugins != null){
                          this.scanQRTemp()
                        }else{
                          var vm = this
                          // cloudSky.zBar.scan(vm.scanner_params, vm.onSuccess, vm.onFailure)
                          var callback = function(err, contents){
                            if(err){
                              alert(err._message);
                            }
                            // alert('The QR Code contains: ' + contents);
                            vm.onSuccess(contents)
                            QRScanner.destroy(function(status){
                              vm.show_camera = false
                              vm.$el.style.background="#fafafa"
                            });

                          };
                          QRScanner.show(function(status){
                            vm.$el.style.background ="transparent"
                            vm.show_camera = true
                            QRScanner.scan(callback)
                          });
                        }
                      }else{
                        this.updateRutValidator(true)
                      }

                    }else{
                      this.show_error_modal(response.body.errors[0].details, '', 'Regresar')
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
                      this.show_error_modal(response.body.errors[0].details, '', 'Regresar');
                    }
                  })
                } catch (e) {
                  this.show_error_modal(response.body.errors[0].details)
                }
              }else{
                this.updateRutValidator(true)
              }
            }else{
              this.$router.push({name: 'log_in'})
            }

          },
          onSuccess(result){
            console.log("Ok Scan");
            console.log(result);
            var vm = this
            vm.offers = []
            try{
              var temp = {
                voucher_id: Number(vm.voucher_id),
                offer_id: Number(vm.offer.id),
                location_id: Number(result)
              }
              vm.$http.post("app/offers/scan_location_qr",{
                data: vm.encrypt(temp).toString()
              },{
                headers:
                vm.getUserToken() != '' ?
                {
                    "Authorization": "Bearer " + vm.getUserToken(),
                    "X-Device-ID" : vm.getDeviceId(),
                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                } :
                {
                  "X-Device-ID" : vm.getDeviceId(),
                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                }
              }
              ).then(function(response){
                console.log(response);
                if(response.body.meta != undefined && response.body.meta != null){
                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                    this.checkToken(response.body.meta.authentication_token)
                  }
                }
                // this.$router.push({name: "offers_index"})
                this.show_camera = false
              }, function(response){
                this.show_error_modal(response.body.errors[0].details);
              })

            }catch(e){
                vm.show_error_modal(e.message);
            }
          },
          onFailure(result){
            console.log("Error");
            console.log(result);
            // this.show_error_modal(result);
          },
          scanQRTemp() {
              var vm = this;
              vm.offers = []
              cordova.plugins.barcodeScanner.scan(
                function (result) {
                    try{
                        if( result.format == "QR_CODE" ){
                          let qr_object = JSON.parse(result.text)
                          var params = {
                            voucher_id: Number(vm.voucher_id),
                            offer_id: Number(vm.offer.id),
                            location_id: Number(qr_object)
                          }
                          vm.$http.post("app/offers/scan_location_qr",{
                            data: vm.encrypt(params).toString()
                          },{
                            headers:
                            vm.getUserToken() != '' ?
                            {
                                "Authorization": "Bearer " + vm.getUserToken(),
                                "X-Device-ID" : vm.getDeviceId(),
                                "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                            } :
                            {
                              "X-Device-ID" : vm.getDeviceId(),
                              "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                            }
                          }
                          ).then(function(response){
                            console.log(response);
                            if(response.body.meta != undefined && response.body.meta != null){
                              if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                this.checkToken(response.body.meta.authentication_token)
                              }
                            }
                            // this.$router.push({name:"offers_index"})
                          }, function(response){
                            this.show_error_modal(response.body.errors[0].details);
                          })
                        }
                    }catch(e){
                        vm.show_error_modal(e.message);
                    }
                },
                function (error) {
                    vm.show_error_modal("Scanning failed: " + error);
                }
              );
          },



            shareInFacebook(){
              var vm = this
              window.plugins.socialsharing.shareViaFacebook(vm.offer.attributes.descripcion,
                                                             vm.offer.attributes.img[0].image.url,
                                                             "https://sportlife.karrott.cl"+vm.$route.fullPath,
                                                             function() {
                                                               alert("Compartido")
                                                              //  vm.saveSharedRegister()
                                                               console.log('share ok')
                                                             },
                                                             function(errormsg){alert(errormsg)})
              // window.plugins.socialsharing.share(vm.offer.attributes.name,
              //                                    vm.offer.attributes.descripcion,
              //                                    vm.offer.attributes.img[0].image.url,
              //                                    "http://ec2-34-219-158-63.us-west-2.compute.amazonaws.com"+vm.$route.fullPath)
            },
            saveSharedRegister(){
              var vm = this
              try{
                var params = {
                  offer_id: Number(vm.offer.id)
                }
                vm.$http.post("app/offers/save_shared_register",{
                  data: vm.encrypt(params).toString()
                },{
                  headers:
                  vm.getUserToken() != '' ?
                  {
                      "Authorization": "Bearer " + vm.getUserToken(),
                      "X-Device-ID" : vm.getDeviceId(),
                      "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                  } :
                  {
                    "X-Device-ID" : vm.getDeviceId(),
                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                  }
                }
                ).then(function(response){
                  console.log(response);
                  if(response.body.meta != undefined && response.body.meta != null){
                    if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                      this.checkToken(response.body.meta.authentication_token)
                    }
                  }
                }, function(response){
                  console.log(response.body.errors[0].details);
                })
              }catch(e){
                  console.log(e.message);
              }
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
              var normal_options = {
                	method: "share",
                  object: JSON.stringify(obj),
                	href: "https://sportlife.karrott.cl"+vm.$route.fullPath,
                	caption: "Such caption, very feed.",
                	description: vm.offer.attributes.description,
                	picture: vm.offer.attributes.img[0].image.url,
                  // picture: 'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
                	// hashtag: '#Sportlife',
                	share_feedWeb: true, // iOS only
                }
              var options = {
                              method: 'share_open_graph',
                              action: 'og.shares',
                              // action_properties:JSON.stringify(obj),
                              object: JSON.stringify(obj),
                              caption: 'Sportlife',
                              description: vm.offer.attributes.description,
                              href: "https://sportlife.karrott.cl"+vm.$route.fullPath,
                              message: 'Sportlife',
                              name: 'Sportlife',
                              picture: vm.offer.attributes.img[0].image.url,
                              quote: 'Sportlife',
                              version: 'v3.3'
                          };
              // FB.ui(options, function(response){
              //   // Debug response (optional)
              //   console.log(response);
              //   $(".header__loader").hide();
              //   $(".loader").hide();
              //   // alert("Compartido")
              //   vm.saveSharedRegister()
              // });
              facebookConnectPlugin.showDialog(options,
                  function(response) {
                    $(".header__loader").hide();
                    $(".loader").hide();
                  },
                  function(error) {
                    $(".header__loader").hide();
                    $(".loader").hide();
                    // alert("No se pudo compartir")
                    // window.alert(JSON.stringify(error));
                  }
              );
              function myFunction() {
                $(".header__loader").hide();
                $(".loader").hide();
                vm.saveSharedRegister()
              }
              setTimeout(myFunction, 6000);
            }
        },
        components: {
            "appInfo": Info
        },
        beforeMount(){
          console.log(this.$route);
          console.log("Route");
          console.log(this.$route.params);
        },
        mounted(){
          console.log(FB);
          console.log("Esta abre la camara para scan");
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);

            if (window.cordova.platformId == "browser") {
              facebookConnectPlugin.browserInit('2128577704127876');
            }
            // var redeemHeight = this.$el.children[1].offsetHeight;
            // var footerHeight = this.$el.children[2].offsetHeight;
            try{
                var not = "";
                if(this.$route.params.notId != null){
                    not = "?notification_id="+this.$route.params.notId;
                }
                var link = 'offers'
                if(this.$route.params.is_class){
                  link = 'classes'
                }
                this.$http.get("app/"+ link +"/"+this.$route.params.id + not, {
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
                    this.offer.attributes.has_code = response.body.data.attributes.has_code;
                    this.offer.attributes.reedem_code = response.body.data.attributes.reedem_code;
                    this.updateCurrentFavorites(response.body.data.attributes.favorites)
                    this.title = response.body.data.attributes["category-name"];
                    this.vouchers_count = response.body.data.attributes['vouchers-count'];
                    this.is_favorite = response.body.meta.is_favorite
                    if(this.$route.params.is_class){
                      this.offer.attributes.user_available_class = response.body.data.attributes.user_available_class
                      this.offer.attributes.user_all_class = response.body.data.attributes.user_all_class
                      let trainers = response.body.data.attributes.trainers
                      for (var i = 0; i < trainers.length; i++) {
                        trainers[i].published = true
                        this.offer.attributes.trainers.push({attributes: trainers[i]})
                      }
                      console.log("trainers");
                      console.log(this.offer.attributes.trainers);
                      this.offer.attributes.expiration =  response.body.meta.limit_date
                    }
                    this.charge_information = true;
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                    if(this.$route.params.is_class != true){
                      for (var i = 0; i < response.body.included.length; i++) {
                        if(response.body.included[i].type == 'locations'){
                          this.locations.push(response.body.included[i])
                        }
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
                  if(this.$route.params.is_class != true){
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
                  }
                    this.loaded = true;
                })
            } catch (e) {
              this.show_error_modal(e.message);
            }
            $("#view_all").click();
            $("#view_all").click();
            console.log("Vue element");
            console.log(this.$el);
        }
    }
</script>
