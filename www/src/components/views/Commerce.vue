<template>
  <article class="commerce">
    <section class="coupon__nav">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg" alt="" @click="goBack()">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg" alt="" @click="$router.push({name: 'notifications'})">
    </section>
    <section class="commerce__info">
      <div class="commerce__info--logo">
        <img
          src="https://twenti.s3-us-west-2.amazonaws.com/demo/instancia_comercio.jpg"
          alt="">
      </div>
      <p class="commerce__info--title">
        Éxito
      </p>
      <p class="commerce__info--text">
        Descripción del comercio. Consectetuer adipiscing elit, sed diam nonummy
         nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      </p>
    </section>
    <section class="commerce__coupons">
      <section
        class="commerce__coupons--section"
        v-for="(coupon, index) in coupons">
        <div class="commerce__coupons--favorite">
          <p>
            Tweni descuento
          </p>
          <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/heart.svg" alt="">
        </div>
        <p class="commerce__coupons--categories">
          <span v-for="(category, index) in coupon.categories" @click="$router.push({name: 'instance_category'})">{{category}}</span>
        </p>
        <div class="commerce__coupons--image">
          <img :src="coupon.image" alt="">
        </div>
        <p class="commerce__coupons--title">
          {{coupon.title}}
        </p>
        <p class="commerce__coupons--description">
          {{coupon.description}}
        </p>
        <div
          class="commerce__coupons--button"
          @click="$router.push({name: 'coupon'})">
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
  }
}
</script>

<style lang="css">
</style>
