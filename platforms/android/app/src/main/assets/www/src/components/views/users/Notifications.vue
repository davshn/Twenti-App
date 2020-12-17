<template>
  <div class="col-xs-12 no-padding notifications">
    <app-header :title="$t('common.notifications')"></app-header>
    <div class="col-xs-12 no-padding" id="notifications-body">
      <app-pull-refresh element="#notifications-body" :refresh="refresh">
      </app-pull-refresh>
      <div class="col-xs-12 little-padding notifications__container">
        <div
          v-for="noti in notifications"
          :key="noti.id">
          <router-link
            v-if="noti.attributes.notification_type != 'message' &&
                  noti.attributes.notification_type != 'redeem'"
            :to="translateLink(noti)"
            tag="div"
            :class="'col-xs-12 notification ' + noti.attributes.state"
            >
            <div @click="mark_as_seen(noti.id, noti.attributes.state)" class="notifications__container--flex">
              <div
                class="col-xs-2 no-padding notifications__container--image">
                <img :src="getServerImage() + noti.attributes.image || './src/assets/images/icons/Notifications/reward.svg'"
                  class="img-circle col-xs-12 no-padding icon-img">
              </div>
              <div class="col-xs-10 notifications__container--content">
                <p
                  class="notifications__container--content__message">
                  {{ noti.attributes.created_at | moment("DD &#xb7; MM &#xb7; YYYY") }}
                </p>
                <p
                  class="notifications__container--content__title">
                  {{ noti.attributes.title }}
                </p>
                <p
                  class="notifications__container--content__message">
                  {{ noti.attributes.message }}
                </p>
                <div class="indicator" :class="noti.attributes.notification_type"></div>
              </div>
            </div>
          </router-link>
          <div
            v-else
            :class="'col-xs-12 notification ' + noti.attributes.state"
            @click="noti.attributes.state='SEEN';show_error_modal(noti.attributes.message, noti.attributes.title, 'Cerrar', false, false)">
            <div @click="mark_as_seen(noti.id, noti.attributes.state)" class="notifications__container--flex">
              <div
                class="col-xs-2 no-padding notifications__container--image">
                <img :src="getServerImage() + noti.attributes.image || './src/assets/images/icons/Notifications/reward.svg'"
                  class="img-circle col-xs-12 no-padding icon-img">
              </div>
              <div class="col-xs-10 notifications__container--content">
                <p
                  class="notifications__container--content__message">
                  {{ noti.attributes.created_at | moment("DD &#xb7; MM &#xb7; YYYY") }}
                </p>
                <p
                  class="notifications__container--content__title">
                  {{ noti.attributes.title }}
                </p>
                <p
                  class="notifications__container--content__message">
                  {{ noti.attributes.message }}
                </p>
                <div class="indicator" :class="noti.attributes.notification_type"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="notifications.length==0"
             class="my-vouchers__body__not-favorites">
          <svg  fill="#DCDEE2" style="padding-left:30px;margin-top:35%;width:100%;height:100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 20">
            <g id="ico_bell" transform="translate(-25.25)">
              <g id="Group_11" data-name="Group 11" transform="translate(31.603)">
                <g id="Group_10" data-name="Group 10">
                  <path id="Path_18" data-name="Path 18" class="cls-1" d="M190.551,0a2.664,2.664,0,0,0-2.661,2.661v.8h1.376v-.8a1.285,1.285,0,0,1,2.569,0v.8h1.376v-.8A2.664,2.664,0,0,0,190.551,0Z" transform="translate(-187.89)"/>
                </g>
              </g>
              <g id="Group_13" data-name="Group 13" transform="translate(31.006 16.766)">
                <g id="Group_12" data-name="Group 12">
                  <path id="Path_19" data-name="Path 19" class="cls-1" d="M177.762,429.2a1.86,1.86,0,0,1-1.858,1.858h-.046A1.86,1.86,0,0,1,174,429.2h-1.376a3.238,3.238,0,0,0,3.234,3.234h.046a3.238,3.238,0,0,0,3.234-3.234Z" transform="translate(-172.624 -429.205)"/>
                </g>
              </g>
              <g id="Group_15" data-name="Group 15" transform="translate(25.25 2.546)">
                <g id="Group_14" data-name="Group 14">
                  <path id="Path_20" data-name="Path 20" class="cls-1" d="M43.168,79.137,41.213,76.1v-3.9a6.95,6.95,0,1,0-13.9,0v3.9l-1.955,3.041a.688.688,0,0,0,.579,1.06H42.589a.688.688,0,0,0,.579-1.06ZM27.2,78.821l1.383-2.151a.688.688,0,0,0,.109-.372V72.192a5.574,5.574,0,1,1,11.147,0V76.3a.688.688,0,0,0,.109.372l1.383,2.151H27.2Z" transform="translate(-25.25 -65.174)"/>
                </g>
              </g>
            </g>
          </svg>
          <div class="my-vouchers__body__not-favorites--text">
            <p>
              <br>
              No has recibido notificaciones aún.
              <br>
              <b>Pronto llegarán ofertas especiales para ti.</b>
            </p>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            actual_page: 1,
            notifications: [],
            current_notifications: 0,
            data: {
                attributes: {
                    id: ''
                }
            }
        }
    },
    methods: {
        refresh(){
            this.actual_page = 1;
            this.notifications = [];
            this.send_request();
        },
        translateLink(noti){
          if(noti.attributes.link !=  null && noti.attributes.link != undefined){
            if(noti.attributes.link.includes("offers")){
                return {
                    name: "offer_show",
                    params: {
                        id: /\d+/g.exec(noti.attributes.link.slice(3, noti.attributes.link.length))[0],
                        is_voucher: noti.attributes['is-voucher'],
                        is_favorite: noti.attributes['is-favorite'],
                        notId: noti.id
                    }
                }
            }else if(noti.attributes.link.includes("classes")){
              return {
                  name: "class_show",
                  params: {
                      id: /\d+/g.exec(noti.attributes.link.slice(3, noti.attributes.link.length))[0],
                      is_voucher: noti.attributes['is-voucher'],
                      is_favorite: noti.attributes['is-favorite'],
                      notId: noti.id
                  }
              }
            }else{
                return {
                    name: "my_vouchers",
                    params: {
                      notId: noti.id
                    }
                }
            }
          }else{
            return {
                name: "notifications"
            }
          }

        },
        send_request(){
            this.$http.get("users/notifications?page="+this.actual_page, {
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
                this.current_notifications = 0
                for(var key in response.body.data){
                  this.notifications.push(response.body.data[key]);
                  if (response.body.data[key].attributes.state != "SEEN") {
                    this.current_notifications += 1
                  }
                }
                this.updateNotifications(this.current_notifications)
                this.updateBadgeNotifications(this.current_notifications)
                if(response.body.meta != undefined && response.body.meta != null){
                  if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                    this.checkToken(response.body.meta.authentication_token)
                  }
                }
            }, function(response){
              this.$router.push({name: 'log_in'})
            });
        },
        mark_as_seen(id, state){
          if(state=="CREATED"){
            this.data.attributes.id=id;
            this.$http.post("users/mark_notif_as_seen", {
              data: this.encrypt(this.data).toString()
            },
            {
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
              var notifications = this.getNotifications()
              this.updateNotifications(notifications-1)
              this.updateBadgeNotifications(notifications-1)
            }, function(response){
              // this.$router.push({name: 'log_in'})
            });
          }
        }
    },
    mounted(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
        var headerHeight = this.$el.children[0].offsetHeight;
        var footerHeight = this.$el.children[2].offsetHeight;
        var components = [headerHeight, footerHeight];
        this.resize_body(this.$el, "#notifications-body", components);
        this.send_request();
        var vm = this
        console.log(vm.push);
        // this.clearNotifications()
    }
  }
</script>
