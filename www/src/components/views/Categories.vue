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
  </article>
</template>

<script>
export default {
  data(){
    return{
      categories: [],
      selected: 'Productos'
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
    }
  },
  mounted(){
    this.findCategories("find_product_categories")
  }
}
</script>

<style lang="css">
</style>
