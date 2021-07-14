import Vue from'vue'
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { store } from '../store/index';

Vue.mixin({
    data(){
      return {
          push: null,
          login_message: 'Obtén descuentos y promociones en Sportlife'
      }
    },
    methods: {
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        encrypt(data) {
          var CryptoJS = require("crypto-js");
          var payload = "G7qeaR2Yb4DAgk92ZQHdjQ==|gfYvWJ0vVdX142/xpsGPW8Fsgc/dGeQPFtaazcUMjQo=|VF/bl6Ae5CVTtQTPCrmAgQ==".split("|");
          var iv = payload[0], hmac = payload[1], cipherText = payload[2];
          var passphraseDgst = CryptoJS.SHA256("ImAwesomeAndHappy").toString();
          var key = passphraseDgst;
          var encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            CryptoJS.enc.Hex.parse(passphraseDgst),
            {iv:CryptoJS.enc.Base64.parse(iv)}
          );
          return encrypted
        },
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        check_user(){
            if(
                (this.getUserEmail() != '' && this.getUserEmail() != undefined)
                ||
                (this.getUserMobile() != '' && this.getUserMobile() != undefined)
            ){
                if(this.getRole() == "Agent"){
                    this.$router.push({ name: 'waiter_index' });
                }
            }
        },
        errors_handler(response){
          switch (response.status) {
            case 401:
              this.show_error_modal(this.$t("errors.401"));
              break;
            case 403:
              this.show_error_modal(this.$t("errors.403"));
              break;
            case 404:
              this.show_error_modal(this.$t("errors.404"));
              break;
            case 406:
              this.show_error_modal(this.$t("errors.406"));
              break;
            case 500:
              this.show_error_modal(this.$t("errors.500"));
              break;
            default:
              if(typeof response != null && response.hasOwnProperty("body")){
                if(typeof response.body != null && response.body != null) {
                  if(response.body.hasOwnProperty("errors")){
                    if(typeof response.body.errors != null && response.body.errors != null){
                      if(response.body.errors.hasOwnProperty("title")){
                        this.show_error_modal(response.body.errors.title);
                      }
                    }
                  }
                }
              }else{
                this.show_error_modal(this.$t("errors.default"));
              }
            break;
          }
        },
        ...mapActions([
            "updateUserToken",
            "updateUserDeviceToken",
            "updateUserEmail",
            "updateDB",
            "updateUserMobile",
            "updateRole",
            "updateUserId",
            "updateUserRegistrationId",
            "updateNotifications",
            "updateSearchWords",
            "updateClientHeight",
            "updateUserName",
            "updateUserLastName",
            "updateUserGender",
            "updateUserBirthday",
            "updateHomeRoute",
            "updateUserPassword",
            "updateUserEmailSignup",
            "updateUserMobileSignup",
            "updateFooter",
            "updateRewardsCount",
            "updateLocationsCount",
            "updateFavoritesCount",
            "updateRedemptionsCount",
            "updateIsChangedVoucher",
            "updateIsChangedVenue",
            "updateServerImage",
            "updateDeviceId",
            "updateCategories",
            "updateShowDrawer",
            "updateAgentId",
            "updateCurrentOffer",
            "updateInBlocks",
            "updateFcmId",
            "updateNationality",
            "updateCurrentFavorites",
            "updateLatitude",
            "updateLongitude",
            "updateCurrentCategory",
            "updateCurrentTab",
            "updateTermsAndConditions",
            "updateUserRut",
            "updateShowToast",
            "updateRutValidator",
            "updateScheduleModal",
            "updateScheduleImage",
            "updateSelectedSection",
            "updateLocationUser",
            "updateLocations",
            "updateUserInfoId",
            "updateShowUserKey",
            "updateInvitationValidate",
            "updateUserAccessState",
            "updateCodeModal",
            "updateProfilePicture",
            "updateScheduleLoading",
            "updateUserIdEncrypt",
            "updateLogin",


            "updateEmail",
            "updateBirthday",
            "updateFirstName",
            "updateLastName",
            "updateSecondName",
            "updateLastSecondName",
            "updateGenre",
            "updatePhone",
            "updateUserName",
            "updateModalFilterSearch",
            "updateSellers",
            "updateUserPData",
        ]),
        ...mapGetters([
            "getUserToken",
            "getUserDeviceToken",
            "getUserEmail",
            "getDB",
            "getUserMobile",
            "getServer",
            "getRole",
            "getUserId",
            "getUserRegistrationId",
            "getNotifications",
            "getSearchWords",
            "getClientHeight",
            "getUserName",
            "getUserLastName",
            "getUserGender",
            "getUserBirthday",
            "getHomeRoute",
            "getUserPassword",
            "getUserEmailSignup",
            "getUserMobileSignup",
            "getFooter",
            "getRadius",
            "getRewardsCount",
            "getLocationsCount",
            "getFavoritesCount",
            "getRedemptionsCount",
            "getIsChangedVoucher",
            "getIsChangedVenue",
            "getServerImage",
            "getDeviceId",
            "getCategories",
            "getShowDrawer",
            "getAgentId",
            "getCurrentOffer",
            "getInBlocks",
            "getFcmId",
            "getNationality",
            "getCurrentFavorites",
            "getLatitude",
            "getLongitude",
            "getCurrentCategory",
            "getCurrentTab",
            "getTermsAndConditions",
            "getUserRut",
            "getShowToast",
            "getRutValidator",
            "getScheduleModal",
            "getScheduleImage",
            "getSelectedSection",
            "getLocationUser",
            "getLocations",
            "getUserInfoId",
            "getShowUserKey",
            "getInvitationValidate",
            "getUserAccessState",
            "getCodeModal",
            "getProfilePicture",
            "getScheduleLoading",
            "getUserIdEncrypt",
            "getLogin",

            "getEmail",
            "getBirthday",
            "getFirstName",
            "getLastName",
            "getSecondName",
            "getLastSecondName",
            "getGenre",
            "getPhone",
            "getUserName",
            "getModalFilterSearch",
            "getSellers",
            "getUserPData",
        ]),


        goBack(){
          window.history.back()
        },

        saveUserData(data){
          this.updateUserId(data.id)
          this.updateEmail(data.attributes.email)
          this.updateBirthday(data.attributes.birthday)
          this.updateFirstName(data.attributes.first_name)
          this.updateLastName(data.attributes.last_name)
          this.updateSecondName(data.attributes.second_name)
          this.updateLastSecondName(data.attributes.last_second_name)
          this.updateGenre(data.attributes.genre)
          this.updatePhone(data.attributes.phone)
          this.updateUserName(data.attributes.user_name)
          this.$router.push({name: 'categories'})
        },
        closeSession(){
          this.updateUserId('')
          this.updateEmail('')
          this.updateBirthday('')
          this.updateFirstName('')
          this.updateLastName('')
          this.updateSecondName('')
          this.updateLastSecondName('')
          this.updateGenre('')
          this.updatePhone('')
          this.updateUserName('')
          this.updateUserPData('')
          this.updateLogin(true);
          this.$router.push({name: 'log_in'})
        },















        checkRut(){
          console.log("Este es el RUT!!!!!!!!!!");
          console.log(this.getUserRut());
          if(this.getUserToken() != '' &&
             this.getUserToken() != null &&
             this.getUserToken() != undefined ){
            if(this.getUserRut() != '' &&
               this.getUserRut() != null &&
               this.getUserRut() != undefined){
              console.log("No esta vacio");
              var rut = this.getUserRut().replace(/K/g, '')
              console.log(rut);
              if(isNaN(Number(rut))){
                return true
              }else{
                return false
              }
              // return false
            }else{
              console.log("Esta vacio");
              return true
            }
          }else{
            console.log("El token no existe");
            console.log(this.getUserToken());
            return false
          }
        },
        onErrorPosition(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        },
        buildDeviceId(){
          var uuid
          if(localStorage.device_id != undefined &&
             localStorage.device_id != null &&
             localStorage.device_id != ''){
            uuid = localStorage.device_id
          } else {
            uuid = this.$uuid.v1()
            localStorage.device_id = uuid
          }
          this.updateDeviceId(uuid);
          return uuid
        },
        findPosition(position){
          console.log(position);
          this.updateLatitude(position.coords.latitude);
          this.updateLongitude(position.coords.longitude);
        },
        show_error_modal(message, title, button, login_image = false, cancel = false, invitation_validate = true){
            this.updateInvitationValidate(invitation_validate)
            title = title || "Error";
            button = button || "Cerrar";
            var error_message = ""
            if (message != null && message != undefined){
              error_message = message
            }
            $("#errorsModal").find(".modal-title").text(title);
            $("#errorsModal").find(".modal-body p").text(error_message);
            $("#errorsModal").find(".modal-footer a").text(button);
            if(login_image){
              $("#errorsModal").find(".error_modal__image").show();
            }
            $("#errorsModal").modal();
            if(!cancel){
              $("#errorsModal").find(".modal_close").hide();
            }
        },
        checkLoginUser(route, has_params = false, object){
          if(this.getUserToken() != '' && this.getUserToken() != undefined && this.getUserToken() != null){
            if(has_params){
              this.$router.push({name: route, params: object})
            } else {
              this.$router.push({name: route})
            }
          } else {
            this.show_error_modal(this.login_message, '¡Hola!', 'Ingresa Aquí', true)
          }
        },
        init_db(){
          console.log("Inicio de base de datos");
            var vm = this;
            var db = window.openDatabase('Sportlife', "1.0", "", 200000);
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id, email, token, role, user_id, registrationId, notifications, name, lastname, gender, birthday, favorites, locations, rewards, redeems, mobile, rut, location, access)');
                tx.executeSql('SELECT * FROM Users', [], function(tx,rs) {
                    vm.updateDB(db);
                    console.log(rs.rows);
                    if(rs.rows.length > 0){
                        vm.updateUserEmail(rs.rows.item(0).email);
                        vm.updateUserMobile(rs.rows.item(0).mobile);
                        vm.updateUserToken(rs.rows.item(0).token);
                        vm.updateUserDeviceToken(rs.rows.item(0).device_token);
                        vm.updateRole(rs.rows.item(0).role);
                        if(rs.rows.item(0).role == "Agent"){
                          vm.updateAgentId(rs.rows.item(0).user_id);
                        }else{
                          vm.updateUserId(rs.rows.item(0).user_id);
                        }
                        vm.updateUserRegistrationId({ rid: rs.rows.item(0).registrationId, callback: function(){
                            vm.check_user();
                        } });
                        vm.updateNotifications(rs.rows.item(0).notifications);
                        vm.updateUserName(rs.rows.item(0).name);
                        vm.updateUserLastName(rs.rows.item(0).lastname);
                        vm.updateUserGender(rs.rows.item(0).gender);
                        vm.updateUserBirthday(parseInt(rs.rows.item(0).birthday));
                        vm.updateLocationsCount(parseInt(rs.rows.item(0).locations));
                        vm.updateFavoritesCount(parseInt(rs.rows.item(0).favorites));
                        vm.updateRewardsCount(parseInt(rs.rows.item(0).rewards));
                        vm.updateRedemptionsCount(parseInt(rs.rows.item(0).redeems));
                        vm.updateUserRut(rs.rows.item(0).rut);
                        vm.updateLocationUser(rs.rows.item(0).location);
                        vm.updateUserAccessState(rs.rows.item(0).access)
                    }
                    if(Vue.cordova.device.uuid != '' && Vue.cordova.device.uuid != undefined && Vue.cordova.device.uuid != null){
                      vm.updateDeviceId(Vue.cordova.device.uuid);
                    }else{
                      vm.updateDeviceId(vm.$uuid.v1())
                    }

                }, function(error) {
                  vm.deleteSession('offers_index', true);
                    // vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
                });
            }, function(error) {
                vm.show_error_modal('Transaction ERROR: ' + error.message);
            }, function() {
            });
        },
        create_user_db(vm, db, response){
          console.log("Creación de usuario");
          var id;
          if(response.body.data.attributes.user_info_type == "Agent"){
            id = response.body.data.attributes.user_info_id;
          }else{
            id = response.body.data.id;
          }

          vm.updateUserEmail(response.body.data.attributes.email);
          // vm.updateUserMobile(response.body.data.attributes.mobile);
          vm.updateUserToken(response.body.meta.authentication_token);
          // vm.updateUserDeviceToken(response.body.meta.device_token);
          vm.updateRole(response.body.data.attributes.user_info_type);
          if(response.body.data.attributes.user_info_type == "Agent"){
            vm.updateAgentId(response.body.data.attributes.user_info_id);
          }else{
            vm.updateUserId(response.body.data.id);
          }
          vm.updateUserMobile(response.body.data.attributes.mobile)
          vm.updateNotifications(response.body.data.attributes.notifications);
          if(response.body.included != undefined && response.body.included != null){
            vm.updateUserName(response.body.included[0].attributes.name)
            vm.updateUserLastName(response.body.included[0].attributes.last_name)
            vm.updateUserGender(response.body.included[0].attributes.gender);
            vm.updateUserBirthday(response.body.included[0].attributes.birthday);
          }
          vm.updateRewardsCount(response.body.data.attributes.rewards);
          vm.updateLocationsCount(response.body.data.attributes.favorite_locations);
          vm.updateFavoritesCount(response.body.data.attributes.favorite_offers);
          vm.updateRedemptionsCount(response.body.data.attributes.redeems);
          vm.updateBadgeNotifications(response.body.data.attributes.notifications)
          if(response.body.data.attributes.rut != '' &&
             response.body.data.attributes.rut != null &&
             response.body.data.attributes.rut != undefined){
            vm.updateUserRut(response.body.data.attributes.rut)
          }else{
            vm.updateUserRut('')
          }
          vm.updateUserRegistrationId({ rid: "", callback: function(){
            vm.check_user();
          } });
          if(vm.getUserRut() == '' ||
             vm.getUserRut() == null ||
             vm.getUserRut() == undefined){
            vm.updateRutValidator(true)
          }
          vm.updateLocationUser(response.body.included[0].attributes.location_id);
          vm.updateUserAccessState(response.body.included[0].attributes.access_state);

          // vm.updateUserRut(response.body.data.attributes.rut)
          //   db.transaction(function (tx) {
          //       tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id, email, token, role, user_id, registrationId, notifications, name, lastname, gender, birthday, favorites, locations, rewards, redeems, mobile, rut, location, access)', [], function(tx, res){
          //           var query = "DELETE FROM Users";
          //           tx.executeSql(query, [], function (tx, res) {
          //               query = "INSERT INTO Users (id, email, token, role, user_id, registrationId, notifications, name, lastname, gender, birthday, favorites, locations, rewards, redeems, mobile, rut,location, access) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          //               tx.executeSql(query, [
          //                                       "1",
          //                                       response.body.data.attributes.email,
          //                                       // response.body.data.attributes.mobile,
          //                                       response.body.meta.authentication_token,
          //                                       // response.body.meta.device_token,
          //                                       response.body.data.attributes.user_info_type,
          //                                       id,
          //                                       "",
          //                                       0,
          //                                       response.body.included[0].attributes.name,
          //                                       response.body.included[0].attributes.last_name,
          //                                       response.body.included[0].attributes.gender,
          //                                       response.body.included[0].attributes.birthday,
          //                                       response.body.data.attributes.favorite_offers,
          //                                       response.body.data.attributes.favorite_locations,
          //                                       response.body.data.attributes.rewards,
          //                                       response.body.data.attributes.redeems,
          //                                       response.body.data.attributes.mobile,
          //                                       response.body.data.attributes.rut ? response.body.data.attributes.rut : '',
          //                                       response.body.included[0].attributes.location_id,
          //                                       // response.body.meta.locations_count,
          //                                       // response.body.meta.rewards_count,
          //                                       // response.body.meta.redemptions_count
          //                                       response.body.included[0].attributes.access_state
          //                                   ], function (tx, res) {
          //                   vm.updateDB(db);
          //                   vm.updateUserEmail(response.body.data.attributes.email);
          //                   // vm.updateUserMobile(response.body.data.attributes.mobile);
          //                   vm.updateUserToken(response.body.meta.authentication_token);
          //                   // vm.updateUserDeviceToken(response.body.meta.device_token);
          //                   vm.updateRole(response.body.data.attributes.user_info_type);
          //                   if(response.body.data.attributes.user_info_type == "Agent"){
          //                     vm.updateAgentId(response.body.data.attributes.user_info_id);
          //                   }else{
          //                     vm.updateUserId(response.body.data.id);
          //                   }
          //                   vm.updateUserMobile(response.body.data.attributes.mobile)
          //                   vm.updateNotifications(response.body.data.attributes.notifications);
          //                   if(response.body.included != undefined && response.body.included != null){
          //                     vm.updateUserName(response.body.included[0].attributes.name)
          //                     vm.updateUserLastName(response.body.included[0].attributes.last_name)
          //                     vm.updateUserGender(response.body.included[0].attributes.gender);
          //                     vm.updateUserBirthday(response.body.included[0].attributes.birthday);
          //                   }
          //                   vm.updateRewardsCount(response.body.data.attributes.rewards);
          //                   vm.updateLocationsCount(response.body.data.attributes.favorite_locations);
          //                   vm.updateFavoritesCount(response.body.data.attributes.favorite_offers);
          //                   vm.updateRedemptionsCount(response.body.data.attributes.redeems);
          //                   vm.updateBadgeNotifications(response.body.data.attributes.notifications)
          //                   if(response.body.data.attributes.rut != '' &&
          //                      response.body.data.attributes.rut != null &&
          //                      response.body.data.attributes.rut != undefined){
          //                     vm.updateUserRut(response.body.data.attributes.rut)
          //                   }else{
          //                     vm.updateUserRut('')
          //                   }
          //                   vm.updateUserRegistrationId({ rid: "", callback: function(){
          //                     vm.check_user();
          //                   } });
          //                   if(vm.getUserRut() == '' ||
          //                      vm.getUserRut() == null ||
          //                      vm.getUserRut() == undefined){
          //                     vm.updateRutValidator(true)
          //                   }
          //                   vm.updateLocationUser(response.body.included[0].attributes.location_id);
          //                   vm.updateUserAccessState(response.body.included[0].attributes.access_state);
          //               },
          //               function (tx, error) {
          //                 vm.deleteSession('offers_index', true);
          //                 vm.init_db()
          //                 vm.create_user_db(vm, db, response)
          //                 console.log("Second init");
          //                   // vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
          //               });
          //           },
          //           function (tx, error) {
          //           });
          //       },
          //       function (tx, error) {
          //       });
          //   }, function (error) {
          //       vm.show_error_modal('Transaction ERROR: ' + error.message);
          //   }, function () {
          //   });
        },
        deleteSession(route, router){
            var vm = this;
            vm.updateShowDrawer(false);
            vm.updateProfilePicture('./src/assets/images/backgrounds/menu_foto.svg')
            vm.updateUserEmail('');
            vm.updateUserMobile('');
            vm.updateUserToken('');
            vm.updateUserDeviceToken('');
            vm.updateRole('');
            vm.updateUserId('');
            vm.updateAgentId('');
            vm.updateUserName('');
            vm.updateUserLastName('');
            vm.updateUserGender('');
            vm.updateUserBirthday('');
            vm.updateUserRegistrationId({ rid: "", callback: function(){} });
            vm.updateNotifications(0);
            vm.updateFavoritesCount(0);
            vm.updateLocationsCount(0);
            vm.updateRewardsCount(0);
            vm.updateRedemptionsCount(0);
            vm.updateUserMobile(0);
            vm.updateDB('');
            vm.updateLocationUser('');
            vm.updateUserAccessState('DENIED');
            if(navigator.geolocation != null &&
               navigator.geolocation != undefined &&
               navigator.geolocation != ''){
              navigator.geolocation.getCurrentPosition(vm.findPosition);
              try {
                this.$http.delete('users/sign_out', null, {
                  headers:{
                    "X-Device-ID" : this.buildDeviceId(),
                    "Authorization": "Bearer " + vm.getUserToken(),
                    "Geolocation" : "lat: " + this.getLatitude() + ", long: " + this.getLongitude()
                  }
                }).then(function(response){
                  this.clearNotifications()
                  this.updateProfilePicture('./src/assets/images/backgrounds/menu_foto.svg')
                })
              } catch (e) {
                this.show_error_modal(e.message);
              }
            }
            if(router){
              vm.$router.push({ name: route });
            }
            // this.init_db()
        },
        number_to_3_digits_string(number){
            var returned = '';
            if(number < 100){
                if(number < 10){
                    returned = "00"+number;
                }else{
                    returned = "0"+number;
                }
            }
            return returned;
        },
        resize_body(parent, element, components){
            var vm = this;
            if(this.getClientHeight() == null){
              // if(device.platform == "iOS"){
              //     this.updateClientHeight(document.documentElement.clientHeight - $('.bar').height());
              // }else{
                this.updateClientHeight(document.documentElement.clientHeight);
              // }
            }

            var height = 0;
            for (var key in components) {
                height += Number(components[key]);
            }

            var finalHeight = vm.getClientHeight() - height;
            if($(".home_circle").length > 0){
              finalHeight += 50;
            }
            if(parent != element){
                $(parent).find(element).height(
                    finalHeight
                );
            }else{
                $(parent).outerHeight(
                    finalHeight
                );
            }
            $("#app, body").resize(function(){
                var height = 0;
                for (var key in components) {
                    height += Number(components[key]);
                }
                var finalHeight = vm.getClientHeight() - height;
                if(parent != element){
                    $(parent).find(element).height(
                        finalHeight
                    );
                }else{
                    $(parent).outerHeight(
                        finalHeight
                    );
                }
            });
        },
        remove_cache_vouchers(){
            var vm = this;
            this.getDB().transaction(function(tx) {
                tx.executeSql('DELETE FROM Cache', [], function(tx,rs) {
                }, function(error) {
                    vm.show_error_modal('SELECT SQL statement ERROR: ' + error.message);
                });
            }, function(error) {
                vm.show_error_modal('Transaction ERROR: ' + error.message);
            }, function() {
            });
        },
        setupPush() {
            var vm = this;
            console.log('calling push init');
            vm.updateBadgeNotifications(0)
            vm.push = PushNotification.init({
                "android": {
                    "senderID": "86162746903",
                    "icon": "icon",
		                "iconColor": "#0064CA",
                    "sound": true,
                    "vibrate": true,
                    "forceShow": true
                },
                "browser": {
                  "senderID": "86162746903",
                  "icon": "icon",
                  "iconColor": "#0064CA"
                },
                "ios": {
                    "senderID": "86162746903",
                    "sound": true,
                    "vibration": true,
                    "badge": true
                }
            });
            console.log("Este es el objecto Push");
            console.log(vm.push);
            vm.push.on('registration', function(data) {
              var oldRegId = vm.getFcmId();
              if (oldRegId !== data.registrationId) {
                  // Save new registration ID
                  vm.updateFcmId(data.registrationId)
                  // localStorage.setItem('registrationId', data.registrationId);
                  // Post registrationId to your app server as the value has changed
              }

            });

            vm.push.on('error', function(e) {
                console.log("push error = " + e.message);
                vm.show_error_modal(e.message, "Error en notificaciones" , 'Cerrar', true);
            });

            vm.push.on('notification', function(data) {
              console.log("New notification!!!!!");
              console.log(vm.getNotifications());
              var new_noti = vm.getNotifications() + 1
              vm.show_error_modal(data.message, data.title , 'Aceptar', true);
              vm.push.setApplicationIconBadgeNumber(function() {
                  vm.updateNotifications(new_noti);
                }, function() {
                }, new_noti
              );
              // var new_noti = vm.getNotifications()+1 || vm.push.getApplicationIconBadgeNumber(function(n) {
              // 	return n+1;
              // }, function() {
              // 	return 0;
              // });

            });

            // console.log("Setup Push Notifications");
            // vm.updateBadgeNotifications(vm.getNotifications())
        },
        handle_notifications(response){
            if(typeof response.body != null && response.body != null){
                if(typeof response.body.meta != null && response.body.meta != null){
                    this.updateNotifications(response.body.meta.count);
                }
            }
        },
        checkToken(token){
          this.updateUserToken(token);
          console.log("Nuevo Token!!!!!");
          console.log(this.getUserToken());
          // if (this.getUserToken() != token) {
          //   console.log(this.getUserToken());
          //   // this.updateUserSignIn(true);
          // }
        },
        updateBadgeNotifications(notifications_count){
          var vm = this;
          console.log("Update notifications");
          if(vm.push == null){
            vm.push = PushNotification.init({
                "android": {
                    "senderID": "86162746903",
                    "icon": "icon",
                    "iconColor": "#0064CA",
                    "sound": true,
                    "vibrate": true,
                    "forceShow": true
                },
                "browser": {
                  "senderID": "86162746903",
                  "icon": "icon",
                  "iconColor": "#0064CA"
                },
                "ios": {
                    "senderID": "86162746903",
                    "sound": true,
                    "vibration": true,
                    "badge": true
                }
            });
            console.log("Push initilized");
            vm.push.on('registration', function(data) {
              var oldRegId = vm.getFcmId();
              if (oldRegId !== data.registrationId) {
                  // Save new registration ID
                  vm.updateFcmId(data.registrationId)
                  // localStorage.setItem('registrationId', data.registrationId);
                  // Post registrationId to your app server as the value has changed
              }

            });

            vm.push.on('error', function(e) {
                console.log("push error = " + e.message);
                vm.show_error_modal(e.message, "Error en notificaciones" , 'Cerrar', true);
            });

            vm.push.on('notification', function(data) {
              console.log("New notification!!!!!");
              console.log(vm.getNotifications());
              var new_noti = vm.getNotifications() + 1
              vm.show_error_modal(data.message, data.title , 'Aceptar', true);
              vm.push.setApplicationIconBadgeNumber(function() {
                  vm.updateNotifications(new_noti);
                }, function() {
                }, new_noti
              );
              // var new_noti = vm.getNotifications()+1 || vm.push.getApplicationIconBadgeNumber(function(n) {
              // 	return n+1;
              // }, function() {
              // 	return 0;
              // });

            });
          }
          vm.push.setApplicationIconBadgeNumber(function(){
            // vm.push.getApplicationIconBadgeNumber(function(n) {
            //   vm.show_error_modal(Number(notifications_count), "Badge Real" , 'Aceptar', true);
            // }, function() {
            // 	vm.show_error_modal("none", "Badge Number" , 'Aceptar', true);
            // });
          }, function(){
            // vm.show_error_modal("not updated", "Badge Number" , 'Aceptar', true);
          }, Number(notifications_count));

        },
        clearNotifications(){
          console.log("Clear notifications");
          if(this.push == null){
            var vm = this;
            vm.push = PushNotification.init({
                "android": {
                    "senderID": "86162746903",
                    "icon": "icon",
                    "iconColor": "#0064CA",
                    "sound": true,
                    "vibrate": true,
                    "forceShow": true
                },
                "browser": {
                  "senderID": "86162746903",
                  "icon": "icon",
                  "iconColor": "#0064CA"
                },
                "ios": {
                    "senderID": "86162746903",
                    "sound": true,
                    "vibration": true,
                    "badge": true
                }
            });
            console.log("Push initilized");
            console.log(vm.push);
            vm.push.on('registration', function(data) {
              var oldRegId = vm.getFcmId();
              if (oldRegId !== data.registrationId) {
                  // Save new registration ID
                  vm.updateFcmId(data.registrationId)
                  // localStorage.setItem('registrationId', data.registrationId);
                  // Post registrationId to your app server as the value has changed
              }

            });

            vm.push.on('error', function(e) {
                console.log("push error = " + e.message);
                vm.show_error_modal(e.message, "Error en notificaciones" , 'Cerrar', true);
            });

            vm.push.on('notification', function(data) {
              console.log("New notification!!!!!");
              console.log(vm.getNotifications());
              var new_noti = vm.getNotifications() + 1
              vm.show_error_modal(data.message, data.title , 'Aceptar', true);
              vm.push.setApplicationIconBadgeNumber(function() {
                  vm.updateNotifications(new_noti);
                }, function() {
                }, new_noti
              );
              // var new_noti = vm.getNotifications()+1 || vm.push.getApplicationIconBadgeNumber(function(n) {
              // 	return n+1;
              // }, function() {
              // 	return 0;
              // });

            });
          }else{
            console.log(vm.push);
          }
          vm.updateNotifications(0);
          vm.push.setApplicationIconBadgeNumber(function(){}, function(){}, 0);
          // vm.push.getApplicationIconBadgeNumber(function(n) {
          //   vm.show_error_modal("Cantidad de notificaciones: " + n, " ", "Aceptar", true)
          //   console.log('success', n);
          // }, function() {
          //   console.log('error');
          //   vm.show_error_modal("Error en cantidad de notificaciones", " ", "Aceptar", true)
          // });
          // vm.push.on('notification', function(data) {
          //   vm.show_error_modal(data.message, data.title , 'Aceptar', true);
          //   var new_noti = vm.getNotifications() + 1
          //   vm.push.setApplicationIconBadgeNumber(function() {
          //     vm.updateNotifications(new_noti);
          //   }, function() {
          //   }, new_noti);
          // });
        },
        activeUser(){
          var user = "";
          if(this.getUserName() != ""){
            user =  this.getUserName()+' '+this.getUserLastName();
          }
          else if(this.getUserEmail() != "" && this.getUserEmail() != null){
            user = this.getUserEmail().split('@')[0];
          }else{
            user = "invitado";
          }
          console.log(user);
          return user;
        },
        validateRut(indexed_rut){
          console.log(indexed_rut);
          var rut = indexed_rut.toString().replace(/\./g,'').split('').reverse().map(Number)
          var multiplier = 2
          var sum = 0
          var validator = null
          for (var i = 0; i < rut.length; i++) {
            rut[i] = rut[i]*multiplier
            sum = sum + rut[i]
            if (multiplier < 7) {
              multiplier += 1
            } else {
              multiplier = 2
            }
          }
          validator = 11 - (sum%11)
          switch (validator) {
            case 11:
              return '0'
              break;
            case 10:
              return 'K'
              break;
            default:
              return validator.toString().toUpperCase();
              break;
          }
        },
        checkQRScanner(){
          if(QRScanner != null && QRScanner != undefined){
            return true
          }else{
            return false
          }
        }
    },
    mounted(){
        if(device.platform == "iOS"){
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString("#000");
            // $('.bar').show();
        }
    }
});
module.exports = store;
