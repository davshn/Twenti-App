<template>
    <div
        class="cell my-vouchers">
        <app-header
            :title="$t('drawer.locations')"></app-header>
        <div
            id="my_venues_body"
            class="cell my-vouchers__body ">
            <app-pull-refresh
                element="#my_venues_body"
                :refresh="refresh">
            </app-pull-refresh>
            <div
                class="small-12"
                id="venues">
                <!-- <app-container
                    :name="$t('offers.show.venues')"
                    :width="'45vw'"
                    :height="'30vw'"
                    :items="venues"
                    :venue="true"
                    :route="'venue_show'">
                </app-container> -->
                <app-instance-object
                  :objects="venues"
                  :object_type="'location'"
                  :route = "'venue_show'"
                  :wrap = "'wrap'"
                  ></app-instance-object>
            </div>
            <qr-button></qr-button>
        </div>


        <app-footer
            :active_item="4">
    </div>
</template>

<script>
import Venues from '../users/Venues.vue'
export default {
    data(){
        return {
            favourites: false,
            favourites_src: false,
            locations_src: true,
            venues: [],
            favourites_venues:[],
            actual_page_favourites: 1,
            actual_page: 1
        }
    },
    components: {
        "appVenues" : Venues
    },
    methods: {
        toggle_tab(event){
            var vm = this;
            var target = $(event.target).hasClass("tab") ?
                $(event.target) : $(event.target).parents(".tab");
            if(!$(target).hasClass("active")){
                $(target).addClass("active").siblings(".tab").removeClass("active");
                if($(target).find("svg").attr("id") == "img_venues"){
                    vm.favourites_src = false;
                    vm.locations_src = true;
                    if(vm.getIsChangedVenue() > 0){
                        vm.updateIsChangedVenue(0);
                        vm.refresh();
                    }
                    vm.favourites = false;
                    vm.resizing_body();
                }else{
                    vm.favourites_src = true;
                    vm.locations_src = false;
                    if(vm.getIsChangedVenue() > 0){
                        vm.updateIsChangedVenue(0);
                        vm.refresh();
                    }
                    vm.favourites = true;
                    vm.resizing_body();
                }
            }
        },
        resizing_body(){
            var headerHeight = this.$el.children[0].offsetHeight;
            var footerHeight = this.$el.children[2].offsetHeight;
            this.resize_body(this.$el, "#my_venues_body", [
                headerHeight,
                footerHeight
            ]);
        },
        send_request(){
            var vm = this;
            try{
                // vm.$http.get(vm.getServer()+"/v1/outlets/my_favorites?page="+vm.actual_page_favourites, {
                vm.$http.get("app/locations?page="+vm.actual_page, {
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
                      if(response.body.data[key].attributes.location_type == 'Centro Deportivo'){
                        this.venues.push(response.body.data[key])
                      }
                      if(response.body.data[key].attributes.is_favorite){
                        vm.favourites_venues.push(response.body.data[key]);
                      }
                    }
                    if(this.getUserToken() != '' &&
                        (this.getLocationUser() == '' ||
                        this.getLocationUser() == null ||
                        this.getLocationUser() == undefined)){
                      this.updateLocationUser(null);
                    }
                    this.updateLocations(this.venues);
                    if(response.body.data.length > 0){
                        vm.actual_page_favourites++;
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
                  if (response.status==401) {
                    // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                    this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                  }else{
                    this.show_error_modal(response.body.errors[0].details);
                  }
                })
            }catch(e){
                vm.errors_handler(e.message);
            }
        },
        refresh() {
            var vm = this;
            vm.actual_page_favourites = 1;
            vm.actual_page = 1;
            vm.venues = [];
            vm.favourites_venues = [];
            vm.send_request();
        }
    },
    mounted() {
        console.log(this.$route);
        this.resizing_body();
        this.send_request();
        var vm = this;
        navigator.geolocation.getCurrentPosition(vm.findPosition);

    }
}
</script>

<style scoped lang="scss">
    // #my_venues_body{
    //     overflow-y : auto;
    //     overflow-x: hidden;
    //     -webkit-overflow-scrolling: touch;
    // }

    .header {
        box-shadow: none;
    }
</style>
