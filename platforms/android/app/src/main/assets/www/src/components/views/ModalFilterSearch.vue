<template>
  <article
    class="form_modal">
    <section class="form_modal__container modal_filter_search">
			<div class="modal_filter_search__content">
				<div class="modal_filter_search__content--icon_closed"
					@click="handleCancel()">
					<img src="./src/assets/images/icon_closed.svg" alt="">
				</div>
				<h1 class="modal_filter_search__content--title">Búsqueda avanzada</h1>
				<h6 class="modal_filter_search__content--subtitle">Filtrar por tipo de comercio</h6>
				<div class="modal_filter_search__commerce">
					<div class="modal_filter_search__commerce--item">
						<div>
							Aibai
						</div>
						<p>Comercio físico</p>
					</div>
					<div class="modal_filter_search__commerce--line">
					</div>
					<div class="modal_filter_search__commerce--item">
						<div>
							Aibai
							<div>
								<img src="./src/assets/images/icono_flecha_completa.svg" alt="">
							</div>
						</div>
						<p>Comercio en línea</p>
					</div>
				</div>
				<h6 class="modal_filter_search__content--subtitle">Filtrar por nombre del comercio</h6>
				<div class="modal_filter_search__filter">
					<div
						:class="{'modal_filter_search__filter--card_active': brand.active}"
						class="modal_filter_search__filter--card"
						@click="brands.forEach(b => b.active = false); brand.active = true;id_seller_selected=brand.id;"
						v-for="(brand, index_brand) in brands" :key="index_brand">
						{{ brand.name }}
					</div>
				</div>
				<h6 class="modal_filter_search__content--subtitle">Ordenar por</h6>
				<div class="modal_filter_search__filter">
					<div
						:class="{'modal_filter_search__filter--card_active': filter.active}"
						class="modal_filter_search__filter--card"
						@click="filter.active === false ? filter.active = true : filter.active = false"
						v-for="(filter, index_filter) in filters" :key="index_filter">
						{{ filter.name }}
					</div>
				</div>
				<button class="modal_filter_search__button_filter"
					@click="handleApply()">
					Aplicar
				</button>
			</div>
    </section>
  </article>
</template>


<script>
  export default {
		data(){
			return {
				brands: [
					{name: 'Éxito', active: false },
					{name: 'Homecenter', active: false },
					{name: 'Falabella', active: false },
					{name: 'Jumbo', active: false },
					{name: 'Panamericana', active: false },
					{name: 'Ktronix', active: false },
					{name: 'Lorem ip', active: false },
					{name: 'Lorem ipsum', active: false },
					{name: 'Lorem', active: false },
					{name: 'Lorem', active: false },
					{name: 'Lorem ipsum do', active: false },
					{name: 'Lorem', active: false },
				],
				filters: [
					{ name: 'Mayor descuento primero', active: false },
					{ name: 'Vencen pronto primero', active: false },
				],
				id_seller_selected: null,
			}
		},
		mounted(){
			this.brands = this.getSellers().map(function(s,index) {
				return { id: s.id, name: s.name, active: false }
			})
		},
		methods: {
			handleCancel(){
				this.$emit('handle-cancel-modal-filter-search', false)
			},
			handleApply(f_seller){
				this.$emit('handle-apply-modal-filter-search', { id:  this.id_seller_selected,active: false })
			}

		}
  }
</script>

<style scoped>
</style>
