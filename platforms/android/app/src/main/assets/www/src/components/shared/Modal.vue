<template>
    <div class="col-xs-12" id="modal_parent">
        <div class="col-xs-12" id="modal">
            <span @click="toggle_modal_visibility()">
                {{ $t("common.close") }}
            </span>
            <p class="col-xs-12 no-padding title">
                {{ title }}
            </p>
            <p class="col-xs-12 no-padding subtitle">
                {{ subtitle }}
            </p>
            <p class="col-xs-12 no-padding description">
                {{ description }}
            </p>
            <div class="col-xs-12 gold-container">
                <a class="gold-button col-xs-12" @click="toggle_modal_visibility()">
                    {{ button_text }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggle_modal_visibility(){
                if($(this.$el).css("display") == "none"){
                    $(this.$el).css("display","block");
                }else{
                    $(this.$el).css("display","none");
                }
            }
        },
        props: {
            title: {
                type: String,
                default: "Offers"
            },
            subtitle: {
                type: String,
                default: "Terms & Contiditions"
            },
            description: {
                type: String,
                default: "Buena"
            },
            button_text: {
                type: String,
                default: "Agree Terms & Conditions"
            }
        },
        mounted(){
            var height = document.documentElement.clientHeight-30;
            // if(/iPhone|iPod/.test(navigator.userAgent)){
            //     height += 25;
            // }
            $(this.$el).children("#modal").css({ "height": height, "max-height": height, "min-height": height });
            $(this.$el).find(".description").css("height", height-48-90);
        }
    }
</script>

<style scoped>
    #modal_parent{
        position: absolute;
        padding-top: 12px;
        padding-bottom: 12px;
        max-height: 100%;
        min-height: 100%;
        display: none;
    }

    #modal{
        background-color: #FFFFFF;
        border-radius: 8px;
        z-index: 100;
        padding: 12px;
        position: relative;
        box-shadow: 0 4px 8px 0 rgba(189,189,189,0.54);
    }

    #modal p.title{
        font-family: "Work Sans";
        font-style: normal;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        margin-bottom: 0px;
        color: #212121;
    }

    #modal p.subtitle{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 16px;
        line-height: 20px;
        color: #212121;
    }

    #modal p.description{
        font-family: "Work Sans";
        font-weight: normal;
        font-style: normal;
        font-size: 13px;
        font-weight: 500;
        line-height: 20px;
        color: #212121;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    #modal .gold-container{
        position: absolute;
        left: 0px;
        bottom: 15px;
    }

    #modal span{
        position: absolute;
        right: 12px;
        top: 12px;
        text-transform: uppercase;
        font-family: "Work Sans";
        font-style: normal;
        font-size: 11px;
        font-weight: 500;
        line-height: 16px;
        letter-spacing: 1px;
        color: #616161;
        z-index: 200;
    }
</style>
