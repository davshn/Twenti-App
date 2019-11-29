<template>
    <div
        class="col-xs-12 no-padding">
        <!-- <app-header
            :title="$t('drawer.favourites')"></app-header> -->
        <div
            class="col-xs-12 no-padding"
            id="my_vouchers_body">
            <app-pull-refresh
                element="#my_vouchers_body"
                :refresh="refresh">
            </app-pull-refresh>
            <div
                class="col-xs-12 no-padding"
                id="vouchers">
                <app-container
                    :name="$t('offers.show.venues')"
                    :width="'45vw'"
                    :height="'30vw'"
                    :items="venues"
                    :venue="true"
                    :route="'venue_show'">
                </app-container>
            </div>
        </div>
        <!-- <app-footer></app-footer> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                venues: [],
                actual_page: 1
            }
        }
        // },
        // methods: {
        //     send_request(){
        //         try{
        //             this.$http.get(this.getServer()+"/v1/outlets/my_favorites?page="+this.actual_page, {
        //                 headers:{
        //                     "Authorization": "Bearer " + this.getUserToken()
        //                 }
        //             }).then(function(response){
        //                 for(var key in response.body.data){
        //                     this.venues.push(response.body.data[key]);
        //                 }
        //                 if(response.body.data.length > 0){
        //                     this.actual_page++;
        //                 }
        //             }, function(response){
        //                 this.errors_handler(response);
        //             });
        //         }catch(e){
        //             this.errors_handler(e.message);
        //         }
        //     },
        //     refresh() {
        //         this.venues = [];
        //         this.actual_page = 1;
        //         this.send_request();
        //     },
        //     resizing_body(){
        //         var headerHeight = this.$el.children[0].offsetHeight;
        //         var footerHeight = this.$el.children[3].offsetHeight;
        //         var menuHeight   = this.$el.children[1].offsetHeight;
        //         this.resize_body(this.$el, "#my_vouchers_body", [
        //             headerHeight,
        //             footerHeight,
        //             menuHeight
        //         ]);
        //     }
        // },
        // mounted(){
        //     this.send_request();
        //     var vm = this;
        //     $("#offers-body").scroll(function(){
        //         if($(this).scrollTop() >= ($(this).prop("scrollHeight") - $(this).height())){
        //             vm.send_request();
        //         }
        //     });
        //     this.resizing_body();
        // }
    }
</script>

<style scoped>
    #my_vouchers_body{
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    .subheader{
        background: #FFF;
        padding: 8px;
        border-top: 1px solid #EFEFF4;
    }

    .subheader img{
        margin-right: 5px;
    }

    .header-text{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
    }

    /*.tab{
        color: #DEDEDE;
    }*/

    .active{
        color: #5B96FC;
    }

    .container-item__icon{
        transform: none !important;
    }
</style>
