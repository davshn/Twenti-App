<template>
  <article class="schedules_modal">
    <section class="schedules_modal__container">
      <img
        src="https://s3-us-west-2.amazonaws.com/karrottsportlife/btn_close.svg"
        alt=""
        class="schedules_modal__close"
        @click="updateScheduleModal(false)">
      <schedule-loader v-if="loading"></schedule-loader>
      <v-zoomer v-else style="height: 100vh; border: solid 1px silver;">
        <img
          :src="getServerImage() + getScheduleImage()"
          class="schedules_modal__container--schedule">
      </v-zoomer>
    </section>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  mounted(){
    this.loadImage(this.getServerImage() + this.getScheduleImage())
  },
  computed: {
    ...mapGetters({
      loading: 'getScheduleLoading'
    })
  },
  methods: {
    loadImage(image){
      this.updateScheduleLoading(true)
      var img = new Image();
      img.src = image;
      img.onload = function() {
        this.updateScheduleLoading(false)
      }.bind(this);
    },
  },
}
</script>
