<template>
    <div
        class="cell">
        <app-header
            :title="$route.params.name"></app-header>
        <div
            class="small-12 no-padding sub_categories">
            <div
                v-for="category in categories">
                <div
                    @click="slide_to(category.name.replace(/\s/g, '-'), $event)"
                    class="text-center">
                    {{ category.name }}
                </div>
            </div>
        </div>
        <div
            class="small-12 no-padding"
            id="subcategories_body">
            <app-pull-refresh
                element="#subcategories_body"
                :refresh="refresh">
            </app-pull-refresh>
            <app-slider
                v-for="category in categories"
                :width="'110px'"
                :height="'104px'"
                :name="category.name"
                :view_all_flag="false"
                route="offer_show"
                :items="category.offers"
                :id="category.name.replace(/\s/g, '-')"
                :key="category.id">
            </app-slider>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                categories: [],
                actual_page: 1
            }
        },
        methods: {
            slide_to(id, event){
                var item = $(this.$el).find('#subcategories_body');
                $(item).animate({
                    scrollTop: 0
                }, 100, function(){
                    $(item).animate({
                        scrollTop: $("#"+id).offset().top - $("#"+id).parent().offset().top
                    }, 500);
                });
                $(event.target).parent().siblings().find(".active").removeClass("active");
                $(event.target).addClass("active");
            },
            send_request() {
                try{
                    this.$http.get(this.getServer()+"/v1/offers/my_vouchers_sub_categorized?offer_category_id="+this.$route.params.id+"&page="+this.actual_page,{
                        headers:
                        this.getUserToken() != '' ?
                        {
                            "Authorization": "Bearer " + this.getUserToken(),
                            "X-Device-ID" : this.buildDeviceId(),
                            "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                        } :
                        {
                          "X-Device-ID" : this.buildDeviceId(),
                          "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                        }
                    }).then(function(response){
                        for(var key in response.body.data){
                            var category = {
                                name: '',
                                offers: []
                            }
                            category.name = response.body.data[key].attributes.name;
                            for(var key2 in response.body.data[key].relationships["ten-offers"].data){
                                for(var key3 in response.body.included){
                                    if(response.body.data[key].relationships["ten-offers"].data[key2].id == response.body.included[key3].id){
                                        category.offers.push(response.body.included[key3]);
                                    }
                                }
                            }
                            this.categories.push(category);
                        }
                        if(response.body.data.length > 0){
                            this.actual_page++;
                        }
                        if(response.body.meta != undefined && response.body.meta != null){
                          if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                            this.checkToken(response.body.meta.authentication_token)
                          }
                        }
                    }, function(response){
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                        }
                      }
                        this.errors_handler(response);
                    }).then(function(response){
                        $(this.$el).find(".sub_categories").slick({
                            arrows: false,
                            variableWidth: true,
                            infinite: false
                        });
                        var headerHeight = this.$el.children[0].offsetHeight;
                        var categoriesHeight = this.$el.children[1].offsetHeight;
                        var footerHeight = this.$el.children[3].offsetHeight;
                        this.resize_body(this.$el, "#subcategories_body", [
                            headerHeight,
                            categoriesHeight,
                            footerHeight
                        ]);
                    });
                }catch(e){
                    this.errors_handler(e.message);
                }
            },
            refresh() {
                this.categories = [];
                this.actual_page = 1;
                this.send_request();
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            this.send_request();
            var headerHeight = this.$el.children[0].offsetHeight;
            var categoriesHeight = this.$el.children[1].offsetHeight;
            var footerHeight = this.$el.children[3].offsetHeight;
            this.resize_body(this.$el, "#subcategories_body", [
                headerHeight,
                categoriesHeight,
                footerHeight
            ]);
            var vm = this;
            $("#offers-body").scroll(function(){
                if($(this).scrollTop() >= ($(this).prop("scrollHeight") - $(this).height())){
                    vm.send_request();
                }
            });
        }
    }
</script>

<style scoped>
    #subcategories_body{
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    .sub_categories div.active{
        background-color: rgba(200, 176, 120, 0.16);
        border-radius: 4px;
        color: #5B96FC;
    }

    .sub_categories div{
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 7px;
        margin-bottom: 5px;
        padding-left: 5px;
        padding-right: 5px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 11px;
        font-weight: 500;
        line-height: 24px;
        color: #BDBDBD;
        display: inline-block;
    }
</style>
