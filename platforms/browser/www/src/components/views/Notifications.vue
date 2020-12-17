<template>
  <article class="notifications">
    <section class="coupon__nav" style="padding: 30px 0 0;">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg"
        alt=""
        @click="goBack()">
      <img
        src="https://twenti.s3-us-west-2.amazonaws.com/demo/bell.svg"
        alt=""
        @click="$router.push({name: 'notifications'})">
    </section>
    <p class="notifications__title">Notificaciones</p>
    <section
      class="notifications__section"
      v-for="(notification, index) in notifications">
      <div class="notifications__section--image">
        <img :src="notification.image" alt="">
      </div>
      <div class="notifications__section--info">
        <p
          class="notifications__section--title"
          v-html="notification.title"></p>
        <p
          class="notifications__section--text"
          v-html="notification.text"></p>
        <div
          class="notifications__section--button"
          @click="$router.push({name: notification.link})">
          <p>Ver más</p>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      notifications:[{
        title: "Falabella",
        text: "Descripción de la notificación onsectetuer adi elit, sed diam nonummy nibh euismod",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio2.png",
        link: "commerce"
      },
      {
        title: "Éxito",
        text: "Descripción de la notificación onsectetuer adi elit, sed diam nonummy nibh euismod",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio1.png",
        link: "commerce"
      },
      {
        title: "Éxito",
        text: "Descripción de la notificación onsectetuer adi elit, sed diam nonummy nibh euismod",
        image: "https://twenti.s3-us-west-2.amazonaws.com/demo/comercio1.png",
        link: "commerce"
      }
      ]
    }
  }
}
</script>
