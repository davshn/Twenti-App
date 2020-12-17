<template>
  <div
    class="cell my-vouchers">
    <div
      class="drawer_background"
      v-if="getShowDrawer()"
      @click="updateShowDrawer(false)">
    </div>
    <app-header
      :title="$t('common.my_vouchers')">
      <img
        src="./src/assets/images/icons/icons/ico_menu.svg"
        slot="left-content"
        @click="updateShowDrawer(true)"
        id="drawer_icon"/>
    </app-header>
    <transition
      name="slide">
      <v-touch
        @swipeleft="toggle_drawer()"
        tag="app-drawer"
        :margin_top="margin_top"
        v-if="getShowDrawer()"
        ></v-touch>
    </transition>
    <div
      class="cell my-vouchers__body"
      id="my_vouchers_body">
      <app-pull-refresh
        element="#my_vouchers_body"
        :refresh="refresh">
      </app-pull-refresh>
      <div
        class="small-12"
        id="rewards">
        <app-instance-object
          :objects="rewards"
          :object_type="'offer'"
          :route = "'offer_show'"
          :wrap = "'wrap'"></app-instance-object>
          <div v-if="rewards.length==0"
               class="my-vouchers__body__not-favorites">
            <svg  fill="#DCDEE2" style="padding-left:30px;margin-top:35%;width:100%;height:100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 20">
              <g id="Group_466" data-name="Group 466" transform="translate(0 0)">
                <path id="Path_653" data-name="Path 653" class="cls-1" d="M14.594,3.75H12.686A2.342,2.342,0,0,0,10.813,0,2.1,2.1,0,0,0,9.006.878,9.1,9.1,0,0,0,8,2.962,9.1,9.1,0,0,0,6.994.878,2.1,2.1,0,0,0,5.188,0,2.342,2.342,0,0,0,3.314,3.75H1.406A1.408,1.408,0,0,0,0,5.156v.938A1.408,1.408,0,0,0,.938,7.419v7.174A1.408,1.408,0,0,0,2.344,16H13.656a1.408,1.408,0,0,0,1.406-1.406V7.419A1.408,1.408,0,0,0,16,6.094V5.156A1.408,1.408,0,0,0,14.594,3.75ZM8.86,3.336c.718-1.822.991-2.4,1.952-2.4a1.406,1.406,0,0,1,0,2.813H8.7ZM5.188.937c.961,0,1.234.576,1.952,2.4L7.3,3.75H5.188a1.406,1.406,0,1,1,0-2.813Zm.938,14.125H2.344a.469.469,0,0,1-.469-.469V7.5h4.25Zm0-8.5H1.406a.469.469,0,0,1-.469-.469V5.156a.469.469,0,0,1,.469-.469H6.125Zm2.813,8.5H7.063V4.688H8.938Zm5.187-.469a.469.469,0,0,1-.469.469H9.875V7.5h4.25Zm.938-8.5a.469.469,0,0,1-.469.469H9.875V4.688h4.719a.469.469,0,0,1,.469.469Z" transform="translate(0 0)"/>
              </g>
            </svg>
            <div class="my-vouchers__body__not-favorites--text" >
              <p>
                ¡Aún no cuentas con rewards!
                <br>
                <b>Comienza a usar la app y pronto recibirás ofertas y beneficios seleccionados especialmente para ti.</b>
              </p>
            </div>

          </div>
      </div>
      <qr-button></qr-button>
    </div>
    <app-footer
      :active_item="1"
      :active_section="'voucher'"></app-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                vouchers_src: './src/assets/images/icons/Drawer/vouchers.svg',
                rewards_src: './src/assets/images/icons/Drawer/upgrade_grey.svg',
                vouchers_categories: [],
                rewards_categories: [],
                tab: true,
                actual_page_v: 1,
                actual_page_r: 1,
                is_changed: false,
                refreshed: false,
                rewards: [],
                favorites_charged: false,
                rewards_charged: false,
                current_offer: null,
                show_drawer: false,
                margin_top: "0px"
            }
        },
        methods: {
          toggle_drawer(){
            this.show_drawer = !this.show_drawer;
            this.updateShowDrawer(this.show_drawer)
            // if(this.getShowDrawer()){
            //   $(this.$el).find("#drawer_icon")
            //       .attr("src", "./src/assets/images/icons/close.svg");
            // }else{
            //   $(this.$el).find("#drawer_icon")
            //       .attr("src", "./src/assets/images/icons/icons/ico_menu.svg");
            // }
          },
            send_request(init = false){
                var flag = false;
                var flag2 = false;
                var vm = this;
                try{
                  vm.$http.get("app/offers/rewards", {
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
                    for (var i = 0; i < response.body.data.length; i++) {
                      var temp_obj = response.body.data[i]
                      temp_obj.attributes.is_favorite = false
                      for (var j = 0; j < response.body.meta.favorites.length; j++) {
                        if(response.body.meta.favorites[j].favoritable_id == temp_obj.id){
                          temp_obj.attributes.is_favorite = true
                        }
                      }
                      console.log(temp_obj);
                      this.rewards.push(temp_obj)
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
                    console.log("Respuesta error de rewards");
                    if (response.status==401) {
                      // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                      this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                    }else{
                      this.show_error_modal(response.body.errors[0].details);
                    }
                  });
                }catch(e){
                  console.log("Fallo rewards");
                  this.show_error_modal(e.message);
                }

                vm.is_changed = false;
            },
            refresh() {
                var vm = this
                vm.rewards = [];
                vm.actual_page_v = 1;
                vm.actual_page_r = 1;
                vm.send_request();
                vm.refreshed = true;
            },

            // Added from walmart
            insert_db_offers(){
                var vm = this;
                var db = window.openDatabase('FuseRewardsD', "1.0", "", 200000);
                db.transaction(function(tx) {
                    tx.executeSql('UPDATE Cache SET vouchers = ?, rewards = ? WHERE id = 1',
                        [JSON.stringify(vm.vouchers_categories), JSON.stringify(vm.rewards_categories)], function(tx,rs) {
                    }, function(error) {
                        vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
                    });
                }, function(error) {
                    vm.show_error_modal('Transaction ERROR: ' + error.message);
                }, function() {
                });
            },
            init_db_offers(){
                var vm = this;
                var db = window.openDatabase('FuseRewardsD', "1.0", "", 200000);
                db.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM Cache', [], function(tx,rs) {
                        if(rs.rows.length > 0){
                            if(rs.rows.item(0).vouchers != null
                                && rs.rows.item(0).rewards != null){
                                vm.vouchers_categories = JSON.parse(rs.rows.item(0).vouchers);
                                vm.rewards_categories = JSON.parse(rs.rows.item(0).rewards);
                                vm.actual_page++;
                            }else{
                                vm.send_request(true);
                            }
                        }else{
                            vm.send_request(true);
                        }
                    }, function(error) {
                        vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
                    });
                }, function(error) {
                    vm.show_error_modal('Transaction ERROR: ' + error.message);
                }, function() {
                });
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            var headerHeight = this.$el.children[0].offsetHeight;
            var footerHeight = this.$el.children[2].offsetHeight;
            this.resize_body(this.$el, "#my_vouchers_body", [
                headerHeight,
                footerHeight
            ]);
            // this.init_db_offers();
            this.send_request();
            var vm = this;
            $("#offers-body").scroll(function(){
                if($(this).scrollTop() >= ($(this).prop("scrollHeight") - $(this).height())){
                    vm.send_request();
                }
            });
            if(this.$route.params.rewards != null){
                $("#img_rewards").parent().click();
            }
            if(this.$route.params.notId != null){
                this.send_request();
                $("#img_rewards").parent().click();
            }
            $(this.$el).find(".heart").on("click", function(){
                vm.is_changed = true;
            })
        },
        computed: {
          ...mapGetters({
            change_offer: 'getIsChangedVoucher'
          })
        },
        watch:{
          change_offer(){
            // this.favorites.splice(this.getCurrentOffer(), 1)
          }
        }
    }
</script>

<style scoped>
.header {
    box-shadow: none;
}

</style>
