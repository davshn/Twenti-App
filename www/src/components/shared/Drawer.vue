<template>
    <div
        class="container grid-y drawer">
        <div class="small-3 drawer__user-head grid-x">
          <img
            src="https://s3-us-west-2.amazonaws.com/karrottsportlife/ico_cerrar.svg"
            alt=""
            class="drawer__close"
            @click="toggle_drawer()">
          <!-- <div @click="toggle_drawer()"
          class="drawer__close">x</div> -->

          <div
            class="drawer__user-photo"
            :style="{backgroundImage: 'url('+getProfilePicture()+')'}">
          </div>
          <p class="drawer__user-name">
            {{ activeUser() | capitalize }} <br>
            <!-- <span v-if="activeUser() != 'invitado'">{{ getRewardsCount() + ' Obsequios nuevos' }}</span> -->
            <!-- <span v-else>¡Ingresa y recibe las mejores ofertas!</span> -->
            <div class="row drawer__data-app"
                 v-if="activeUser() != 'invitado'">
              <div class="col-xs-4"
                @click="goToRewards()">
                <span>REWARDS</span>
                <div class="">
                  <img src="./src/assets/images/icons/icons_new/perfil_rewards.svg" alt="">
                  <span class="data-app_number">{{this.getRewardsCount()}}</span>
                </div>
              </div>
              <div
                class="col-xs-4"
                @click="goToFavorites()">
                <span class="">FAVORITAS</span>
                <div class="">
                  <img src="./src/assets/images/icons/icons/ico_likes_black.svg" alt="">
                  <span class="data-app_number">{{this.getFavoritesCount()}}</span>
                </div>
              </div>
              <div class="col-xs-4"></div>
              <!-- <div class="col-xs-4"
                @click="goToLocations()">
                <span>SEDES</span>
                <div class="">
                  <img src="./src/assets/images/icons/icons_new/perfil_locaciones.svg" alt="">
                  <span class="data-app_number">{{this.getLocationsCount()}}</span>
                </div>
              </div> -->
            </div>
            <div class="row drawer__data-app"
                 v-else>
                 <span class="text_span_not_login">¡Ingresa y recibe las mejores ofertas!</span>
            </div>
          </p>
        </div>

        <div  v-if="getUserToken()"
              class="small-8 drawer__user">

            <div class="col-xs-12 drawer__user--section">
                <div class="col-xs-2">
                    <img
                    src="./src/assets/images/icons/icons_new/menu_perfil.svg"
                    alt=""
                    class="drawer__icon">
                </div>
                <p @click="toggle_drawer(); $router.push({name:'newProfile'})"
                    class="drawer__title col-xs-9">PERFIL<br>
                    <span>Editar información personal</span>
                </p>
            </div>

            <!-- <div
              class="col-xs-12 drawer__user--section">
              <div class="col-xs-2">
                <svg class="drawer__icon drawer__icon--soon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.872 20">
                  <g id="menu_historial" transform="translate(0 -21.716)">
                    <g id="Group_499" data-name="Group 499" transform="translate(0 21.716)">
                      <g id="Group_498" data-name="Group 498" transform="translate(0 0)">
                        <path id="Path_679" data-name="Path 679" class="cls-1" d="M80.725,103.574l-1.047-.9a10.03,10.03,0,0,0-.879,1.192l1.172.733A8.472,8.472,0,0,1,80.725,103.574Z" transform="translate(-75.404 -99.187)"/>
                        <path id="Path_680" data-name="Path 680" class="cls-1" d="M125.243,58.991l-.742-1.163a9.995,9.995,0,0,0-1.189.885l.9,1.041A8.667,8.667,0,0,1,125.243,58.991Z" transform="translate(-117.997 -56.272)"/>
                        <path id="Path_681" data-name="Path 681" class="cls-1" d="M85.924,27.232a10.015,10.015,0,0,0-13-4.66l.559,1.261a8.623,8.623,0,1,1-4.2,11.748l-1.234.616a10,10,0,1,0,17.876-8.965Z" transform="translate(-65.115 -21.716)"/>
                        <path id="Path_682" data-name="Path 682" class="cls-1" d="M4.137,162.8l-.823.821a8.385,8.385,0,0,1,.483-1.994c.053-.141.11-.281.17-.42L2.7,160.66c-.069.159-.138.321-.2.483a9.758,9.758,0,0,0-.6,2.6L.975,162.8,0,163.779l2.556,2.556,2.556-2.556Z" transform="translate(0 -154.672)"/>
                        <path id="Path_683" data-name="Path 683" class="cls-1" d="M251.312,109.716v6.9h4.137v-1.379h-2.758v-5.517Z" transform="translate(-240.481 -105.923)"/>
                        <rect id="Rectangle_1125" data-name="Rectangle 1125" class="cls-1" width="1.379" height="1.379" transform="translate(16.348 9.309)"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <p class="drawer__title--soon drawer__title col-xs-9">HISTORIAL<br>
                  <span>Próximamente</span>
              </p>
            </div> -->

            <div class="col-xs-12 drawer__user--section">
                <div class="col-xs-2">
                    <img
                    src="./src/assets/images/icons/icons_new/referidos.svg"
                    alt=""
                    class="drawer__icon">
                </div>
                <p @click="toggle_drawer(); $router.push({name:'referrals'})"
                    class="drawer__title col-xs-9">PLAN REFERIDOS<br>
                    <span>Invita a tus amigos</span>
                </p>
            </div>

            <!-- <div
              class="col-xs-12 drawer__user--section">
              <div class="col-xs-2">
                <svg class="drawer__icon drawer__icon--soon"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.976 20">
                  <g id="menu_calificacion" transform="translate(0.001 -11.905)">
                    <g id="Group_482" data-name="Group 482" transform="translate(-0.001 11.905)">
                      <path id="Path_669" data-name="Path 669" class="cls-1" d="M20.931,19.458a.881.881,0,0,0-.711-.6l-6.181-.9-2.767-5.6a.918.918,0,0,0-1.581,0l-2.767,5.6-6.171.9a.882.882,0,0,0-.488,1.5L4.73,24.719,3.68,30.876a.881.881,0,0,0,1.281.927l5.522-2.9L16.015,31.8a.882.882,0,0,0,1.278-.931l-1.058-6.155,4.472-4.358A.878.878,0,0,0,20.931,19.458Zm-6.26,4.323a.883.883,0,0,0-.253.781l.834,4.852-4.36-2.291a.886.886,0,0,0-.41-.1.874.874,0,0,0-.411.1l-4.353,2.29.828-4.852a.881.881,0,0,0-.253-.779l-3.52-3.436,4.866-.712a.879.879,0,0,0,.663-.48l2.181-4.413,2.181,4.413a.882.882,0,0,0,.663.481l4.872.712Z" transform="translate(0.001 -11.905)"/>
                    </g>
                  </g>
                </svg>

              </div>
              <p
                class="drawer__title--soon drawer__title col-xs-9">CALIFÍCANOS<br>
                  <span>Próximamente</span>
              </p>
            </div> -->

            <div class="col-xs-12 drawer__user--footer">
              <div class="drawer__user--footer__karrott_icon">
                <p>Powered by</p>
                <img src="https://s3-us-west-2.amazonaws.com/fuserewards/karrot.png" alt="">
              </div>
              <div class="drawer__user--footer__fusepong_icon">
                <span>v1.0.45</span>
                <p class="">Developed by
                  <a href="http://www.fusepong.com" taget="_blank"><img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/menu_fusepong.svg"></a></p>
              </div>

            </div>
        </div>

        <div  class="small-8 drawer__user"
              v-else>

            <div class="col-xs-12 drawer__user--section">
                <div class="col-xs-2">
                    <img
                    src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/menu_ingresar.svg"
                    alt=""
                    class="drawer__icon">
                </div>
                <p @click="toggle_drawer(); $router.push({name:'log_in'})"
                    class="drawer__title col-xs-9">INGRESAR<br>
                    <span>Iniciar sesión en SportLife</span>
                </p>
            </div>

            <div
              class="col-xs-12 drawer__user--section">
              <div class="col-xs-2">
                  <img
                  src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/menu_registrarme.svg"
                  alt=""
                  class="drawer__icon">
              </div>
              <p @click="toggle_drawer(); $router.push({name:'sign_up'})"
                class="drawer__title col-xs-9">REGISTRARME<br>
                  <span>Sé parte de SportLife</span>
              </p>
            </div>

            <div class="col-xs-12 drawer__user--footer">
              <div class="drawer__user--footer__karrott_icon">
                <p>Powered by</p>
                <img src="https://s3-us-west-2.amazonaws.com/fuserewards/karrot.png" alt="">
              </div>
              <div class="drawer__user--footer__fusepong_icon">
                <span>v1.0.45</span>
                <p class="">Developed by
                  <a href="http://www.fusepong.com" taget="_blank"><img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/profile_icons/menu_fusepong.svg"></a></p>
              </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
      data(){
        return{
          show_drawer: true
        }
      },
      props: {
        margin_top: {
          type: String,
          default: "0px"
        }
      },
      mounted(){
        var mt = this.margin_top.split("px")[0];
        this.resize_body(this.$el, this.$el, [mt]);
        this.updateShowDrawer(this.show_drawer);
      },
      methods: {
        toggle_drawer(){
          this.show_drawer = !this.show_drawer;
          this.updateShowDrawer(this.show_drawer)
        },
        logOut(){
          this.updateShowDrawer(false);
          this.deleteSession('offers_index', true);
        },
        openBrowser(){
          window.open('http://fusepong.com/privacy-policies', '_system');
        },
        goToFavorites(){
          this.updateCurrentTab('my_offers')
          this.checkLoginUser('my_favorites')
          this.toggle_drawer()
        },
        goToLocations(){
          this.updateCurrentTab('my_locations')
          this.checkLoginUser('my_favorites')
          this.toggle_drawer()
        },
        goToRewards(){
          this.checkLoginUser('my_rewards')
          this.toggle_drawer()
        }
      }
    }
</script>

<style scoped>
    #drawer_body{
        padding: 24px;
        background: rgba(0, 24, 33, 0.84);
        position: absolute;
        z-index: 4;
        max-height:100%;
    }
    p.user_name{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 13px;
        font-weight: 600;
        line-height: 16px;
        color: #FFFFFF;
    }
    .drawer_options{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 13px;
        font-weight: 500;
        line-height: 16px;
        color: #BDBDBD;
        margin-bottom: 18px;
    }
    .drawer_options span:last-child{
        margin-left: 14px;
    }
    .drawer_item{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 1px;
        color: #5B96FC;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .drawer_item img{
        width: 18px;
        display: block;
        margin: auto;
    }
    .profile-img{
        width: 48px;
        background: black;
        border-radius: 50%;
        height: 48px;
    }
    .in-progress{
        margin-top: -10px;
    }
    .line_div{
      border-bottom: 1px solid red;
      height: 200px;
    }
    .text_span_not_login{
      color: #009CDE;
      font-size: 13px;
      padding: 0 15px;
      line-height: 5;
    }
</style>
