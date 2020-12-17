<template>
    <div class="container no-padding">
        <app-header :title="$t('common.sign_in')"></app-header>
        <div class="col-xs-12 no-padding" id="content">
            <div class="col-xs-12 no-padding center">
                <div class="col-xs-12">
                    <h3 class="title text-center" id="fuserewards_logo">FuseRewards</h3>
                </div>
                <form class="app-form-group col-xs-12">
                    <div class="app-form-group col-xs-12">
                        <p>
                            {{ $t("common.email") | capitalize }}
                            {{ $t("common.or") | capitalize }}
                            {{ $t("common.phone") | capitalize }}
                        </p>
                        <div class="col-xs-12 no-padding">
                            <input type="text"
                                id="validation"
                                class="col-xs-12 no-padding"
                                @input="validation()">
                        </div>
                      </div>
                      <hr class="col-xs-12 no-padding"/>
                      <div class="app-form-group col-xs-12">
                          <div class="col-xs-10 no-padding">
                              <p>
                                  {{ $t("common.pin_number") | capitalize }}
                              </p>
                              <div class="col-xs-12 no-padding">
                                  <input type="password"
                                      class="col-xs-12 no-padding"
                                      required
                                      id="user_password"
                                      v-model="data.attributes.password"
                                      pattern="[0-9]*" inputmode="numeric"
                                      maxlength="4">
                              </div>
                          </div>
                          <div class="col-xs-2 no-padding">
                              <img :src="img_src"
                                  alt="Show PIN"
                                  @click="toggle_password_view();"
                                  class="pull-right"
                                  id="visibility"/>
                          </div>
                      </div>
                      <!-- <div class="app-form-group col-xs-12">
                          <p>
                            {{ $t("common.phone") | capitalize }}
                          </p>
                          <div class="col-xs-12 no-padding">
                              <input type="number"
                                  class="col-xs-12 no-padding"
                                  v-model="data.attributes.mobile">
                          </div>
                      </div> -->
                      <span class="pull-right gold-text" id="forgot"
                            @click="$router.push({name: 'recoverpasswordapp'})">
                          {{ $t("log_in.forgot") }}
                      </span>
                      <div class="col-xs-12 no-padding">
                          <input type="submit"
                                 :value="$t('common.log_in') | capitalize"
                              class="col-xs-12 gold-button"
                              @click.prevent="submit_form()">
                      </div>
                </form>
                <hr class="col-xs-12 no-padding"/>
                <!-- Added from walmart -->
                <app-fb-log-in-btn></app-fb-log-in-btn>
                <span class="col-xs-12 text-center bottom-text">
                    {{ $t("log_in.bottom_text") }}
                    <router-link :to="{ name: 'sign_up' }"
                        tag="b"
                        class="gold-text">
                        {{ $t("common.sign_up") | capitalize }}
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                img_src: './src/assets/images/icons/visibility.svg',
                show_password: true,
                data: {
                    attributes: {
                        email: '',
                        password: '',
                        mobile: ''
                    }
                }
            }
        },
        methods: {
            toggle_password_view(){
                this.show_password = !this.show_password;
            },
            submit_form(){
                try{
                    if(this.data.attributes.password != "" &&
                        (this.data.attributes.email != "" || this.data.attributes.mobile != "") ){
                        this.$http.post(this.getServer()+"/v1/sessions", {
                            data: this.encrypt(this.data).toString()
                        }).then(function(response){
                          if(response.body.meta != undefined && response.body.meta != null){
                            if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                              this.checkToken(response.body.meta.authentication_token)
                              this.deleteSession('home', false);
                              this.create_user_db(this, this.getDB(), response);
                              console.log('Listos');
                              window.history.back()
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
                    }else{
                        this.show_error_modal(this.$t("common.required_fields"));
                    }
                }catch(e){
                  this.show_error_modal(e.message);
                    // this.errors_handler(e.message);
                }
            },
            validation(){
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(re.test($("#validation").val())){
                    this.data.attributes.email = $("#validation").val();
                    this.data.attributes.mobile = "";
                }else{
                    this.data.attributes.mobile = $("#validation").val();
                    this.data.attributes.email = "";
                }
            }
        },
        watch: {
            show_password(val){
                var pass;
                if(this.show_password){
                    this.img_src = './src/assets/images/icons/visibility.svg';
                    $(this.$el).find("#user_password").attr("type", "password");
                }else{
                    this.img_src = './src/assets/images/icons/visibility_off.svg';
                    $(this.$el).find("#user_password").attr("type", "text");
                }
            }
        },
        mounted(){
            // this.init_db();
            this.check_user();
            this.resize_body(this.$el.children[1], this.$el.children[1], [
                50.58
            ]);
            // Added from walmart
            var maxHeight = $("#content").children().first().height() +
                this.$el.children[0].clientHeight;
            if(maxHeight < document.documentElement.clientHeight){
                $("#content").children().first().addClass("center");
            }
            var vm = this;
            navigator.geolocation.getCurrentPosition(vm.findPosition);
        }
    }
</script>

<style scoped>
    div#content{
        background: url("./src/assets/images/restaurants/1.jpg");
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        /*Added from walmart*/
        background-position: center;
        background-size: cover;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    div#content:before{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(225deg, rgba(255,255,255,0.72) 0%, #FFFFFF 100%);
    }
    #fuserewards_logo{
        margin-top: 32px;
        margin-bottom: 16px;
    }
    div.app-form-group{
        background-color: #FFFFFF;
        border-radius: 4px;
        padding: 9px;
        margin-bottom: 16px;
    }
    div.app-form-group:first-child{
        margin-bottom: 0px;
    }
    div.app-form-group input{
        border: none;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 16px;
        line-height: 16px;
        color: #212121;
    }
    div.app-form-group p{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        line-height: 16px;
        color: #9E9E9E;
        margin-bottom: 0px;
    }
    hr{
        border-top: 1px solid #EFEFF4;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    div.app-form-group img#visibility{
        margin-top: 7px;
        opacity: 0.3;
    }
    #forgot{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 11px;
        font-weight: 500;
        text-align: right;
        line-height: 16px;
        color: #A39161;
        margin-top: -12px;
        margin-bottom: 12px;
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
    .center{
        position: absolute;
        top: 50%;
        transform: translateY(-60%);
    }
</style>
