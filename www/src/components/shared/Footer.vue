<template>
  <article class="new_footer" id="footer-user">
    <div
      class="new_footer__button"
      @click="checkLoginUser('my_favorites')">
      <new-favorites></new-favorites>
      <span>FAVORITOS</span>
    </div>
    <div
      class="new_footer__button"
      @click="checkLoginUser('my_rewards')">
      <new-rewards></new-rewards>
      <span>REWARDS</span>
    </div>
    <div
      class="new_footer__button  principal"
      @click="$router.push({name: 'offers_index'})">
      <div class="principal__container">
        <!-- <new-home></new-home> -->
        <offer-icon></offer-icon>
        <span>OFERTAS</span>
      </div>
    </div>
    <div
      class="new_footer__button"
      @click="updateSelectedSection(0);$router.push({name: 'my_classes'})">
      <!-- <new-class></new-class> -->
      <gym-icon></gym-icon>
      <span>CLASES</span>
    </div>
    <div
      class="new_footer__button"
      @click="$router.push({name: 'venues'})">
      <new-places></new-places>
      <span>SEDES</span>
    </div>
  </article>
</template>

<script>
  export default{
    props: {
      'active_item': {
        deafult: -1,
        type: Number
      },
      'active_section': {
        type: String,
        default: ''
      }
    },
    methods: {
      checkView() {
        if(this.getFooter() != 'bar'){
          if(/(_show)/g.test(this.$route.name)){
            return null;
          }
          return "false";
        }
        return "true";
      },
    },
    mounted(){
      $(this.$el.children[this.active_item]).addClass("footer_active");
      // $('.principal').css({'height': $('.principal').width() + 'px',
      //                      'border-top-right-radius': ($('.principal').width()/2) + 'px',
      //                      'border-top-left-radius': ($('.principal').width()/2) + 'px'})
    }
  }
</script>

<style scoped>
</style>
