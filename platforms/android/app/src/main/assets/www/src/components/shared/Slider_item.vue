<template>
  <div :class="{'swiper-slide': !venue}">
      <div
          class="item"
          :style="{ width: width, minHeight: height }"
          :class="{ 'item--offer': !venue}">
          <div class="grid-y">
            <div class="cell shrink">
              <figure
                class="item__figure">
                <app-star
                    :itemid="item.id"
                    :status="item['is-favorite']"
                    v-if="checkIfIsOffer(item)"
                    class="item__icon">
                </app-star>
                <app-favourite
                    :itemid="item.id"
                    :status="item['is-voucher']"
                    v-else
                    class="item__icon">
                </app-favourite>
                <img
                :src="img"
                :class="{ 'radius': radius }"
                :style="{ width: widthImg, height: heightImg }"
                style="white-space: nowrap;"
                v-if="charged"/>
              </figure>
            </div>
            <div class="cell shrink">
              <div class="grid-x">
                <div class="cell">
                  <p class="item__name">
                    {{ show_name() }}
                  </p>
                </div>
              </div>
              <div class="grid-x">

                <div class="cell auto" v-if="!venue">
                  <div class="item__label">
                    <div class="grid-x">
                      <div class="cell shrink">
                        <svg-location></svg-location>
                      </div>
                      <div class="cell auto">
                        <p>{{ toggle_venue() }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cell shrink" v-if="venue">
                  <div class="item__label">
                    <div class="grid-x">
                      <div class="cell shrink">
                        <svg-car></svg-car>
                      </div>
                      <div class="cell auto">
                        <p>8km</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cell shrink" v-if="venue">
                  <div class="item__label">
                    <div class="grid-x">
                      <div class="cell shrink">
                        <svg-clock></svg-clock>
                      </div>
                      <div class="cell auto">
                        <p>12min</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cell shrink" v-if="venue">
                  <div class="item__label">
                    <div class="grid-x">
                      <div class="cell shrink">
                        <svg-star-outline></svg-star-outline>
                      </div>
                      <div class="cell auto">
                        <p>4.5</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
    import Favourite from './svg/Favourite.vue'
    import Star from './svg/Star.vue'

    export default{

        // Added from walmart
        data() {
            return {
                widthImg: '0px',
                heightImg: '0px',
                charged: false,
                img:""
            }
        },

        props: {
            'item': {
                type: Object,
                default: function(){
                    return {
                        img: "./src/assets/images/temp/1.jpg",
                        description: "Buy one Get One Complimentary Brunch",
                        quantity: "1"
                    }
                }
            },
            'width': {
                type: String,
                required: true
            },
            'height': {
                type: String,
                required: true
            },
            'venue': {
                type: Boolean,
                default: false
            },
            "radius":{
                type:Boolean,
                default: true
            }
        },
        components: {
            "appFavourite": Favourite,
            "appStar": Star
        },
        methods: {
            toggle_venue(){
                if(this.venue){
                    return this.item["hotel-name"];
                }else{
                    return this.$tc("slider.item.quantity", this.item["outlets-count"], { quantity: this.item["outlets-count"] });
                }
            },
            show_name(){
                if(this.venue){
                    return this.item.name;
                }else{
                    return this.item.title;
                }
            },
            checkIfIsOffer(object){
              if(object.type == "offer-fuserewards"){
                return false
              } else {
                return true
              }
            }
        },
        created(){
            if(this.height.includes("%")){
                this.heightImg = "100%";
            }else{
                this.heightImg = this.height;
            }
            if(this.width.includes("%")){
                this.widthImg = "100%";
            }else{
                this.widthImg = this.width;
            }
        },
        mounted(){
            this.charged = true;
            this.img = this.getServerImage()+this.item.attributes.img.url
        }
    }
</script>

<style scoped>
    /*.item__img {
        border-radius: 0px !important;
    }*/
</style>
