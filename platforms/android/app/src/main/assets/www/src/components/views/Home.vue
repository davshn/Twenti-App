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
                charged: false
            }
        },
        mounted(){
            if(this.getClientHeight() == null){
                this.updateClientHeight(document.documentElement.clientHeight);
            }
            navigator.splashscreen.hide
        }
    }
</script>

<style scoped>
</style>
