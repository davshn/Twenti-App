<template>
  <article class="category">
    <section class="coupon__nav" style="padding: 30px 28px 0;">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg"
        alt=""
        @click="$router.push({name: 'notifications'})">
    </section>
    <section class="category__banner" @click="$router.push({name: 'coupon'})">
      <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/Home_banner.jpg" alt="">
    </section>
    <section class="category__info">
      <p class="category__info--title">Tecnología</p>
      <section class="category__info--content">
        <section
          class="category__info--section"
          v-for="(section, index) in destacados">
          <div class="category_section__header">
            <div class="category_section__header--container">
              <div class="category_section__header--discount">
                <p>
                  {{section.discount}}
                </p>
              </div>
              <img :src="section.logo" alt="">
            </div>
            <div class="category_section__header--title">
              <p>
                {{section.title}}
              </p>
            </div>
          </div>
          <p class="category_section__text">
            {{section.text}}
          </p>
          <div
            class="category_section__button"
            @click="$router.push({name: 'commerce'})">
            <p>Ver más del comercio</p>
          </div>
        </section>
      </section>
    </section>
    <section class="category__coupons">
      <p class="category__coupons--title">Otros descuentos</p>
      <section class="category__coupons--content">
        <section
          class="category__coupons--coupon"
          v-for="(coupon, index) in otros">
          <div class="category_section__header">
            <div class="category_section__header--container">
              <div class="category_section__header--discount">
                <p>
                  {{coupon.discount}}
                </p>
              </div>
              <img :src="coupon.logo" alt="">
            </div>
            <div class="category_section__header--text">
              <p>
                {{coupon.text}}
              </p>
            </div>
          </div>
          <div class="category_section__row">
            <p class="category_section__sub_text">
              {{coupon.title}}
            </p>
            <div
              class="category_section__button sub_button"
              @click="$router.push({name: 'commerce'})">
              <p>Ver más</p>
            </div>
          </div>

        </section>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      destacados:[
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio1.png",
          title: "Éxito",
          text:"Hasta 30% de descuento en audio y video",
          discount:"-30%"
        },
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio2.png",
          title: "Falabella",
          text:"Hasta 25% de descuento en barras de sonido",
          discount:"-25%"
        }
      ],
      otros:[
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio3.png",
          title: "Mac Center",
          text:"Hasta 10% de descuento en iMac Pro de 27\"",
          discount:"-10%"
        },
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio4.png",
          title: "Mac Center",
          text:"Hasta 10% de descuento en iMac Air 2019",
          discount:"-10%"
        },
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio5.png",
          title: "Panamericana",
          text:"Hasta 10% de descuento en Portátiles Asus",
          discount:"-10%"
        },
        {
          logo:"https://twenti.s3-us-west-2.amazonaws.com/demo/comercio6.png",
          title: "Panamericana",
          text:"Hasta 10% de descuento en Portátiles Asus",
          discount:"-10%"
        },
      ]
    }
  }
}
</script>

<style lang="css">
</style>
