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
      <input type="text"
        name="search"
        placeholder="Busca por comercio, producto o servicio"
        v-model="current_search"
        >
    </section>
    <section class="categories__note"
      v-if="current_search.length > 0">
        <p class="categories__note--text">
          Encuentra las promociones de comercios en <br>
          línea identificadas con este ícono
        </p>
        <div class="categories__note--img">
          <img src="./src/assets/images/icono_flecha_completa.svg" alt="">
        </div>
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
    <section v-if="current_search.length <= 0" class="categories__container">
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
    <section v-if="current_search.length <= 0" class="category__banner" @click="$router.push({name: 'coupon'})">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/Home_banner.jpg" alt="">
    </section>
    <section v-if="current_search.length > 0">
      <div class="categories__search_title">
        <p class="categories__search_title--title">
          {{ total_results }} Resultados encontrados
        </p>
        <div @click="updateModalFilterSearch(true)"
          class="categories__search_title--button" >
          <img src="./src/assets/images/filter_search.svg" alt="">
          <p>Filtrar</p>
        </div>
      </div>
      <div class="categories__search_content"
        v-for="(search, index) in searchs" :key="index">
        <div class="categories__search_content--img">
          <div>
            <span >-{{ search.discount_value }}%</span>
          </div>
          <div  :style="{backgroundImage: 'url(' + search.image.url +')'}">
          </div>
        </div>
        <div class="categories__search_content--text">
          <h6>{{ search.title }}</h6>
          <p>{{ search.description }}</p>
        </div>
      </div>
    </section>
    <modal-filter-search
      @handle-cancel-modal-filter-search="cancelModalFilterSearch"
      @handle-apply-modal-filter-search="applyModalFilterSearch"
      v-if="getModalFilterSearch()">
    </modal-filter-search>
    <modal-payment
      v-if="active_modal_payment"
      @handle-cancel-modal-payment="cancelModalPayment"
    >
    <modal-payment>
  </article>
</template>

<script>
import ModalFilterSearch from './ModalFilterSearch.vue'
import ModalPayment from './ModalPayment.vue'
import _ from 'lodash';

export default {
  data(){
    return{
      categories: [],
      selected: 'Productos',
      value: null,
      flag_search: true,
     /*  searchs: [
        {
          discount_value: 10,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Falabela',
          description: 'Hasta 10% de descuento Televisores Samsung'
        },
        {
          discount_value: 20,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Falabela 1',
          description: 'Hasta 20% de descuento Televisores Samsung'
        },
        {
          discount_value: 30,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Falabela 2',
          description: 'Hasta 30% de descuento Televisores Samsung'
        },
        {
          discount_value: 45,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Falabela 3',
          description: 'Hasta 45% de descuento Televisores Samsung'
        },
        {
          discount_value: 50,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Falabela 4',
          description: 'Hasta 50% de descuento Televisores Samsung'
        },
        {
          discount_value: 50,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Exito',
          description: 'Hasta 50% de descuento Televisores Samsung'
        },
        {
          discount_value: 40,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Exito 1',
          description: 'Hasta 40% de descuento Televisores Samsung'
        },
        {
          discount_value: 30,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Exito 2',
          description: 'Hasta 30% de descuento Televisores Samsung'
        },
        {
          discount_value: 25,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Exito 3',
          description: 'Hasta 25% de descuento Televisores Samsung'
        },
        {
          discount_value: 10,
          img: 'https://seeklogo.com/images/F/falabella-logo-2F240D7A62-seeklogo.com.png',
          name: 'Exito 4',
          description: 'Hasta 10% de descuento Televisores Samsung'
        },
      ], */
      current_search: '',
      last_current_search: '',
      current_page: 1,
      curren_comerce: '',
      searchs: [],
      searchs_all: [],
      total_results: 0,
      active_modal_payment: false,
    }
  },
  components: {
    'modal-filter-search' :ModalFilterSearch,
    'modal-payment': ModalPayment,
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
          this.active_modal_payment = true;
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
    cancelModalFilterSearch(){
      this.updateModalFilterSearch(false);
    },
    cancelModalPayment(){
      this.active_modal_payment=false;
    },
    sendSearch(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
        try{
            this.$http.get("search", {
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
                },
                params:
                this.curren_comerce !== '' ?
                {
                  q: this.current_search,
                  page: this.current_page,
                  commerce: this.curren_comerce
                } :
                {
                  q: this.current_search,
                  page: this.current_page,
                }
            }).then(function(response){
                this.searchs_all =  response.body.data
                this.searchs = this.searchs_all
                this.total_results = response.body.hits
                if (this.last_current_search === '' && this.last_current_search !== this.current_search) {
                  this.updateSellers(response.body.sellers)
                }
                this.last_current_search = this.current_search
                console.log('ALL ___ ', response.body)
                this.total_results = response.body.meta.results
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
                this.show_error_modal(response.body.errors[0].details);
                // this.errors_handler(response);
            });
        }catch(e){
          this.show_error_modal(e.message);
            // this.errors_handler(e.message);
        }
    },
    applyModalFilterSearch(f_value){
      this.updateModalFilterSearch(f_value.active)
      this.curren_comerce = f_value.id
      this.sendSearch()
    }
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
    },
    current_search: _.debounce(function(newVal){
      console.log('current_search ', this.current_search)
      console.log('current_page ', this.current_page)
      console.log('curren_comerce ', this.curren_comerce)
      console.log('last_current_search ', this.last_current_search)
      this.curren_comerce = ''
      if (this.current_search.length > 0){
        this.sendSearch();
        this.last_current_search = ''
      }

      /* this.companies = this.companies_all */
    },1000),
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
