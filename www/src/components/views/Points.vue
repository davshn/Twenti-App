<template>
  <article class="points">
    <section class="points__container" v-if="charged">
      <section class="coupon__nav">
        <img src="https://twenti.s3-us-west-2.amazonaws.com/demo/arrow.svg" alt="" @click="goBack()">
      </section>
      <section class="points__head">
        <p class="points__head--text">{{getFirstName()}} tienes</p>
        <p class="points__head--text points__head--points">{{current_points}}</p>
        <p class="points__head--text">Puntos acumulados</p>
      </section>
      <!-- <section>
        <p>Quiero redimir mis puntos en:</p>
        <div class="">

        </div>
      </section>
      <section>

      </section> -->
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      current_points: 0,
      charged:false
    }
  },
  methods:{
    getPoints(){
      try {
        this.$http.get('get_points/'+this.getUserId(),
        ).then(function(response){
          this.current_points = response.body.current_points
          console.log(response);
          console.log("Congrats");
          this.charged = true
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    }
  },
  mounted(){
    this.getPoints()
  }
}
</script>
