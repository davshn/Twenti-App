<template>
    <div class="col-xs-12 no-padding">
        <app-header :title="$t('common.offers')">
        </app-header>
        <div class="col-xs-12 no-padding" id="search-body">
            <app-slider v-for="category in categories"
                :name="category.name"
                :view_all_flag="false"
                :route="category.route"
                :items="category.offers"
                :params="{ id: category.id, name: category.name }"
                :key="category.id"
                :url="'/v1/searches/general?object_name='+getSearchWords()">
            </app-slider>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                categories: []
            }
        },
        methods:{
            send_request(){
                this.$http.get(this.getServer()+"/v1/searches/general?object_name="+this.getSearchWords(), {
                    headers:
                    this.getUserToken() != '' ?
                    {
                        "Authorization": "Bearer " + this.getUserToken(),
                        "X-Device-ID" : this.buildDeviceId()
                    } :
                    {
                      "X-Device-ID" : this.buildDeviceId()
                    }
                }).then(function(response){
                    var offer = {
                        name: "Offers",
                        route: "offer_show",
                        offers: []
                    };
                    var outlet = {
                        name: "Outlets",
                        route: "venue_show",
                        offers: []
                    };
                    for(var key in response.body.data){
                        if(response.body.data[key].type.includes("offer-category-")){
                        }else if(response.body.data[key].type.includes("outlet-")){
                            outlet.offers.push(response.body.data[key])
                        }else if(response.body.data[key].type.includes("offer-")){
                            offer.offers.push(response.body.data[key])
                        }
                    }
                    if(offer.offers.length >= 1){
                        this.categories.push(offer);
                    }
                    if(outlet.offers.length >= 1){
                        this.categories.push(outlet);
                    }
                    if(response.body.meta != undefined && response.body.meta != null){
                      if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                        this.checkToken(response.body.meta.authentication_token)
                      }
                    }
                });
            },
            onKeyboardHide(){
                var headerHeight = this.$el.children[0].offsetHeight;
                var footerHeight = this.$el.children[2].offsetHeight;
                var components = [headerHeight, footerHeight];
                this.resize_body(this.$el, "#search-body", components);
            }
        },
        mounted(){
            var headerHeight = this.$el.children[0].offsetHeight;
            var footerHeight = this.$el.children[2].offsetHeight;
            var components = [headerHeight, footerHeight];
            this.resize_body(this.$el, "#search-body", components);
            this.send_request();
            this.$store.watch(this.getSearchWords, n => {
                this.categories = [];
                this.send_request();
            });
            var vm = this;
            document.addEventListener('hidekeyboard', vm.onKeyboardHide, false);
        }
    }
</script>

<style scoped>
    #search-body{
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    .drawer{
        position: absolute;
    }

    .slide-enter{
        left: -100%;
    }

    .slide-enter-active{
        -webkit-animation: slideIn 1s forwards;
        -moz-animation: slideIn 1s forwards;
        animation: slideIn 1s forwards;
    }

    .slide-leave{
        left: 0%;
    }

    .slide-leave-active{
        -webkit-animation: slideOut 1s forwards;
        -moz-animation: slideOut 1s forwards;
        animation: slideOut 1s forwards;
    }

    @-webkit-keyframes slideIn {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    @-moz-keyframes slideIn {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    @-webkit-keyframes slideOut {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    @-moz-keyframes slideOut {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes slideOut {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
</style>
