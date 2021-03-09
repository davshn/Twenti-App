<template>
    <div class="grid-container home">
      <div class="grid-x">
        <app-login-form></app-login-form>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                coupons:[],
                commerce_name: "",
                categories: [],
                reverse_categories: [],
                charged: false
            }
        },
        methods:{
            send_request(){
              var vm = this;
              navigator.geolocation.getCurrentPosition(vm.findPosition);
                try{
                    this.$http.get(this.getServer()+"/v1/find_coupons", {
                        headers:
                        this.getUserToken() != '' ?
                        {
                            "Authorization": "Bearer " + this.getUserToken(),
                            "X-Device-ID" : this.buildDeviceId(),
                            "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                        } :
                        {
                          "X-Device-ID" : this.buildDeviceId(),
                          "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                        }
                    }).then(function(response){
                        console.log(response);
                        this.charged = true;
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
                        this.show_error_modal(response.body.errors[0].details);
                        // this.errors_handler(response);
                    });
                }catch(e){
                  this.show_error_modal(e.message);
                    // this.errors_handler(e.message);
                }
            },
            create_slick() {
                $(".home__carousel-left").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 3,
                    centerPadding: '60px',
                    lazyLoad: 'ondemand',
                    variableWidth: true,
                    adaptiveHeight: true,
                    rtl: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    slidesToScroll: 1,
                    swipeToSlide: true
                });
                $(".home__carousel-right").slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 3,
                    centerPadding: '60px',
                    lazyLoad: 'ondemand',
                    variableWidth: true,
                    adaptiveHeight: true,
                    rtl: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    slidesToScroll: 1,
                    swipeToSlide: true
                });
            }
        },
        mounted(){
            // this.init_db();
            // this.send_request();
            if(this.getClientHeight() == null){
              // if(device.platform == "iOS"){
              //   this.updateClientHeight(document.documentElement.clientHeight - $('.bar').height());
              // }else{
                this.updateClientHeight(document.documentElement.clientHeight);
              // }
            }
            // if(this.charged){
            //     this.create_slick();
            // }
            this.create_slick();
            navigator.splashscreen.hide
        }
    }
</script>

<style scoped>
    div#body:before{
        content: ' ';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.03;
    }
    .title{
        font-family: Libre Baskerville Regular;
        font-size: 33px;
        margin-top:26px;
        color: #212121;
        line-height: 40px;
    }
    .title i{
        font-family: Libre Baskerville Italic;
    }
    .description{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 13px;
        line-height: 24px;
        color: #616161;
        margin-bottom: 22px;
        opacity: 0;
    }
    .skip-button{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 1px;
        margin-top: 16px;
        margin-right: 15px;
        text-transform: uppercase;
    }
    a:focus, a:active{
        text-decoration: none;
    }
    /*.carousel{
        margin-top: 10px;
    }
    .carousel img{
        width: 110px;
        height: 104px;
        box-shadow: 0 2px 8px 0 rgba(189,189,189,0.84);
        border-radius: 8px;
        margin-left: 5px;
        margin-right: 5px;
    }*/
    .gold-button{
        margin-top: 40px;
    }
</style>
