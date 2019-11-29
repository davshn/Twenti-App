<template>
    <div
        class="col-xs-12 no-padding subcategory">
        <app-header
            :title="parent"></app-header>
        <div
            class="col-xs-12 no-padding subcategories subcategory__slide">
            <div
                v-for="category in categories">
                <div
                    class="text-center subcategory__slide-item">
                    {{ category.name | upperCase }}
                </div>
            </div>
        </div>
        <div
            class="col-xs-12 no-padding subcategory__content"
            id="subcategories_body">
            <app-pull-refresh
                element="#subcategories_body"
                :refresh="refresh">
            </app-pull-refresh>
            <app-container
                v-for="category in categories"
                :width="'45vw'"
                :height="'30vw'"
                :name="category.name"
                :view_all_flag="false"
                route="offer_show"
                :items="category.offers"
                :id="category.name.replace(/\s/g, '-') | upperCase"
                :key="category.id"
                :url="'/v1/offers/by_sub_category?offer_category_id='+category.id"
                :radius="getRadius()">
            </app-container>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                parent: '',
                categories: [],
                url: "/v1/offers/sub_categorized?offer_category_id=",
                actual_page: 1
            }
        },
        methods: {
            slide_to(id, event){
                var item = $(this.$el).find('#subcategories_body');
                $('.container-sub').hide();
                if(!$(event.target).hasClass("subcategory__slide-item")){
                    $('#'+$(".slick-current").find("div").text().trim().replace(/\s/g, '-')).show();
                }else{
                    $('#'+id).show();
                }
                $(event.target).parent().siblings().find(".active").removeClass("active");
                $(event.target).addClass("active");
            },
            send_request(){
                try{
                    this.$http.get(this.getServer()+this.url+this.$route.params.id+"&page="+this.actual_page,{
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
                            category.id = response.body.data[key].id;
                            category.name = response.body.data[key].attributes.name;
                            this.parent = response.body.data[key].attributes["parent-category"];
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
                        if($(this.$el).find(".subcategory__slide").hasClass("slick-initialized")){
                            $(this.$el).find(".subcategory__slide").slick("unslick");
                        }
                        $(this.$el).find(".subcategory__slide").slick({
                            arrows: false,
                            variableWidth: true,
                            focusOnSelect: true,
                            infinite: true,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            centerMode: true
                        });
                        $('.subcategory__slide').on('init', function(event, slick){
                          $('.subcategory__slide').slick('slickCurrentSlide');
                        });
                        this.slide_to($(".slick-current").find("div").text().trim().replace(/\s/g, '-'),"click");
                        var headerHeight = this.$el.children[0].offsetHeight;
                        var categoriesHeight = this.$el.children[1].offsetHeight;
                        var footerHeight = this.$el.children[3].offsetHeight;
                        var components = [headerHeight, categoriesHeight, footerHeight];
                        this.resize_body(this.$el, "#subcategories_body", components);
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
            var components = [headerHeight, categoriesHeight, footerHeight];
            this.resize_body(this.$el, "#subcategories_body", components);

            var vm = this;
            $(this.$el).find(".subcategory__slide").on('afterChange', function(event, slick, direction){
              vm.slide_to($(".slick-current").find("div").text().trim().replace(/\s/g, '-'),"click");
            });
        }
    }
</script>

<style scoped>
    /*#subcategories_body{

    }*/

    /*.sub_categories div.active{
        background-color: rgba(200, 176, 120, 0.16);
        border-radius: 4px;
        color: #5B96FC;
    }

    .sub_categories div{
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 7px;
        padding-left: 5px;
        padding-right: 5px;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        font-weight: 500;
        line-height: 24px;
        color: #BDBDBD;
        display: inline-block;
    }*/
.header {
    box-shadow: none;
}
</style>
