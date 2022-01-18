<template>
  <h1>Room: {{ $route.params.roomId }}</h1>
  <pre>{{ roomInfo }}</pre>
</template>


<script>
export default {
  name: 'chatRoom',
  data() {
    return {
      roomInfo: {},
    };
  },
  computed: {
    roomId() {
      return this.$route.params.roomId;
    },
  },
  watch: {
    roomId: async function (val) {
      this.roomInfo = await this.fetchUserInfo(val);
    },
  },
  methods: {
    async fetchUserInfo(id) {
      return await fetch("https://jsonplaceholder.typicode.com/users/" + id)
        .then((response) => response.json())
        .then((json) => json);
    },
  },
  async created() {
    this.roomInfo = await this.fetchUserInfo(this.roomId);
  },
};
</script>
