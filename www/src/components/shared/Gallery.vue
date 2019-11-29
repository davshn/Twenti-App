<template>
    <div
      class="instanceModal__mask instanceModal__mask--active">
      <div
        class="instanceModal__wrapper instanceModal__wrapper--active">
        <div
            class="instance__header">
          <div
            data-slider="instance">
            <figure v-for="(image, index) in images">
              <image-loader
                class="no_max_height"
                :class_name="'instance__img'"
                :url="getServerImage() + image.image.url"></image-loader>
              <!-- <img
                class="instance__img"
                :data-lazy="getServerImage() + image.image.url"> -->
            </figure>
          </div>
        </div>
      </div>
      <div
        class="instanceModal__close"
        @click="hideModal">
        <svg-close></svg-close>
      </div>
      <div
          class="instanceModal__alt">
          <p>{{ currentSlide }}/{{ slideCount }} - {{ title }}</p>
      </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentSlide: '',
                slideCount: '',
                img: ""
            }
        },
        props: {
            images: {
                type: Array
            },
            title: {
                type: String
            }
        },
        mounted() {
            var vm = this;
            // vm.img = vm.getServerImage()+vm.img_url;
            let $instanceSlider = $(this.$el).find("[data-slider='instance']");
            $instanceSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
              //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
              var i = (currentSlide ? currentSlide : 0) + 1;
              vm.currentSlide = i;
              vm.slideCount = slick.slideCount;
            });

            $instanceSlider.slick({
                arrows: false,
                swipeToSlide: true,
                mobileFirst: true,
                lazyLoad: 'progressive'
            });
        },
        methods: {
            hideModal() {
                this.$emit("hide", false)
            }
        }
    }

</script>

<style lang="css">
</style>
