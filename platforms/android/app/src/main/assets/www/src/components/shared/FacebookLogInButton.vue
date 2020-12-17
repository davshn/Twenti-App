<template>
    <div class="facebook_button">
        <!-- <a href="http://facebook.com"
            target="_blank"
            class="col-xs-12 btn-facebook text-center">
            <img src="./src/assets/images/icons/facebook_negative.svg"
                alt="Facebook Logo"
                class="pull-left"/>
                {{ $t("common.log_in_fb") | capitalize }}
        </a> -->

        <!-- Added from walmart -->
        <!-- <a href="http://facebook.com"
            target="_blank"
            class="col-xs-12 btn-facebook text-center"
            @click.prevent="facebookLogin()">
            <img src="./src/assets/images/icons/facebook_negative.svg"
                alt="Facebook Logo"
                class="pull-left"/>
                {{ $t("common.log_in_fb") | capitalize }}
        </a> -->

        <a
            href="http://facebook.com"
            @click.prevent="facebookLogin()">
            <img
                src="./src/assets/images/icons/facebook_negative.svg"
                alt=""
                class="facebook_button__icon">
            <p class="facebook_button__text">
                Log In
            </p>
        </a>

    </div>
</template>

<script>

    // Addded from walmart
    export default {
        methods: {
            fbLoginSuccess(userData){
                var vm = this;
                facebookConnectPlugin.api("/me?fields=email", ["public_profile", "email"], function(response){
                    vm.$http.post(vm.getServer()+"/v1/users/facebook", {
                        email: response.email,
                        userID: response.id,
                        accessToken: userData.authResponse.accessToken
                    }).then(function(data){
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                          this.deleteSession('home', false);
                          this.create_user_db(this, this.getDB(), response);
                        }
                      }
                    }, function(data){
                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                        }
                      }
                        this.errors_handler(data);
                    });
                }, function(error){
                    vm.show_error_modal(error);
                });
            },
            facebookLogin(){
                var vm = this;
                facebookConnectPlugin.login(["public_profile", "email"],
                    vm.fbLoginSuccess,
                    function (error) {
                      vm.show_error_modal(error);
                    }
                );
            }
        }
    }

</script>

<style>

</style>
