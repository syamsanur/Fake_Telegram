<template>
  <div>
    <b-modal id="mapmodal" title="MAP" hide-footer>
      <google-maps class="map" :center="{lat: -6.923477, lng: 107.606335}" :zoom="12"></google-maps>
    </b-modal>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  components: {
    'google-maps': VueGoogleMaps.Map
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
