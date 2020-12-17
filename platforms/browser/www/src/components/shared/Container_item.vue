<template>
    <div
        class="container-item"
        :style="{ width: width, height: height }">
        <app-star
            :itemid="item.id"
            :status="item.attributes['is_favorite']"
            v-if="venue"
            class="container-item__icon">
        </app-star>
        <app-favourite
            :itemid="item.id"
            :status="item.attributes['is_favorite']"
            v-else
            class="container-item__icon">
        </app-favourite>
        <div
            class="container-item__img"
            :style="{ width: widthImg, height: heightImg }"
            :class="{'is_venue' : venue}">
            <image-loader
              :url="getServerImage() + item.attributes.image.url"
              :type="'venue_image'"
              :class_name="'container-item__img'"
              :style_img="{ width: widthImg, height: heightImg }"></image-loader>
            <!-- <img
            :src="img"
            class="container-item__img"
            :style="{ width: widthImg, height: heightImg }"/> -->
        </div>
        <p
            class="no-padding container-item__name">
            {{ show_name() }}
        </p>
        <div
            class="container-item__location-text hotel">
            <img
                src="./src/assets/images/icons/pin.svg"/>
            <span>
                {{ toggle_venue() }}
            </span>
        </div>
    </div>
</template>

<script>
    import Favourite from './svg/Favourite.vue'
    import Star from './svg/Star.vue'
    export default{
        data() {
            return {
                widthImg: '0px',
                heightImg: '0px',
                img: ""
            }
        },
        props: {
            item: {
                type: Object
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
            }
        },
        components: {
            "appFavourite": Favourite,
            "appStar": Star
        },
        methods: {
            toggle_venue(){
                if(this.venue){
                    return this.item.attributes["hotel-name"];
                }else{
                    return this.$tc("slider.item.quantity", this.item.attributes["outlets-count"], { quantity: this.item.attributes["outlets-count"] });
                }
            },
            show_name(){
                if(this.venue){
                    return this.item.attributes.name;
                }else{
                    return this.item.attributes.title;
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
            this.img = this.getServerImage() +this.item.attributes.image.url
        }
    }
</script>

<style scoped>
/*.heart {
    transform: scale(.5);
    position: absolute;
    z-index: 3;
    left: 57%;
    top: -30%;
}*/
</style>
