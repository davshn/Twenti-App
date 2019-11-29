<template>
  <article
    class="instance_object"
    :style="{'flex-wrap': wrap}">
    <div
      class="instance_object__instance"
      v-for="(object, index) in objects"
      v-if="object.attributes.published && ((object_type == 'offer' && new Date(object.attributes['expiration'])>=new Date()) || object_type == 'location' || object_type == 'class')"
      @click="$router.push({name: route, params: {
          id: object.id ? object.id : object.attributes.id,
          is_voucher: object.attributes['is-voucher'],
          is_favorite: object.attributes['is_favorite'],
          is_class: object.attributes['is_class']
        }})">
      <figure
        class="instance_object__image">
        <image-loader
          :url="getServerImage() + object.attributes.images[0].image.thumb.url"
          v-if="object_type == 'offer' || object_type == 'class'"></image-loader>
        <image-loader
          :url="getServerImage() + object.attributes.image.thumb.url"
          v-else></image-loader>
      </figure>
      <!-- <div class="instance_object__favourite" @click.stop
        v-if="(object_type == 'offer' && !object.attributes.is_class) || (object_type == 'location' && !object.attributes.is_trainer)"> -->
      <div class="instance_object__favourite" @click.stop
        v-if="object_type == 'offer' && !object.attributes.is_class">
        <app-favourite
            :itemid="object.id ? object.id : object.attributes.id"
            :status="object.attributes['is_favorite']"
            :objecttype = '"offers"'
            class="instance_object__favourite--icon"
            v-if="object_type == 'offer'">
        </app-favourite>
        <!-- <app-favourite
            :itemid="object.id ? object.id : object.attributes.id"
            :status="object.attributes['is_favorite']"
            :objecttype = '"locations"'
            class="instance_object__favourite--icon"
            v-else>
        </app-favourite> -->
      </div>
      <div
        class="instance_object__title_container">
        <p class="instance_object__title">
          {{object.attributes.title}}
        </p>
      </div>
      <p
        class="instance_object__expiry"
        v-if="object_type == 'offer' || object_type == 'class'">
        Hasta el {{object.attributes['expiration'] | moment("dddd DD MMM") | capitalize }}
      </p>
      <p
        v-else-if="object_type == 'location'"
        class="instance_object__expiry">
        {{object.attributes.address}}
      </p>
    </div>
  </article>
</template>

<script>
import Favourite from '../svg/Favourite.vue'
export default {
  props:{
    objects:{
      type: Array,
      default: []
    },
    route:{
      type: String,
      default: ''
    },
    object_type:{
      type: String,
      default: 'offer'
    },
    wrap: {
      type: String,
      default: 'nowrap'
    }
  },
  components: {
    "appFavourite": Favourite
  }
}
</script>
