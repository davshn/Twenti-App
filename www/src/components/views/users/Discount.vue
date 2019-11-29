<template>
    <div class="col-xs-12 no-padding">
        <app-header :title="$t('common.discount')"></app-header>
        <div class="col-xs-12" id="redeem_body">
            <h3 class="col-xs-12">
                {{ $t("common.discount") | capitalize }}
            </h3>
            <p class="col-xs-12">
                {{ $t("redeem.msg") }}
            </p>
            <div class="col-xs-12 no-padding col-xs-12 app-form-group" v-if="qr">
                <small class="col-xs-3 no-left-padding">
                    {{ $t("common.pin_number") | capitalize }}
                </small>
                <input type="number"
                    class="square-input"
                    min="0"
                    max="9"
                    disabled
                    pattern="[0-9]" inputmode="numeric">
                <input type="number"
                    class="square-input"
                    min="0"
                    max="9"
                    disabled
                    pattern="[0-9]" inputmode="numeric">
                <input type="number"
                    class="square-input"
                    min="0"
                    max="9"
                    disabled
                    pattern="[0-9]" inputmode="numeric">
                <input type="number"
                    class="square-input"
                    min="0"
                    max="9"
                    disabled
                    pattern="[0-9]" inputmode="numeric">
                <img src="./src/assets/images/icons/reset.svg"
                    alt="Reset PIN"
                    @click="reset_pin();"
                    class="pull-right"
                    id="visibility"/>
            </div>
            <div class="col-xs-8 col-xs-offset-2" v-if="qr">
                <div class="row">
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            1
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            2
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            3
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            4
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            5
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            6
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            7
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            8
                        </span>
                    </div>
                    <div class="circle-btn"
                        @click="add_password($event)">
                        <span>
                            9
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="circle-btn"
                        @click.prevent="add_password($event)">
                        <span>
                            0
                        </span>
                    </div>
                    <a class="redeem_btn" @click="submit_pin()">
                        {{ $t("common.discount") | capitalize }}
                    </a>
                </div>
            </div>
            <div class="col-xs-12 no-padding" id="qrcode" v-show="qr == false">
            </div>
            <router-link tag="a"
                :to="{ name: 'offers_index' }"
                class="gold-button col-xs-12 text-center" v-show="qr == false">
                {{ $t("common.done") | capitalize }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                pin: '',
                actual_input: 0,
                qr: true,
                offer: {
                    id: '',
                    attributes: {
                        img: '',
                        title: '',
                        "offer-expiry": '',
                        description: '',
                        venues: [],
                        tc: ''
                    }
                }
            }
        },
        methods:{
            add_password(event) {
                if(this.actual_input <= 3){
                    var input = $(this.$el).find("input[type='number']")[this.actual_input];
                    var target = $(event.target).hasClass("circle-btn") ?
                        $(event.target) :
                        $(event.target).parents(".circle-btn");
                    var number = Number($(target).find("span").text());
                    $(input).val(number);
                    this.actual_input++;
                }
            },
            reset_pin(){
                this.actual_input = 0;
                $(this.$el).find("input[type='number']").val('');
            },
            submit_pin(){
                // var str = '';
                // $(this.$el).find("input[type='number']").each(function(){
                //     str += $(this).val();
                // });
                // try{
                //     this.$http.post(this.getServer()+"/v1/users/auth_for_qr",{
                //         data: {
                //             attributes: {
                //                 email: this.getUserEmail(),
                //                 mobile: this.getUserMobile(),
                //                 password: str
                //             }
                //         }
                //     }, {
                //         headers:{
                //             "Authorization": "Bearer " + this.getUserToken()
                //         }
                //     }).then(function(response){
                //         if(response.status == 200){
                //             var qrcode = new QRCode(document.getElementById("qrcode"));
                //             qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":-2}}');
                //             this.qr = !this.qr;
                //             $("canvas").width("100%");
                //         }else{
                //             this.errors_handler(response.body.errors.title);
                //         }
                //     }, function(response){
                //         this.errors_handler(response);
                //     });
                // }catch(e){
                //     this.errors_handler(e.message);
                // }
                var qrcode = new QRCode(document.getElementById("qrcode"));
                qrcode.makeCode('{"data":{"id_user":'+this.getUserId()+',"id_offer":-2}}');
                this.qr = !this.qr;
                $("canvas").width("100%");
            }
        },
        mounted(){
          var vm = this;
          navigator.geolocation.getCurrentPosition(vm.findPosition);
            if(typeof this.$route.params.offer != null && typeof this.$route.params.offer != undefined ){
                this.offer = this.$route.params.offer;
            }
        }
    }
</script>

<style scoped>
    #redeem_body h3{
        margin-top: 24px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 20px;
        color: #212121;
    }

    #redeem_body p{
        margin-top: 8px;
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 11px;
        text-align: center;
        line-height: 16px;
        color: #616161;
    }

    #redeem_body .circle-btn{
        width: 48px;
        height: 48px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
        border-radius: 100px;
        position: relative;
        display: inline-block;
    }

    #redeem_body .circle-btn span{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 23px;
        text-align: center;
        line-height: 24px;
        color: #5B96FC;
        position: absolute;
        top: 50%;
        left: 48%;
        transform: translate(-50%,-50%);
    }

    #redeem_body .row:not(:last-child){
        position: relative;
        margin-bottom: 24px;
    }

    #redeem_body .row:not(:last-child) .circle-btn:first-child{
        float: left;
    }

    #redeem_body .row:not(:last-child) .circle-btn:nth-child(2){
        display: block;
        margin: auto;
    }

    #redeem_body .row:not(:last-child) .circle-btn:last-child{
        position: absolute;
        top: 0px;
        right: 0px;
    }

    #redeem_body .redeem_btn{
        width: 128px;
        height: 48px;
        background-color: #5B96FC;
        box-shadow: 0 4px 8px 0 rgba(189,189,189,0.54);
        border-radius: 100px;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        line-height: 24px;
        color: #FFFFFF;
        float: right;
        padding: 12px;
    }

    #qrcode{
        padding-top: 20px;
        margin-bottom: 20px;
    }

    div.app-form-group input.square-input{
        width: 35px;
        height: 35px;
        font-size: 20px;
    }
</style>
