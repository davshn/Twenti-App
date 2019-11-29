<template>
    <div
        class="landing">
        <div
            class="drawer_background"
            v-if="show_drawer"
            @click="toggle_drawer()">

        </div>
        <app-header
            :title="$t('common.demo_fuse_rewards')">
            <!-- <img
                src="./src/assets/images/icons/drawer.svg"
                slot="left-content"
                @click="toggle_drawer()"
                id="drawer_icon"/> -->
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
                v-if="getShowDrawer()"></v-touch>
        </transition>
        <div
            class="landing__container grid-y">
            <button
                class="landing__button small-3"
                @click="goToNormalView()">
                <div class="general__button--filter">
                    <img
                    src="./src/assets/images/phones/normal_phone.png"
                    alt=""
                    class="landing__image">
                    <p
                        class="col-xs-6 text-center">{{ $t("common.retail") | upperCase }}</p>
                </div>
            </button>
            <button
                class="landing__button small-3"
                @click="goToOption1View()">
                <div class="general__button--filter">
                    <p
                        class="col-xs-6 text-center">{{ $t("common.lifestyle") | upperCase }}<br>
                        <span>{{ $t("common.rows_version") | lowerCase }}</span>
                    </p>
                    <img
                    src="./src/assets/images/phones/lifestyle_1_phone.png"
                    alt=""
                    class="">
                </div>
            </button>
            <button
                class="landing__button small-3"
                @click="goToOption2View()">
                <div class="general__button--filter">
                    <img
                    src="./src/assets/images/phones/lifestyle_2_phone.png"
                    alt=""
                    class="">
                    <p
                        class="col-xs-6 text-center">{{ $t("common.lifestyle") | upperCase }}<br>
                        <span>{{ $t("common.mosaic_version") | lowerCase }}</span>
                    </p>
                </div>
            </button>
            <button
                class="landing__button small-3"
                @click="goToOption3View()">
                <div class="general__button--filter">
                    <p
                        class="col-xs-6 text-center">{{ $t("common.corporative") | upperCase }}<br>
                        <span>{{ $t("common.mosaic_version") | lowerCase }}</span>
                    </p>
                    <img
                    src="./src/assets/images/phones/lifestyle_3_phone.png"
                    alt=""
                    class="">
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
            margin_top: "48px",
            landscape: false

        }
    },
    methods:{
        toggle_drawer(){
            this.show_drawer = !this.show_drawer;
            this.updateShowDrawer(this.show_drawer)
            if(this.getShowDrawer()){
                $(this.$el).find("#drawer_icon")
                    .attr("src", "./src/assets/images/icons/close.svg");
            }else{
                $(this.$el).find("#drawer_icon")
                    // .attr("src", "./src/assets/images/icons/drawer.svg");
                    .attr("src", "./src/assets/images/icons/icons/ico_menu.svg");
            }
        },
        goToNormalView() {
            this.updateHomeRoute("home");
            this.updateFooter("bar");
            this.$router.push({ name: 'offers_index' });
        },
        goToOption1View(){
            this.updateHomeRoute("option_1_index");
            this.updateFooter("circle");
            this.$router.push({ name: 'option_1_index' });
        },
        goToOption2View(){
            this.updateHomeRoute("option_2_index");
            this.updateFooter("circle");
            this.$router.push({ name: 'option_2_index' });
        },
        goToOption3View(){
            this.updateHomeRoute("option_3_index");
            this.updateFooter("circle");
            this.$router.push({ name: 'option_3_index' });
        }
    },
    mounted(){
        if(device.platform == "iOS"){
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString("#082834");
        }
    }
}
</script>

<style scoped lang="css">
    .header{
        /*background-color: #082834;*/
        background-color: #fff;
    }
    .header__title{
        color: #FFF !important;
    }

</style>
