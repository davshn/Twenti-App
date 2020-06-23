<template>
    <div
        class="drawer">
        <section class="drawer__header">
          <div>
            <div class="drawer__header--principal">
              <p>Juan Ramirez</p>
            </div>
            <p class="drawer__header--city">Bogotá</p>
          </div>
        </section>
        <section class="drawer__content">
          <div
            class="drawer__content--section"
            @click="toggle_drawer(); $router.push({name: 'profile'})">
            <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/profile.jpg" alt="">
            <p>Mi cuenta</p>
          </div>
          <div
            class="drawer__content--section"
            @click="toggle_drawer(); $router.push({name: 'user_history'})">
            <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/history.jpg" alt="">
            <p>Historial de compras</p>
          </div>
          <div
            class="drawer__content--section"
            @click="toggle_drawer(); $router.push({name: 'favorites'})">
            <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/favorites.jpg" alt="">
            <p>Mis promociones favoritas</p>
          </div>
          <div
            class="drawer__content--section"
            @click="toggle_drawer(); $router.push({name: 'points'})">
            <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/points.jpg" alt="">
            <p>Puntos acumulados</p>
          </div>
          <div
            class="drawer__content--section"
            @click="toggle_drawer(); $router.push({name: 'support'})">
            <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/support.jpg" alt="">
            <p>Soporte</p>
          </div>
        </section>
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
