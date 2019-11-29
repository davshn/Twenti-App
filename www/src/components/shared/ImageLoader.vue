<template>
  <div
    class="image_loader__content"
    :class="type">
    <div
      class="image_loader"
      v-show="!image_charge"
      >
      <!-- <div class="circle"></div> -->
      <div class="image_loader__shinning"></div>
      <img
        src="https://s3-us-west-2.amazonaws.com/karrottsportlife/Image_loader_icon.svg"
        alt=""
        class="image_loader__cam"
        :style="style_img">
    </div>
    <img
      v-show="image_charge"
      :src="src"
      alt=""
      :class="class_name"
      :style="style_img">
  </div>
</template>

<script>
export default {
  data(){
    return{
      image_charge: false,
      src: ''
    }
  },
  methods: {
    loadImage(image){
      var img = new Image();
      img.src = image;
      img.onload = function() {
        this.src = image;
        this.image_charge = true;
      }.bind(this);
    },
  },
  props:{
    class_name: {
      type: String,
      default: ''
    },
    url: {
      type: String
    },
    type: {
      type: String,
      default: ''
    },
    route: {
      type: Object,
      default: function () { return {} }
    },
    style_img: {
      type: Object,
      default: function () { return {} }
    }
  },
  mounted(){
    this.loadImage(this.url);
  }
}
</script>
