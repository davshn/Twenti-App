<template>
  <div class="grid-x">
    <div v-if="!venue">
      <app-gallery
          :images="offer.attributes.img"
          :title="venue? offer.attributes.name : offer.attributes.title"
          @hide="showModal = $event"
          v-if="showModal">
      </app-gallery>
    </div>

    <div
        class="cell"
        :show="!showModal">
      <div
        class="instanceModal__mask">
        <div
          class="instanceModal__wrapper">
          <div class="instance__header">
            <div
                data-slider="instance"
                @click="showModal = true"
                v-if="venue">
                <figure>
                  <image-loader
                    class="no_max_height"
                    :class_name="'instance__img'"
                    :url="getServerImage()+offer.attributes.img.url"></image-loader>
                  <!-- <img
                    class="instance__img"
                    :data-lazy="getServerImage()+offer.attributes.img.url"> -->
                </figure>
            </div>
            <div
                data-slider="instance"
                @click="showModal = true"
                v-else>
                <figure v-for="(image, index) in offer.attributes.img">
                  <image-loader
                    class="no_max_height"
                    :class_name="'instance__img'"
                    :url="getServerImage()+image.image.url"></image-loader>
                  <!-- <img
                    class="instance__img"
                    :data-lazy="getServerImage()+image.image.url"> -->
                </figure>
            </div><!-- End. Slider. -->
            <div class="instance__headerButtons">
                <div class="grid-x">
                    <div class="cell auto">

                    </div>
                    <div
                      class="cell auto"
                      v-if="!venue">
                      <button
                        class="instance__button instance__button--showMoreImages"
                        @click="showModal= true"><svg-camera></svg-camera><p>{{ slideCount }}</p></button>
                    </div>
                </div>
            </div>
            <!-- <div
                class="instance__header--button"
                v-if="checked">
                <button
                    type="text"
                    class="heart__wrapper--favourite"
                    id="vouchers">
                        <app-star
                            :itemid="offer.id"
                            :status="offer.attributes['is_favorite']"
                            class="item__icon">
                        </app-star>
                </button>
            </div>
            <div
                class="instance__header--button"
                v-else>
                <button
                  type="text"
                  class="heart__wrapper--instance"
                  id="vouchers">
                    <app-star
                        :itemid="offer.id"
                        :status="offer.attributes['is_favorite']"
                        v-if="checked"
                        class="item__icon">
                    </app-star>
                    <app-favourite
                        :itemid="offer.id"
                        :status="offer.attributes['is_favorite']"
                        v-else></app-favourite>
                </button>
            </div> -->
          </div><!-- End. Content. -->
        </div>
      </div>
    </div>
  </div><!-- End. Header. -->
</template>

<script>
    import Gallery from '../../shared/Gallery.vue'
    import Star from '../../shared/svg/Star.vue'
    import Favourite from '../../shared/svg/Favourite.vue'
    export default {
        data () {
            return {
                currentSlide: '',
                slideCount: '',
                showModal: false,
                img:"",
                title: "",
                charge_information: false
            }
        },
        props: {
            offer: {
                type: Object
            },
            status: {
                type: [String,Boolean],
                default: false
            },
            checked: {
                type: [String,Boolean],
                default: false
            },
            venue: {
                type: Boolean,
                default: false
            }
            // },
            // validate: {
            //   ype: Boolean,
            //   default: false
            // }
        },
        components: {
            "appStar": Star,
            "appGallery": Gallery,
            "appFavourite": Favourite
        },
        mounted () {
          const vm = this;
          let $instanceSlider = $(this.$el).find("[data-slider='instance']");
          $instanceSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            vm.currentSlide = i;
            vm.slideCount = slick.slideCount;
          });
          console.log(this.status);
          console.log(this.offer);

          $instanceSlider.slick({
              arrows: false,
              swipeToSlide: true,
              mobileFirst: true,
              lazyLoad: 'progressive'
          });
        }
    }
</script>
