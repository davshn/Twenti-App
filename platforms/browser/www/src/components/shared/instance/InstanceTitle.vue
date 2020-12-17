<template>
  <div class="grid-x">
    <div class="cell">
      <div class="instance__tile">
        <div class="grid-x">
          <div class="cell">
            <p class="offerInstance__title">
              {{ venue? offer.attributes.name : offer.attributes.title  }}
            </p>
          </div>
        </div>
        <div class="grid-x grid-margin-x">
          <div
            class="cell shrink"
            v-if="!venue && offer.attributes.published && offer.attributes['expiration'] != '' && offer.attributes['expiration'] != undefined && offer.attributes['expiration'] != null">
            <div class="offerInstance__label">
              <div class="grid-x">
                <div class="cell shrink">
                  <svg-clock></svg-clock>
                </div>
                <div class="cell auto">
                  <p class="offerInstance__expiry">
                    Hasta  {{ format_date(offer.attributes["expiration"]) | moment("dddd DD MMM") | capitalize }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cell shrink"
            v-if="!venue && !offer.attributes.is_class">
            <div class="offerInstance__label offerInstance__label--success">
              <div class="grid-x">
                <div class="cell auto">
                  <p class="offerInstance__expiry">
                    {{ getCurrentFavorites() }} favoritos
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cell shrink"
            v-if="venue">
            <div class="offerInstance__label">
              <div class="grid-x">
                <div class="cell shrink">
                  <svg-location></svg-location>
                </div>
                <div class="cell auto">
                  <p class="offerInstance__expiry">
                    {{ offer.attributes["city"] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!venue && !offer.attributes.published">
            <p class="offerInstance__unabled_offer">
              LA OFERTA NO ESTA DISPONIBLE
            </p>
          </div>
        </div>
      </div>
    </div>
  </div><!-- End. Title. -->
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
      vouchers_count: {
          type: Number,
          default: 0
      }
    },
    methods: {
        format_date(date) {
            return date;
        }
    }
  }
</script>
