<template>
  <div class="grid-x">
    <div class="cell">
      <div
        class="instance__tile"
        :class="{ 'instance__tile--noSeparator': venue }">
        <div class="grid-x">
          <div class="cell">
            <h2 class="offerInstance__sectionTitle">Descripción</h2>
            <p class="offerInstance__description">{{ offer.attributes.description }}</p>
          </div>
        </div>
        <div class="grid-x tag__slider" >
          <div class="cell shrink" v-for="tag in tags">
            <div class="tag">{{tag['natural_name'] | capitalize}}</div>
          </div>
        </div>
      </div>
    </div>
  </div><!-- End. Description. -->
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: {
      offer: {
        type: Object
      },
      'venue': {
        type: Boolean,
        default: false
      },
      tags: {
          type: Array,
          default: []
      }
    }
  }
</script>
