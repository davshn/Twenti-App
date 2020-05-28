<template lang="html">
  <article class="" style="width: 100vw; height: 100vh;">
    <p style="margin: 30px; text-align: center; color: #FF0202;">Categorias</p>
    <section style="width: 100%; padding: 0 45px; display: flex; align-items: flex-start; justify-content: center; flex-wrap: wrap">
      <div
        style="width: calc(30% - 20px); margin: 15px 10px; "
        class=""
        v-for="(category, index) in categories">
        <div class="" style="width: 100%; height: 66px; background-color:#FFDF8E; border-radius:10px; ">
          <img :src="category.image.url" alt="">
        </div>
        <p style="font-size: 10px; text-align: center;">{{category.name}}</p>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      categories: []
    }
  },
  methods:{
    findCategories(){
      try {
        this.$http.get('categories',
        ).then(function(response){
          this.categories = response.body.data
          console.log("Congrats");
          console.log(response);
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
    this.findCategories()
  }
}
</script>

<style lang="css">
</style>
