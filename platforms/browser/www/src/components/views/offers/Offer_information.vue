<template>
    <div class="col-xs-12 no-padding" id="offer_information_body">
        <div class="col-xs-12">
            <img :src="img_src">
            <span class="gold-text">
                {{ title | upperCase }}
            </span>
        </div>
        <div class="col-xs-12">
            <p>
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            img_src: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    div#offer_information_body{
        font-family: "Work Sans Regular";
        font-size: 11px;
        border-left: 1px solid #EFEFF4;
        border-top: 1px solid #EFEFF4;
    }
</style>
