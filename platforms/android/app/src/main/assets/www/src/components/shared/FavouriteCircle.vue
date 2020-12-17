<template>
    <button class="gold-button circle center-block" id="add">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" @click.prevent="change_active($event)">
          <path fill-rule="evenodd" d="M15.3163233,18.7988781 C13.4283233,20.4048781 10.6023233,20.4048781 8.70732325,18.8078781 C5.14832325,15.8078781 2.15732325,13.7098781 2.00432325,9.47387812 C1.81232325,4.15087812 8.06132325,1.97187812 11.6113233,6.31487812 C11.8053233,6.55287812 12.1933233,6.54787812 12.3863233,6.30987812 C15.9243233,1.95187812 22.2613233,4.15987812 21.9923233,9.59987812 C21.7903233,13.6938781 18.8993233,15.7508781 15.3163233,18.7988781 Z"/>
        </svg>
    </button>
</template>

<script>
    export default{
        props: {
            itemid: {
                type: [String,Number],
                default: -1
            },
            status: {
                type: [String,Boolean],
                default: false
            },
            center: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            status: function(){
                if(this.status && this.status != "not_included" || this.status == "true"){
                    $(this.$el).addClass("active");
                }
            }
        },
        methods: {
            change_active(event){
              var vm = this
              navigator.geolocation.getCurrentPosition(vm.findPosition);
                if(this.getUserToken()){
                    var target = $(event.target).prop("tagName") == "button" ? $(event.target) : $(event.target).parents("button");
                    if($(target).hasClass("active")){
                        $(target).removeClass("active");
                        try{
                            this.$http.delete(this.getServer()+"/v1/offers/"+this.itemid+"/remove_from_my_vouchers", {
                                headers:{
                                    "Authorization": "Bearer " + this.getUserToken(),
                                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                }
                            })
                            .then(function(response){
                                this.remove_cache_vouchers();
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
                                $(target).addClass("active");
                                this.errors_handler(response);
                            });
                        }catch(e){
                            this.errors_handler(e.message);
                        }
                    }else{
                        $(target).addClass("active");
                        try{
                            this.$http.post(this.getServer()+"/v1/offers/"+this.itemid+"/add_to_my_vouchers", null, {
                                headers:{
                                    "Authorization": "Bearer " + this.getUserToken(),
                                    "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                                }
                            })
                            .then(function(response){
                                this.remove_cache_vouchers();
                            }, function(response){
                                $(target).removeClass("active");
                                this.errors_handler(response);
                            });
                        }catch(e){
                            this.errors_handler(e.message);
                        }
                    }
                }else{
                    this.$router.push({ name: "sign_up" });
                }
            }
        },
        mounted(){
            if(this.status && this.status != "not_included" || this.status == "true"){
                $(this.$el).addClass("active");
            }
            if(this.center == true){
                $(this.$el).addClass("center");
            }
        }
    }
</script>

<style scoped lang="scss">
    svg{
        fill: #fff;

    }

    button.active{

        background-color: #fe2851;
        svg{
            fill: #FFF;
        }

    }

    button.center{

        svg{
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    button#add{
        border: none;
        width: 48px;
        height: 48px;
        margin-top: -24px;
    }
</style>
