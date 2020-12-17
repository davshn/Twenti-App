<template>
  <article
    class="form_modal">
    <section 
			style="margin-top: 0px;"
			class="form_modal__container modal_filter_search">
			<div 
				style="padding-bottom: 0px;"
				class="modal_filter_search__content">
				<div class="modal_filter_search__content--icon_closed"
					@click="handleCancel()">
					<img src="./src/assets/images/icon_closed.svg" alt="">
				</div>
				<section style="width: 100%;">
					<h1 class="modal_filter_search__content--title">Valor a pagar</h1>  
					<h6 class="modal_filter_search__content--subtitle">Ingresa el monto</h6>  
					<input 
							v-model="value"
							class="input_collet" type="text"> 
				</section>
				<button class="modal_filter_search__button_filter"
					@click="createPurchace()">
					Pagar
				</button>
			</div> 
    </section>
  </article>
</template>


<script>
  export default {
		data(){
			return {
				value: null,
			}
		},
		mounted(){
		},
		methods: {
			handleCancel(){
				this.$emit('handle-cancel-modal-payment', false)
      },
			createPurchace(){
				var vm = this;
				var temp = {
						attributes: {
							state: "CREADO",
							client_id: Number('1'),
						}
					}
				try{
					vm.$http.post("purchaces",{
						data: temp,
						value: this.value
					},{
						headers:
						vm.getUserToken() != '' ?
						{
								"Authorization": "Bearer " + vm.getUserToken(),
								"X-Device-ID" : vm.getDeviceId(),
								"Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
						} :
						{
							"X-Device-ID" : vm.getDeviceId(),
							"Geolocation" : "lat: " + vm.getLatitude() + ", long: " + vm.getLongitude()
						}
					}
					).then(function(response){
						window.open(response.body.url,'_system')
						if(response.body.meta != undefined && response.body.meta != null){
							if(response.body.meta.authentication_token != undefined && response.body.meta.authentication_token != null){
								this.checkToken(response.body.meta.authentication_token)
							}
						}
						// this.$router.push({name: "offers_index"})
						this.show_camera = false
					}, function(response){
						this.show_error_modal(response.body.errors[0].details);
						window.open(response.body.url,'_system')
					})
				}catch(e){
					vm.show_error_modal(e.message);
				}
			},

		}
  }
</script>

<style scoped>
</style>
