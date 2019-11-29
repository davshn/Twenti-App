<template>
  <div class="toast">
    <div class="toast__content">
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    'message': {
      type: String
    }
  },
  mounted(){
    var vm = this
    setTimeout(function(){
      vm.updateShowToast(false)
    }, 3000)
  }
}
</script>

<style lang="css">
</style>
