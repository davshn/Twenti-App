<template>
    <section class="cell">
      <div :class="{ instance__tile: instance, categories: !instance }">
        <div class="grid-x">
          <div class="cell auto">
            <h2
              :class="{ offerInstance__sectionTitle: instance, categories__title: !instance}">{{ name | upperCase }}</h2>
          </div>
          <div class="cell shrink">

            <router-link
                :to="{ name: view_all, params: { id: params.id, name: params.name } }"
                tag="a"
                class="pull-right categories__view-all"
                v-if="view_all_flag">
                <div class="grid-x">
                  <div class="cell shrink">{{ $t("common.view_all") | upperCase }}</div>
                  <div class="cell shrink"><svg-arrow-left></svg-arrow-left></div>
                </div>
            </router-link>
          </div>
        </div>
        <div class="grid-x ">
          <div class="cell tag__cell">
            <div
              class="categories__carousel tag__slider-container"
              :class="{  'grid-x' : !slick, 'swiper-container' : !slick }"
              data-slider="slick">
                <router-link
                    v-for="item in items"
                    tag="div"
                    :to="{ name: route, params: {
                        id: item.id,
                        is_voucher: item['is-voucher'],
                        is_favorite: item['is-favorite']
                    } }"
                    class="categories__slide-item shrink "
                    :key="item.id"
                    :class="{ 'center' : unique, 'swiper-wrapper' : !slick}">
                    <app-slider-item
                      :width="width"
                      :height="height"
                      :item="item"
                      :venue="venue"
                      :radius="radius">
                    </app-slider-item>
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import SliderItem from './Slider_item.vue'

    export default{
        data(){
            return{
                actual_page: 1
            }
        },
        components: {
            "appSliderItem": SliderItem
        },
        props: {
            'name': {
                type: String,
                required: true
            },
            'view_all_flag': {
                type: Boolean,
                default: false
            },
            'view_all': {
                type: String,
                default: ''
            },
            'width': {
                type: String,
                default: '64vw'
            },
            'height': {
                type: String,
                default: '40vw'
            },
            'items': {
                type: Array,
                default: function(){
                    return []
                }
            },
            'route': {
                type: String,
                default: ''
            },
            'venue': {
                type: Boolean,
                default: false
            },
            'instance': {
              type: Boolean,
              default: false
            },
            params: {
                type: [Object,Array],
                default: function() {
                    return {
                        id: -1
                    }
                }
            },
            center: {
                type: Boolean,
                default: false
            },
            page: {
                type: Number,
                default: 1
            },
            url: {
                type: String,
                default: ''
            },
            radius: {
                type:Boolean,
                default: true
            },
            slick:{
                type: Boolean,
                default: false
            },
            unique:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            init_slick(){
                if(this.items.length > 1){
                    $(".categories__slide-item").removeClass("center");
                    if(this.slick){
                        $(this.$el).find("[data-slider='slick']").slick({
                            arrows: false,
                            variableWidth: true,
                            infinite: true,
                            centerMode: true
                        });
                    }
                }
            },
            upload_swiper(swiper) {
                swiper.update(true);
            }
        },
        mounted(){
            this.actual_page = this.page;
            var vm = this;
            navigator.geolocation.getCurrentPosition(vm.findPosition);
            var swiper;
            if(vm.slick){
                $(vm.$el).find("[data-slider='slick']").on('beforeChange', function(event, slick, currentSlide, nextSlide){
                    var slide_items = $(event.target.$el).find(".slide-item").length;
                    if(slide_items - 5 < currentSlide && vm.url != '' && slide_items >= 10*vm.actual_page){
                        vm.actual_page = vm.actual_page + 1;
                        vm.$http.get(vm.getServer()+vm.url+"&page="+vm.actual_page,{
                            headers:
                            this.getUserToken() != '' ?
                            {
                                "Authorization": "Bearer " + this.getUserToken(),
                                "X-Device-ID" : this.buildDeviceId(),
                                "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                            } :
                            {
                              "X-Device-ID" : this.buildDeviceId(),
                              "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                            }
                        }).then(function(response){
                            if(response.body.data.length > 0){
                                $(vm.$el).find("[data-slider='slick']").slick("unslick");
                                for(var key in response.body.data){
                                    vm.items.push(response.body.data[key]);
                                }
                                var slick = setInterval(function(){
                                  if(vm.items[vm.items.length-1].id == response.body.data[response.body.data.length-1].id){
                                    vm.init_slick();
                                    $(vm.$el).find("[data-slider='slick']").slick("slickGoTo", nextSlide, true);
                                  }
                                  clearInterval(slick);
                                }, 100);
                            }
                            if(response.body.meta != undefined && response.body.meta != null){
                              if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                                this.checkToken(response.body.meta.authentication_token)
                              }
                            }
                        }, function(response){
                            vm.errors_handler(response);
                        });
                    }
                });
            }else if(!vm.instance){
                swiper = new Swiper('.swiper-container', {
                    slidesPerView: 'auto',
                    centeredSlides: false,
                    paginationClickable: true,
                    spaceBetween: 0,
                    freeMode: true,
                    onInit(swiper){
                        vm.upload_swiper(swiper);
                    },
                    observer: true
                });
            }
        }
    }
</script>

<style scoped>

</style>
