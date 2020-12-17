<template>
  <div class="home_circle">
    <router-link tag="div"
        class="col-xs-8 col-xs-offset-2 no-padding" style="padding-top: 5px;"
        :to="{ name: getHomeRoute() }">
        <app-home></app-home>
    </router-link>
  </div>
</template>

<script>
  import Home from './svg/Explore.vue'

  export default {
    components: {
      "appHome": Home
    }
  }
</script>

<style scoped>
  .home_circle{
    padding-top: 10px;
    border-radius: 50%;
    background: #5B96FC;
    padding: 5px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    height: 50px;
    width: 50px;
    box-shadow: 0px 3px 7px #888888;
    z-index: 3;
  }
</style>
