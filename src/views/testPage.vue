<template>
    <aside-conference />
</template>

<script>
// @ is an alias to /src
import asideConference from '@/components/webRTC/asideConference.vue'

export default {
  name: 'roomMonitor',
  components: {
    asideConference
  }
}
</script>