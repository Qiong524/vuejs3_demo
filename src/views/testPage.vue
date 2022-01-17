<template>
    <!-- getUserMedia -->
    <div id="app">
      <!-- <get-camera /> -->
      <get-camera />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import getCamera from '@/components/webRTC/getCamera.vue'

export default {
  name: 'testPage',
  components: {
    getCamera
  },
}
</script>