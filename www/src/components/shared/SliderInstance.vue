<template>
    <section class="cell">
      <div class="instance__tile">
        <div class="grid-x">
          <div class="cell auto">
            <h2
              class="offerInstance__sectionTitle">{{ name | upperCase }}</h2>
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
              class="categories__carousel grid-x tag__slider-container swiper-container">
                <router-link
                    v-for="item in items"
                    tag="div"
                    :to="{ name: route, params: {
                        id: item.id,
                        is_voucher: item.attributes['is-voucher'],
                        is_favorite: item.attributes['is-favorite']
                    } }"
                    class="categories__slide-item shrink swiper-wrapper"
                    :key="item.id">
                    <app-slider-instance-item
                      :width="width"
                      :height="height"
                      :item="item"
                      :venue="false"
                      :radius="radius"
                      >
                    </app-slider-instance-item>
                </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    import SliderInstanceItem from './Slider_instance_item.vue'

    export default{
        data(){
            return{
                actual_page: 1
                // charged: false,
                // count: 0
            }
        },
        components: {
            "appSliderInstanceItem": SliderInstanceItem
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
            }
        },
        mounted(){
            this.actual_page = this.page;
            var vm = this;
        }
    }
</script>

<style scoped>
.instance__tile{
    padding: 0px;
}

.offerInstance__sectionTitle{
    padding: 1em;
    padding-bottom: 0px;
}

</style>
