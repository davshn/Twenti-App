<template>
  <article
    class="offer_style__button"
    @click="openKey()"
    v-if="this.getUserToken() != '' &&
          this.getUserToken() != undefined &&
          this.getUserToken() != null">
    <qr-icon></qr-icon>
  </article>
</template>

<script>
export default {
  methods:{
    openKey(){
      if(this.getUserRut() != '' && this.getUserRut() != undefined && this.getUserRut() != null){
        this.updateRutValidator(false)
        this.updateShowUserKey(true)
      } else {
        this.updateRutValidator(true)
      }
    }
  }
}
</script>

<style lang="css">
</style>
