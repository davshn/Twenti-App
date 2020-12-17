<template>
    <div
        class="cell no-right-padding container-sub">
        <div
            class="small-12 no-padding">
            <router-link
                v-for="item in items"
                tag="div"
                :to="{ name: route, params: {
                    id: item.id,
                    is_voucher: item.attributes['is-voucher'],
                    is_favorite: item.attributes['is-favorite']
                } }"
                class="container-sub__slide-item"
                :key="item.id">
                <app-container-item
                    :width="width"
                    :height="height"
                    :item="item"
                    :venue="venue">
                </app-container-item>
            </router-link>
        </div>
    </div>
</template>

<script>
    import ContainerItem from './Container_item.vue'
    export default{
        data(){
            return{
                actual_page: 1
            }
        },
        components: {
            "appContainerItem": ContainerItem
        },
        props: {
            'name': {
                type: String,
                required: true
            },
            'view_all_flag': {
                type: Boolean,
                default: false
            },
            'view_all': {
                type: String,
                default: ''
            },
            'width': {
                type: String,
                default: '60vw'
            },
            'height': {
                type: String,
                default: '37vw'
            },
            'items': {
                type: Array,
                default: function(){
                    return []
                }
            },
            'route': {
                type: String,
                default: ''
            },
            'venue': {
                type: Boolean,
                default: false
            },
            params: {
                type: [Object,Array],
                default: function() {
                    return {
                        id: -1
                    }
                }
            },
            center: {
                type: Boolean,
                default: false
            },
            page: {
                type: Number,
                default: 1
            },
            url: {
                type: String,
                default: ''
            }
        },
        mounted(){
            this.actual_page = this.page;
        }
    }
</script>

<style scoped>
</style>
