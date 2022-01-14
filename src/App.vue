<template>
<p>
<router-link to="/webRTC"> webRTC </router-link>
</p>

<router-link to="/maskMap"> maskMap </router-link>
<ul>
  <li v-for="i in 5" :key="i">
    <router-link :to="`/users/${i}`"> /users/{{ i }}</router-link>
  </li>
</ul>
<router-view></router-view>
</template>

<script>
import { mapActions } from 'vuex';
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox.vue'
import maskMap from './components/maskMap.vue'

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
    maskMap
  },
  methods: {
    ...mapActions(['fetchLocations', 'fetchPharmacies']),
    openPopup(id){
      this.$refs.map.triggerPopup(id);
    }
  },
  mounted(){
    this.fetchLocations();
    this.fetchPharmacies();
  }

}
</script>

<style lang="scss" src="./style.scss"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

li:not(:last-of-type) {
  margin-right: 1rem;
}

.router-link-active {
  color: orange;
}

.router-link-exact-active {
  color: crimson;
}

pre {
  font-size: 1.1rem;
}
</style>
