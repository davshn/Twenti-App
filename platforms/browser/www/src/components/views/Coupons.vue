<template>
  <article class="" v-if="charged" style="padding: 30px 0; min-height: 100vh; background-color: #fafafa">

    <section>
      <div class="" style="display flex; align-items: center; justify-content: center; width: 100%">
        <div
          class="new_login__content--login_button small-12 active"
          @click="$router.push({name:'validate_sale'})">
          Validar Compra
        </div>
      </div>
    </section>
    <section style="padding: 24px;">
      <section class="category__info" v-if="charged">
        <p class="category__info--title">Cupones activos</p>
        <section class="category__info--content">
          <section
            class="category__info--section"
            v-for="(section, index) in coupons"
            v-if="section.published"
            @click="$router.push({name:'coupon', params:{id:section.id}})">
            <div class="category_section__header">
              <div class="category_section__header--container">
                <div class="category_section__header--discount">
                  <p>
                    {{'-'+section.discount_value+'%'}}
                  </p>
                </div>
                <img :src="section.image.url" alt="">
              </div>
              <div class="category_section__header--title">
                <p>
                  {{section.title}}
                </p>
              </div>
            </div>
            <p class="category_section__text">
              {{section.description}}
            </p>
          </section>
        </section>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      coupons:[],
      commerce_name:'',
      charged: false
    }
  },
  methods:{
    send_request(){
      var vm = this;
      navigator.geolocation.getCurrentPosition(vm.findPosition);
        try{
            this.$http.get("find_coupons?id="+this.getCommerceRef(), {
                headers: {
                  "X-Device-ID" : this.buildDeviceId(),
                  "Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
                }

            }).then(function(response){
                console.log(response);
                this.coupons = response.body.meta
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
            });
        }catch(e){
          this.show_error_modal(e.message);
        }
    },
  },
  mounted(){
    this.send_request()
  }
}
</script>

<style lang="css">
</style>
