<template>
    <div class="lifestyle">
        <div
            class="drawer_background"
            v-if="show_drawer"
            @click="toggle_drawer()">

        </div>
        <app-header
            :title="$t('common.fuse_rewards')"
            >
            <img
                src="./src/assets/images/icons/icons/ico_menu.svg"
                slot="left-content"
                @click="toggle_drawer()"
                id="drawer_icon"/>
            <router-link
                :to="{ name: 'home' }"
                tag="img"
                src="./src/assets/images/icons/demo.svg"
                slot="right-content"
                class="pull-right"
                >
            </router-link>
        </app-header>
        <transition
            name="slide">
            <v-touch
                @swipeleft="toggle_drawer()"
                tag="app-drawer"
                :margin_top="margin_top"
                v-if="show_drawer"></v-touch>
        </transition>
        <div
            class="lifestyle__buttons_container grid-y">
            <button
                class="lifestyle_one__button small-3"
                @click="goToOffers()">
                <div class="general__button--filter">
                    <p class="text-center">
                        {{$t('common.offers_title') | capitalize}}<br>
                        <span>{{$t('common.offers_text') | upperCase }}</span>
                    </p>
                </div>
            </button>
            <button
                class="lifestyle_one__button small-3"
                @click="goToVouchers()">
                <div class="general__button--filter">
                    <p class="text-center">
                        {{$t('common.vouchers_title') | capitalize}}<br>
                        <span>{{$t('common.vouchers_text') | upperCase }}</span>
                    </p>
                </div>
            </button>
            <button
                class="lifestyle_one__button small-3"
                @click="goToDiscounts()">
                <div class="general__button--filter">
                    <p class="text-center">
                        {{$t('common.discounts_title') | capitalize}}<br>
                        <span>{{$t('common.discounts_text') | upperCase }}</span>
                    </p>
                </div>
            </button>
            <button
                class="lifestyle_one__button small-3"
                @click="goToFavourites()">
                <div class="general__button--filter">
                    <p class="text-center">
                        {{$t('common.venues_title') | capitalize}}<br>
                        <span>{{$t('common.venues_text') | upperCase }}</span>
                    </p>
                </div>
            </button>
            <button
                class="lifestyle_one__button small-3">
                <div class="general__button--filter">
                    <p class="text-center">
                        {{$t('common.services_title') | capitalize}}<br>
                    </p>
                </div>
            </button>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            show_drawer: false,
            margin_top: "48px"
        }
    },
    methods:{
        toggle_drawer(){
            this.show_drawer = !this.show_drawer;
            if(this.show_drawer){
                $(this.$el).find("#drawer_icon")
                    .attr("src", "./src/assets/images/icons/close.svg");
            }else{
                $(this.$el).find("#drawer_icon")
                    .attr("src", "./src/assets/images/icons/icons/ico_menu.svg");
            }
        },
        goToOffers(){
            this.$router.push({ name: 'offers_index' });
        },
        goToDiscounts(){
            this.$router.push({ name: 'discount' });
        },
        goToVouchers(){
            this.$router.push({ name: 'my_vouchers' });
        },
        goToFavourites(){
            this.$router.push({ name: 'venues' });
        }
    },
    mounted(){
        if(device.platform == "iOS"){
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString("#082834");
        }

        var B = document.body,
            H = document.documentElement,
            height

        if (typeof document.height !== 'undefined') {
            height = document.height // For webkit browsers
        } else {
            height = Math.max( B.scrollHeight, B.offsetHeight,H.clientHeight, H.scrollHeight, H.offsetHeight );
        }
        $('.lifestyle__buttons_container').height(height - 49);
    }
}
</script>

<style scoped lang="css">
    .header{
        /*background-color: #082834;*/
        background-color: #fff;
    }
</style>
