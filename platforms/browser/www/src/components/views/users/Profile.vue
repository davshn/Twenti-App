<template>
    <div
        class="profile">

        <div
            class="header col-xs-12 no-padding">
            <div
                class="col-xs-12 no-padding" id="body">
                <div
                    class="col-xs-2 no-padding">
                    <div
                        @click="redirect_back();"
                        id="left"
                        class="col-xs-12 no-padding">
                        <img
                            src= "./src/assets/images/icons/arrow_left_white.svg"
                            alt="Back" id="back"
                            class="col-xs-2 no-padding"
                            style="height: 24px; width: 24px">
                    </div>
                </div>
                <div
                    class="col-xs-8 no-padding text-center">
                    <p
                        class="header__title no-padding col-xs-12">
                        {{ $t('common.edit_profile') | upperCase }}
                    </p>
                </div>
                <div
                    class="col-xs-2 no-padding">
                    <div
                        class="col-xs-12 no-padding"
                        id="right">
                        <img
                            src= "./src/assets/images/icons/send.svg"
                            alt="Search" id="search"
                            class="pull-right"
                            id="search_btn"
                            @click="validateBeforeChange()"/>
                    </div>
                </div>
            </div>
            <app-loader></app-loader>
        </div>

        <div
            class="profile__header">
            <div
                class="profile__user-photo">
            </div>
            <p
                class="profile__user-name cell">
                {{ activeUser() | capitalize }} <br>
                <span>{{ getRewardsCount()+' '+ $t('common.new_rewards') | lowerCase }} </span>
            </p>
        </div>
        <div
            class="grid-x profile__rewards-info">
            <div
                class="small-4">
                <p>{{ getRedemptionsCount() }}</p>
                <span>{{$t("profile.redeemed") | upperCase}}</span>
            </div>
            <div
                class="small-4">
                <p>{{ getLocationsCount() }}</p>
                <span>{{$t("profile.locations") | upperCase}}</span>
            </div>
            <div
                class="small-4">
                <p>{{ getRewardsCount() }}</p>
                <span>{{$t("profile.gifts") | upperCase}}</span>
            </div>
        </div>

        <div
            class="profile__user-form form">
            <p>
                {{$t("profile.general_information") | upperCase}}
            </p>
            <form
                class="grid-x">


                <div
                    class="small-12 form__field grid-x"
                    :class="{'input': true, 'is-danger animated': errors.has('name') }">
                    <div class="form__labelWrapper">
                        <label class="form__label" for="name">
                            {{$t("profile.user_first_name") | capitalize}}
                        </label>
                        <span
                            v-show="errors.has('name')"
                            class="form__help form__help--danger">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form__labelWrapper cell">
                        <input
                            name="name"
                            type="text"
                            v-validate="'alpha'"
                            :value="activeUserName() | lowerCase"
                            v-model="data.attributes.name"
                            :placeholder="$t('common.name_placeholder')">
                        <img
                            src="./src/assets/images/icons/edit.svg"
                            alt=""
                            class="pull-right"
                            onclick ="$(this).parent().find('input').focus()">
                    </div>
                </div>



                <div
                    class="small-12 form__field grid-x"
                    :class="{'input': true, 'is-danger animated': errors.has('last_name') }">
                    <div class="form__labelWrapper">
                        <label class="form__label" for="last_name">
                            {{$t("profile.user_last_name") | capitalize}}
                        </label>
                        <span
                            v-show="errors.has('last_name')"
                            class="form__help form__help--danger">{{ errors.first('last_name') }}</span>
                    </div>
                    <div class="form__labelWrapper cell">
                        <input
                            name="last_name"
                            type="text"
                            v-validate="'alpha'"
                            :value="activeUserLastName() | lowerCase"
                            v-model="data.attributes.last_name"
                            :placeholder="$t('common.last_name_placeholder')">
                        <img
                            src="./src/assets/images/icons/edit.svg"
                            alt=""
                            class="pull-right"
                            onclick ="$(this).parent().find('input').focus()">
                    </div>
                </div>

                <div
                    class="small-6 form__field grid-x">
                    <div class="form__labelWrapper">
                        <label
                            for="">{{$t("profile.user_gender") | capitalize}}</label> <br>
                    </div>

                    <div class="form__labelWrapper cell">
                        <select
                            class=""
                            name="gender"
                            v-model="data.attributes.gender">
                            <option value="">
                            </option>
                            <option
                                :value="$t('profile.gender_male')">
                                {{$t("profile.gender_male") | capitalize}}
                            </option>
                            <option
                                :value="$t('profile.gender_female')">
                                {{$t("profile.gender_female") | capitalize}}
                            </option>
                        </select>
                    </div>
                </div>
                <div
                    class="small-6 form__field grid-x">
                    <div class="form__labelWrapper">
                        <label
                            for="age">{{$t("profile.user_age") | capitalize}}</label>
                        <span
                            v-show="errors.has('age')"
                            class="form__help form__help--danger">{{ errors.first('age') }}</span>
                    </div>
                    <div class="form__labelWrapper cell">
                        <input
                            name="age"
                            type="number"

                            v-model="data.attributes.age"
                            :placeholder="$t('common.age_placeholder')"
                            v-validate="'numeric'">
                    </div>
                </div>
            </form>
        </div>
        <div
            class="grid-x profile__user-form form">
            <p>
                {{$t("profile.private_information") | upperCase}}
            </p>
            <form
                class="grid-x">
                <div
                    class="small-12 form__field grid-x"
                    :class="{'input': true, 'is-danger animated': errors.has('email') }">
                    <div class="form__labelWrapper">
                        <label class="form__label" for="email">
                            {{$t("common.email") | capitalize}}
                        </label>
                        <span
                            v-show="errors.has('email')"
                            class="form__help form__help--danger">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form__labelWrapper cell">
                        <input
                            name="email"
                            type="text"
                            v-validate="'email'"
                            :value="activeUserEmail() | lowerCase "
                            v-model="data.attributes.email">
                        <img
                            src="./src/assets/images/icons/edit.svg"
                            alt=""
                            class="pull-right"
                            onclick ="$(this).parent().find('input').focus()">
                    </div>
                </div>

                <div
                    class="small-12 form__field grid-x"
                    :class="{'input': true, 'is-danger animated': errors.has('phone') }">
                    <div class="form__labelWrapper cell">
                        <label
                            for="phone"
                            class="small-6">
                            {{$t("common.phone") | capitalize}}
                        </label>
                        <span
                            v-show="errors.has('phone')"
                            class="form__help form__help--danger small-6">{{ errors.first('phone') }}</span>
                    </div>

                    <div class="form__labelWrapper cell">
                        <input
                            name="phone"
                            type="text"
                            v-validate="'numeric|digits:10'"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            :value="activeUserMobile()"
                            v-model="data.attributes.mobile">
                        <img
                            src="./src/assets/images/icons/edit.svg"
                            alt=""
                            class="pull-right"
                            onclick ="$(this).parent().find('input').focus()">
                    </div>

                </div>

                <div
                    class="small-12 form__field grid-x"
                    :class="{'input': true, 'is-danger animated': errors.has('password') }">
                    <div class="form__labelWrapper cell">
                        <label
                            for="password"
                            class="small-6">
                            {{$t("common.pin_number") | capitalize}}
                        </label>
                        <span
                            v-show="errors.has('password')"
                            class="form__help form__help--danger small-6">{{ errors.first('password') }}</span>
                    </div>

                    <div class="form__labelWrapper cell">
                        <input
                            name="password"
                            v-model="data.attributes.password"
                            v-validate="'digits:4'"
                            class="form__input form__input--profile"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            maxlength="4"
                            type="password"
                            placeholder="your password"
                            id="user_password">
                        <img
                            :src= "img_src"
                            alt="Show PIN"
                            @click="toggle_password_view();"
                            class="form__icon--eye pull-right"
                            id="visibility"
                            onclick="$(this).parent().find('input').focus()"/>
                    </div>

                </div>





            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                show_password: true,
                img_src: './src/assets/images/icons/visibility.svg',
                data: {
                    attributes: {
                        email: '',
                        password: '',
                        password_confirmation:'',
                        mobile: '',
                        name: "",
                        last_name: "",
                        gender: "",
                        age: null,
                        picture: ""
                    }
                }
            }
        },
        props: {
            margin_top: {
                type: String,
                default: "0px"
            }
        },
        created(){
            try{
                this.$http.get(this.getServer()+"/v1/users/profile", {
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
                    this.updateRewardsCount(response.body.meta.rewards_count);
                    this.updateLocationsCount(response.body.meta.locations_count);
                    this.updateRedemptionsCount(response.body.meta.redemptions_count);
                }, function(response){
                  if (response.status==401) {
                    // this.show_error_modal(response.body.errors[0].details, "Un momento...");
                    this.show_error_modal("Tienes una sesión abierta en otro dispositivo.", "Un momento...");
                  }else{
                    this.show_error_modal(response.body.errors[0].details);
                  }
                    // this.errors_handler(response);
                });
            }catch(e){
              this.show_error_modal(e.message);
                // this.errors_handler(e.message);
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            var mt = this.margin_top.split("px")[0];
            this.resize_body(this.$el, this.$el, [mt]);
            if(this.activeUserName() != null){
                this.data.attributes.name = this.activeUserName();
            }else{
                this.data.attributes.name = ""
            };
            if(this.activeUserLastName() != null){
                this.data.attributes.last_name = this.activeUserLastName();
            }else{
                this.data.attributes.last_name = ""
            };
            if(this.activeUserGender() != null){
                if(this.activeUserGender() == "Male" || this.activeUserGender() == "Masculino" || this.activeUserGender() == "masculino" || this.activeUserGender() == "male"){
                    this.data.attributes.gender = this.$t("profile.gender_male");
                }else if(this.activeUserGender() == "Female" || this.activeUserGender() == "Femenino" || this.activeUserGender() == "femenino" || this.activeUserGender() == "female"){
                    this.data.attributes.gender = this.$t("profile.gender_female");
                }else{
                    this.data.attributes.gender = "";
                }
            }else{
                this.data.attributes.gender = "";
            };

            if(this.activeUserEmail() != null){
                this.data.attributes.email = this.activeUserEmail();
            }else{
                this.data.attributes.email = "";
            };

            if(this.activeUserMobile() != null){
                this.data.attributes.mobile = this.activeUserMobile();
            }else{
                this.data.attributes.mobile = "";
            };
            // this.data.attributes.age = parseInt(this.activeUserAge());
            // var vue = this;
            $("#validation").focusin(function(){
                vue.focus = true;
            })
            $("#validation").focusout(function(){
                vue.focus = false;
            })
        },
        methods: {
            logOut(){
                this.deleteSession('home', true);
            },

            activeUser(){
                var user = "";
                if(this.getUserName() != "" && this.getUserName() != null && this.getUserName() != undefined){
                    user = this.getUserName()+" "+this.getUserLastName();
                }else if(this.getUserEmail() != "" && this.getUserEmail() != null){
                    user = this.getUserEmail().split('@')[0];
                }else if(this.getUserMobile() != ""){
                    user = this.getUserMobile()
                }else{
                    user =this.$t("common.guest");
                }
                return user;
            },

            activeUserName(){
                var user = "";
                if(this.getUserName() != "" && this.getUserName() != null && this.getUserName() != undefined){
                    user = this.getUserName();
                }else if(this.getUserEmail() != "" && this.getUserEmail() != null){
                    user = this.getUserEmail().split('@')[0];
                }else{
                    user ="";
                }
                return user;
            },
            activeUserLastName(){
                return this.getUserLastName();
            },
            activeUserGender(){
                return this.getUserGender();
            },
            // activeUserAge(){
            //     return this.getUserAge();
            // },
            activeUserEmail(){
                return this.getUserEmail();
            },
            activeUserMobile(){
                return this.getUserMobile();
            },
            openBrowser(){
                window.open('http://fusepong.com/privacy-policies', '_system');
            },
            redirect_back(){
                window.history.back();
            },

            submit_form(){
                this.data.attributes.password_confirmation = this.data.attributes.password;
                try{
                    this.$http.put(this.getServer()+"/v1/users/update_profile", {
                        data: this.encrypt(this.data).toString()
                    },{
                        headers:{
                            "Authorization": "Bearer " + this.getUserToken(),
                            "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                        }
                    }).then(function(response){

                      if(response.body.meta != undefined && response.body.meta != null){
                        if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
                          this.checkToken(response.body.meta.authentication_token)
                          this.updateUserName(response.body.data.attributes.name);
                          this.updateUserLastName(response.body.data.attributes["last-name"]);
                          this.updateUserGender(response.body.data.attributes.gender);
                          this.updateUserBirthday(response.body.data.attributes.birthday);
                          this.updateUserEmail(response.body.data.attributes.email);
                          this.updateUserMobile(response.body.data.attributes.mobile);
                          this.show_error_modal(this.$t('profile.profile_update_message'), this.$t('profile.profile_update'));
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
            toggle_password_view () {
                this.show_password = !this.show_password;
            },
            validateBeforeChange () {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.submit_form()
                        return;
                    }
                    $('.is-danger').animateCss('shake');
                });
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
        }
    }
</script>

<style scoped lang="css">
div#body{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.04);
}

div#body.transparent{
    background-color: transparent;
    box-shadow: none;
    padding: 12px;
}

.header__title{
    margin-bottom: 0px;
    font-family: "Work Sans";
    font-style: normal;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 24px;
    letter-spacing: 1px;
    text-transform: uppercase;
}

#back{
    width: 11px;
}

div#left span{
    padding-left: 5px;
    font-family: "Work Sans";
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    color: #5B96FC;
}

#search{
    width: 24px;
}

#search_bar{
    position: absolute;
    top: 10px;
    right: 12px;
}

#search_bar input[type="text"]{
    background-color: rgba(200, 176, 120, 0.1);
    border: none;
    border-radius: 3px;
    padding: 5px;
    font-family: "Work Sans";
    font-weight: normal;
    font-style: normal;
    padding-left: 10px;
}

#search_bar input[type="text"]::placeholder{
    color: #5B96FC;
}

#search_bar #search_btn_close{
    position: absolute;
    top: 2px;
    right: 0px;
}

#search_btn{
    z-index: 2;
}

.width-animation-enter{
    width: 0px;
}

.width-animation-enter-active{
    -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
}

.width-animation-enter-to{
    width: 75%;
}

.width-animation-leave{
    width: 75%;
}

.width-animation-leave-active{
    -webkit-transition: width 1s ease-in-out;
    -moz-transition: width 1s ease-in-out;
    -o-transition: width 1s ease-in-out;
    transition: width 1s ease-in-out;
}

.width-animation-leave-to{
    width: 0%;
}
</style>
