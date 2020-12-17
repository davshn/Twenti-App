<template>
    <div class="pull">
    </div>
</template>

<script>
    export default {
        data(){
            return {
                ptf: null
            }
        },
        props:{
            element: {
                type: String,
                required: true
            },
            refresh: {
                type: Function,
                required: true
            }
        },
        mounted(){
            var vm = this;
            vm.ptf = PullToRefresh.init({
                mainElement: ".pull",
                onRefresh: function(){
                    vm.refresh();
                },
                triggerElement: vm.element,
            });
        },
        destroyed(){
            this.ptf.destroy();
        }
    }
</script>

<style>
</style>
