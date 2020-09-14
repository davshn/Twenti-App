<template >
  <article class="categories" style="width: 100vw; height: 100vh;">
    <div
      class="drawer_background"
      v-if="getShowDrawer()"
      @click="updateShowDrawer(false)">
    </div>
    <transition
      name="slide">
      <v-touch
        @swipeleft="toggle_drawer()"
        tag="app-drawer"
        :margin_top="margin_top"
        v-if="getShowDrawer()"
        ></v-touch>
    </transition>
    <section class="coupon__nav" style="padding: 30px 28px 0;">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/menu.jpg"
        alt=""
        @click="updateShowDrawer(true)">
      <p style="text-align: center; color: #FF0202; font-size: 14px; font-weight: bold">
        Busca tu descuento {{getFirstName() != '' && getFirstName() != null ? getFirstName() : getEmail()}}</p>
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg"
        alt=""
        @click="$router.push({name: 'notifications'})">
    </section>
    <section class="categories__search_bar">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/search.png" alt="">
      <input type="text" name="search" placeholder="Busca por comercio, producto o servicio">
    </section>
    <section class="categories__tabs">
      <div
        class="categories__tabs--tab"
        :class="{'active' : selected == 'Productos'}"
        @click="selected = 'Productos'">
        Productos
      </div>
      <div
        class="categories__tabs--tab"
        :class="{'active' : selected == 'Servicios'}"
        @click="selected = 'Servicios'">
        Servicios
      </div>
    </section>
    <section class="categories__container">
      <div
        style="width: calc(30% - 20px); margin: 15px 10px; "
        class=""
        v-for="(category, index) in categories.slice(0, 9)"
        @click="$router.push({name: 'instance_category', params: {id: category.id}})">
        <div class="" style="width: 100%; height: 66px; background-color:#FFDF8E; border-radius:10px; ">
          <img :src="category.image.url" alt="">
        </div>
        <p style="font-size: 10px; text-align: center;">{{category.name}}</p>
      </div>
    </section>
    <section class="category__banner" @click="$router.push({name: 'coupon'})">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/Home_banner.jpg" alt="">
    </section>
    <section>
      <p class="text_collet">Valor a pagar</p>
      <input 
        v-model="value"
        class="input_collet" type="text"> 
      <div class="content_btn_colect">
        <button class="button_collet"
                @click="createPurchace()">pagar
        </button>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      categories: [],
      selected: 'Productos',
      value: null
    }
  },
  methods:{
    findCategories(current_route){
      console.log(current_route);
      try {
        this.$http.get(current_route,
        ).then(function(response){
          this.categories = response.body.data.slice(0, 9);
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
    createPurchace(){
      var vm = this;
      var temp = {
          attributes: {
            state: "CREADO",
            client_id: Number('1'),
          }
        }
      console.log('##### DATA ##### ', temp)
      try{
        vm.$http.post("purchaces",{
          data: vm.encrypt(temp).toString(),
          state: 'CREADO',
          client_id: Number('1'),
          value: this.value
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
          window.open(response.body.url,'_system')
          if(response.body.meta != undefined && response.body.meta != null){
            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
              this.checkToken(response.body.meta.authentication_token)
            }
          }
          // this.$router.push({name: "offers_index"})
          this.show_camera = false
        }, function(response){
          this.show_error_modal(response.body.errors[0].details);
          window.open(response.body.url,'_system')
        })

      }catch(e){
          vm.show_error_modal(e.message);
          
      }
    },
  },
  watch:{
    selected(){
      var route = ''
      if(this.selected == "Productos"){
        route = "find_product_categories"
      }else if(this.selected == "Servicios"){
        route = "find_service_categories"
      }
      this.findCategories(route)
    }
  },
  mounted(){
    this.findCategories("find_product_categories")
  }
}
</script>

<style lang="css">
  .content_btn_colect {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text_collet {
    color: #FF0202;
    font-size: 16px;
    line-height: 1.5;
    font-weight: normal;
    font-family: "Hind", Arial, "Helvetica Neue", Helvetica, sans-serif;
    -webkit-font-kerning: auto;
    font-kerning: auto;
    letter-spacing: 0.015em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-weight: 900;
  }
  .input_collet {
    border: 1px solid #ff0202;
  }
  .button_collet {
    background-color: white;
    color: #ff0202;
    border: 1px solid #ff0202;
    height: 50px;
    width: 150px;
    align-self: center;
    justify-self: center;
    align-items: center;
  }

</style>
