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
      <p style="text-align: center; color: #FF0202; font-size: 14px; font-weight: bold">Busca tu descuento Juan</p>
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
        @click="$router.push({name: 'instance_category'})">
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
      categories: [
        {"id":1,"name":"Supermercados","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/1/96cac43b-5949-4c26-b4fe-68fedad0c95b.svg"},"created_at":"2020-05-28T14:34:53.637Z","updated_at":"2020-05-28T14:34:53.637Z"},
        {"id":2,"name":"Ropa","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/2/cb2b61c1-ed57-405b-86e4-d8385c3bce58.svg"},"created_at":"2020-05-28T14:35:05.522Z","updated_at":"2020-05-28T14:35:05.522Z"},
        {"id":3,"name":"Zapatos","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/3/b86127d1-5a42-4952-b702-d9e2543ac9ff.svg"},"created_at":"2020-05-28T14:35:18.066Z","updated_at":"2020-05-28T14:35:18.066Z"},
        {"id":4,"name":"Viajes","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/4/8d3f4947-ac13-4374-b464-f47757cb40c5.svg"},"created_at":"2020-05-28T14:35:30.457Z","updated_at":"2020-05-28T14:35:30.457Z"},
        {"id":5,"name":"Hogar","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/5/d8b14ce3-08fa-4019-bc6f-d0e313ee6900.svg"},"created_at":"2020-05-28T14:35:42.613Z","updated_at":"2020-05-28T14:35:42.613Z"},
        {"id":6,"name":"Tecnología","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/6/5d5883a3-a955-40dd-84c5-1a01bbc740c4.svg"},"created_at":"2020-05-28T14:35:58.056Z","updated_at":"2020-05-28T14:35:58.056Z"},
        {"id":7,"name":"Almacenes de regalos","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/7/5bb314e6-3dbb-4267-8cb2-85b19a7b3ff2.svg"},"created_at":"2020-05-28T14:36:13.802Z","updated_at":"2020-05-28T14:36:13.802Z"},
        {"id":8,"name":"Gimnasios","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/8/82d95b40-c750-4a05-a6d8-d06d6c9f7496.svg"},"created_at":"2020-05-28T14:36:28.664Z","updated_at":"2020-05-28T14:36:28.664Z"},
        {"id":9,"name":"Restaurantes y bares","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/9/ff58bfe1-e136-47de-bbd5-b4592db004ff.svg"},"created_at":"2020-05-28T14:36:46.071Z","updated_at":"2020-05-28T14:36:46.071Z"},
        {"id":10,"name":"Farmacias","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/10/68058193-65e0-4d14-a440-135b84c47020.svg"},"created_at":"2020-05-28T14:37:00.525Z","updated_at":"2020-05-28T14:37:00.525Z"},
        {"id":11,"name":"Combustibles y lubricantes","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/11/68b3248c-239d-4d17-a50d-7d95b2e44d99.svg"},"created_at":"2020-05-28T14:37:18.794Z","updated_at":"2020-05-28T14:37:18.794Z"},
        {"id":12,"name":"Mascotas","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/12/caaa03bd-dd1f-4136-9f41-a5d89ec1fcef.svg"},"created_at":"2020-05-28T14:37:35.009Z","updated_at":"2020-05-28T14:37:35.009Z"},
        {"id":13,"name":"Tiendas por departamentos","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/13/fb25dee0-dd2b-401c-84cd-f0e1e7564efd.svg"},"created_at":"2020-05-28T14:37:55.861Z","updated_at":"2020-05-28T14:37:55.861Z"},
        {"id":14,"name":"Vehículos","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/14/bf1fecbb-7610-4df6-b5be-940c5f46b12f.svg"},"created_at":"2020-05-28T14:38:10.509Z","updated_at":"2020-05-28T14:38:10.509Z"},
        {"id":15,"name":"Accesorios","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/15/4dd48a04-4741-4dbc-a22a-db50fe7c9d64.svg"},"created_at":"2020-05-28T14:38:23.846Z","updated_at":"2020-05-28T14:38:23.846Z"},
        {"id":16,"name":"Ferretería","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/16/e10d0303-69b7-4441-8171-5536a0459bae.svg"},"created_at":"2020-05-28T14:38:51.120Z","updated_at":"2020-05-28T14:38:51.120Z"},
        {"id":17,"name":"Deportes","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/17/e14acb78-bd53-428a-8ff9-33600788f827.svg"},"created_at":"2020-05-28T14:39:13.639Z","updated_at":"2020-05-28T14:39:13.639Z"},
        {"id":18,"name":"Belleza y bienestar","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/18/238fea63-a88c-4f09-933e-f63a701fac1d.svg"},"created_at":"2020-05-28T14:39:30.390Z","updated_at":"2020-05-28T14:39:30.390Z"},
        {"id":19,"name":"Entretenimiento","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/19/a606603d-a72d-4bab-be41-6a4cc3ad78bc.svg"},"created_at":"2020-05-28T14:39:47.179Z","updated_at":"2020-05-28T14:39:47.179Z"},
        {"id":20,"name":"Niños","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/20/47917f03-844a-4bbf-b66c-700e30840e0f.svg"},"created_at":"2020-05-28T14:40:00.363Z","updated_at":"2020-05-28T14:40:00.363Z"},
        {"id":21,"name":"Papelerias","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/21/3a422190-4115-4149-8bee-f07bf9d4e2ed.svg"},"created_at":"2020-05-28T14:40:14.903Z","updated_at":"2020-05-28T14:40:14.903Z"},
        {"id":22,"name":"Ópticas","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/22/4ea6b8bd-b3e4-4e0a-9c99-34596960f4e4.svg"},"created_at":"2020-05-28T14:40:32.191Z","updated_at":"2020-05-28T14:40:32.191Z"},
        {"id":23,"name":"Aseo","image":{"url":"https://twenti.s3.us-west-2.amazonaws.com/uploads/category/image/23/a7ef3883-cc6e-4f11-b284-67c16e584a07.svg"},"created_at":"2020-05-28T14:40:43.925Z","updated_at":"2020-05-28T14:40:43.925Z"}
      ],
      selected: 'Productos'
    }
  },
  methods:{
    findCategories(){
      try {
        this.$http.get('categories',
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
  mounted(){
    this.findCategories()
  }
}
</script>

<style lang="css">
</style>
