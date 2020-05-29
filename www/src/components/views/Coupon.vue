<template>
  <article class="coupon__container">
    <article class="coupon">
      <section class="coupon__nav">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg" alt="" @click="goBack()">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg" alt="" @click="$router.push({name: 'notifications'})">
      </section>
      <section class="coupon__gallery">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/instancia_cupon.jpg" alt="">
      </section>
      <section class="coupon__header">
        <p class="coupon__header--principal">
          Hasta 25% de descuento en Iphone XS
        </p>
        <p class="coupon__header--secondary">
          Martes a Jueves de 9 a 12
        </p>
        <p class="coupon__header--sub_text">
          Válido hasta el 1 de Abril de 2020
        </p>
      </section>
      <section class="coupon__description">
        <p class="coupon__description--text">
          Descripción del cupón. Consectetuer adipiscing elit, sed diam nonummy
          nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          Ut wisi enim ad minim veniam, quis nos.
        </p>
      </section>
      <section class="coupon__terms_and_conditions">
        <p>
          Términos y condiciones
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nos. Lorem ipsum dolor
          sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
        </p>
      </section>
    </article>
    <section class="coupon__redemption">
      <p class="coupon__redemption--title">
        ¿Cómo redimir esta promoción?
      </p>
      <p class="coupon__redemption--text">
        1. Acércate al establecimiento que ofrece éste cupón <br>
        2. Busca el código QR en el xxx de establecimiento <br>
        3. Lee el código QR con el lector que incluimos debajo de estos pasos
      </p>
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/instancia_cupon_qr.svg"
        alt=""
        class="coupon__redemption--icon">
    </section>
  </article>

</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
