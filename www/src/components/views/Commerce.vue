<template>
  <article class="commerce">
    <section class="coupon__nav">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg" alt="" @click="goBack()">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg" alt="" @click="$router.push({name: 'notifications'})">
    </section>
    <section class="commerce__info">
      <div class="commerce__info--logo">
        <img
          :src="commerce.attributes.image.url"
          alt="">
      </div>
      <p class="commerce__info--title">
        {{commerce.attributes.name}}
      </p>
      <p class="commerce__info--text" v-html="commerce.attributes.description">
      </p>
    </section>
    <section class="commerce__coupons">
      <section
        class="commerce__coupons--section"
        v-for="(coupon, index) in coupons">
        <div
          @click.stop="saveToFavorites(coupon.id)"
          class="commerce__coupons--favorite" style="z-index: 10">
          <p>
            Aibai descuento
          </p>
          <favorite-icon :color="getUserFavorites().includes(coupon.id.toString()) ? '#FF0202' : 'none'"></favorite-icon>
        </div>
        <p class="commerce__coupons--categories">
          <span v-for="(category, index) in coupon.categories" @click="$router.push({name: 'instance_category'})">{{category}}</span>
        </p>
        <div class="commerce__coupons--image">
          <img :src="coupon.image.url" alt="">
        </div>
        <p class="commerce__coupons--title">
          {{coupon.title}}
        </p>
        <p class="commerce__coupons--description">
          {{coupon.description}}
        </p>
        <div
          class="commerce__coupons--button"
          @click="$router.push({name: 'coupon', params:{id: coupon.id}})">
          <p>¡Lo quiero!</p>
        </div>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      charged: false,
      commerce: {},
      coupons:[
        {
          categories: ["Tecnología"],
          image: "https://twenti.s3-us-west-2.amazonaws.com/demo/isntancia_comercio_cupon_1.jpg",
          title:"Martes a Jueves de 9 a 12",
          description:"Hasta 30% de descuento en computadores y tablets de la marca Lenovo."
        },
        {
          categories: ["Tecnología"],
          image: "https://twenti.s3-us-west-2.amazonaws.com/demo/isntancia_comercio_cupon_2.jpg",
          title:"Martes a Jueves de 9 a 12",
          description:"Hasta 25% de descuento en iPhone XS"
        },
        {
          categories: ["Tecnología", "Vehículos"],
          image: "https://twenti.s3-us-west-2.amazonaws.com/demo/isntancia_comercio_cupon_3.jpg",
          title:"Lunes a Jueves de 9 a 12",
          description:"Hasta 30% de descuento en computadores y tablets de la marca Lenovo."
        },
        {
          categories: ["Tecnología"],
          image: "https://twenti.s3-us-west-2.amazonaws.com/demo/isntancia_comercio_cupon_4.jpg",
          title:"Lunes a Jueves de 9 a 12",
          description:"Hasta 25% de descuento en iPhone XS"
        }
      ]
    }
  },
  methods:{
    findCommerce(){
      try {
        this.$http.get('commerces/'+this.$route.params.id,
        ).then(function(response){
          this.commerce = response.body.data
          this.coupons = response.body.data.attributes.offers
          console.log(response);
          console.log("Congrats");
          this.charged = true
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
  },
  mounted(){
    this.findCommerce()
  }

}
</script>

<style lang="css">
</style>
