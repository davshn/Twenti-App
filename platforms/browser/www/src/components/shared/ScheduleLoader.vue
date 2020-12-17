<template>
  <article class="schedule_loader">
    <section class="schedule_loader__container">
      <img src="https://s3-us-west-2.amazonaws.com/karrottsportlife/logo_footer.svg" alt="">
    </section>
  </article>
</template>

<script>
export default {
}
</script>

<style lang="css">
@-webkit-keyframes load_icon {
  0%{ opacity: 0; }
  50%{ opacity: 1;}
  100%{ opacity: 0; }
}

@keyframes load_icon {
  0%{ opacity: 0; }
  50%{ opacity: 1;}
  100%{ opacity: 0; }
}

.schedule_loader{
  position: fixed;
  width: 100vw;
  height: 100vh;
  /*background: rgba(0,0,0,0.7);*/
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  display: -webkit-box;   /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox;  /* TWEENER - IE 10 */
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.schedule_loader__container{
  width: 50%;
}
.schedule_loader__container img{
  width: 100%;
  height: auto;
  -webkit-animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -moz-animation: load_icon 0.8s infinite;
  -webkit-animation: load_icon 0.8s infinite;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: load_icon 0.8s infinite;
}


</style>
