<template>
  <article class="notifications">
    <section class="coupon__nav" style="padding: 30px 0 0;">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
    </section>
    <p class="notifications__title">&nbsp;</p>
    <section
      v-if="charged"
      class="notifications__section"
      v-for="(coupon, index) in coupons">
      <div
        class="notifications__section--close"
        @click="saveToFavorites(coupon.id); removeFromFavorites(index)">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/close.jpg" alt="">
      </div>
      <div class="notifications__section--image">
        <img :src="coupon.attributes.image.url" alt="">
      </div>
      <div class="notifications__section--info">
        <p
          class="notifications__section--title"
          v-html="coupon.attributes.title"></p>
        <p
          class="notifications__section--text"
          v-html="coupon.attributes.description"></p>
        <section class="notifications__section--container">
          <div
            class="notifications__section--button"
            @click="$router.push({name: 'coupon', params:{id: coupon.id}})"
            v-if="coupon.visible">
            <p>Ver más</p>
          </div>
        </section>

      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      charged: false,
      coupons:[]
      // {
      //   title: "Falabella",
      //   text: "Hasta 20% de descuento en zapatos para niños",
      //   image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio2.png",
      //   link: "coupon",
      //   review: false,
      //   visible: true
      // },
      // {
      //   title: "Éxito",
      //   text: "Hasta 20% de descuento en computadores y tablets de la marca Lenovo",
      //   image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio1.png",
      //   link: "coupon",
      //   review: true,
      //   visible: true
      // }
    }
  },
  methods:{
    findUserFavorites(){
      try {
        this.$http.get('user_favorites/'+ this.getUserId()).then(function(response){
          console.log("Congrats");
          console.log(response);
          this.coupons = response.body.data
          this.charged = true
        }, function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log(e);
      }
    },
    removeFromFavorites(index){
      this.coupons.splice(index, 1)
    }
  },
  mounted(){
    this.findUserFavorites()
  }
}
</script>
