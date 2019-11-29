<template>
    <header class="header grid-x grid-margin-x">
      <div class="cell shrink">
          <slot name="left-content">
              <div @click="redirect_back();">
                  <svg-arrow-left></svg-arrow-left>
              </div>
          </slot>
      </div>

      <div class="cell auto header__title" style="text-align: center;">
          <img
            src="https://s3-us-west-2.amazonaws.com/karrottsportlife/logo.svg"
            class="header__image_header"
            v-if="title != $t('common.sign_up')">
          <p
            class="header__title"
            v-else>
            {{ title }}
          </p>
      </div>


      <div class="cell shrink grid-x header__options">
        <slot name="right-content">
            <div
              style="margin-right: 15px;"
              @click="updateInBlocks(!getInBlocks())"
              v-if="offers_view">
              <list-icon
                v-if="getInBlocks()"
                width="20px"></list-icon>
              <table-icon
                v-else
                width="20px"></table-icon>
            </div>
            <div class="header__inbox">
                <div
                  @click="checkLoginUser('notifications')">
                  <svg-inbox-empty></svg-inbox-empty>
                </div>
                <span
                  class="header__badge animated"
                  @click="checkLoginUser('notifications')"
                  v-if="getNotifications() != 0 && getNotifications() != null && getNotifications() != undefined">{{ getNotifications() }}</span>
                <p>

                </p>
            </div>
          <!-- <div
            id="search"
            id="search_btn"/
            @click="toggle_search_bar()">
            <svg-search></svg-search>
          </div> -->
        </slot>
      </div>

      <div class="header__loader">
        <app-loader class="header__loader--element"></app-loader>
      </div>

      <transition name="width-animation">
          <div class="col-xs-9 no-padding" id="search_bar" v-if="show_search_bar">
              <input type="text"
              :placeholder="$t('header.search')"
              class="col-xs-12" v-model="search_words" @keyup="searchWords($event)">

              <img src="./src/assets/images/icons/search.svg"
              alt="Search"
              class="pull-right"
              id="search_btn_close"
              @click="toggle_search_bar()"/>
          </div>
      </transition>

    </header>
</template>

<script>
    import Notifications from './svg/About.vue'
    export default{
        data(){
            return {
                show_search_bar: false,
                back_img_src: "./src/assets/images/icons/arrow_left.svg",
                search_img_src: "./src/assets/images/icons/search.svg",
                search_words: ""
            }
        },
        components:{
            "appNotifications": Notifications
        },
        methods: {
          scroll() {
            $(window).scroll(() => {
              const nav = $(this.$el);
              let navHeight = $('.instance__header').outerHeight();
              let top = navHeight / 4;
              if ($(window).scrollTop() >= top) {
                nav.addClass('header--white').removeClass('header--transparent');
              } else {
                nav.removeClass('header--white').addClass('header--transparent');
              }
            });
          },
            redirect_back(){
                this.$router.back();
                // window.history.back();
            },
            toggle_search_bar(){
                this.show_search_bar = !this.show_search_bar;
            },
            searchWords(event) {
                if(event.keyCode == 13){
                    this.updateSearchWords(this.search_words);
                    this.$router.push({ name: 'search' });
                }
            }
        },
        props: {
            title: {
                type: [String, Number],
                default: ''
            },
            transparent: {
                type: Boolean,
                default: false
            },
            z_index: {
                type: Number,
                default: 1
            },
            fz: {
                type: Number,
                default: 13
            },
            letter: {
                type: String,
                default: "#082834"
            },
            offers_view: {
              type: Boolean,
              default: false
            }
        },
        mounted(){
            // if(this.transparent){
            //   this.scroll();
            //     this.back_img_src = "./src/assets/images/icons/arrow_left_white.png";
            //     this.search_img_src = "./src/assets/images/icons/search_white.png";
            //     $(this.$el).addClass("header--transparent header--fixed");
            //     // $(this.$el).children("#body").addClass("transparent");
            //     // $(this.$el).css("z-index", this.z_index);
            //     // $(this.$el).children("#body").css("z-index", this.z_index);
            //     $(this.$el).find(".loader").css("position", "absolute");
            //     // $(this.$el).css("background", "linear-gradient(rgba(128, 128, 128, 0.5), transparent)");
            //     $(this.$el).find("#notification_icon").css("fill", "#fff");
            // }
        }
    }
</script>

<style scoped>

    #search{
        width: 24px;
    }

    #search_bar{
        position: absolute;
        top: 10px;
        right: 12px;
        z-index: 2;
    }

    #search_bar input[type="text"]{
        background-color: #faf7f1;
        border: none;
        border-radius: 3px;
        padding: 5px;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        padding-left: 10px;
    }

    #search_bar input[type="text"]::placeholder{
        color: #5B96FC;
    }

    #search_bar #search_btn_close{
        position: absolute;
        top: 2px;
        right: 0px;
    }

    #search_btn{
        z-index: 2;
    }

    .width-animation-enter{
        width: 0px;
    }

    .width-animation-enter-active{
        -webkit-transition: width 1s ease-in-out;
        -moz-transition: width 1s ease-in-out;
        -o-transition: width 1s ease-in-out;
        transition: width 1s ease-in-out;
    }

    .width-animation-enter-to{
        width: 75%;
    }

    .width-animation-leave{
        width: 75%;
    }

    .width-animation-leave-active{
        -webkit-transition: width 1s ease-in-out;
        -moz-transition: width 1s ease-in-out;
        -o-transition: width 1s ease-in-out;
        transition: width 1s ease-in-out;
    }

    .width-animation-leave-to{
        width: 0%;
    }

    .footer-item svg{
        margin: auto;
        fill: #5B96FC;
    }

    .footer-item{
        position: absolute;
        left: -11%;
        z-index: 1;
    }

</style>
