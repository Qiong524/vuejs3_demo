<template>

    <sidebar-menu
      class="sidebar"
      :menu="menu"
      :collapsed="collapsed"
      @item-click="onItemClick"
      @collapse="onCollapse"
    />
    <div id="view" :class="[{'collapsed' : collapsed}]">
      <router-link to="/webRTC"> webRTC </router-link>
      <router-link to="/maskMap"> maskMap </router-link>
      <ul>
        <li v-for="i in 3" :key="i">
          <router-link :to="`/users/${i}`"> /users/{{ i }}</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
    <h1>{{$route.params.id}}</h1>
</template>


<script>
import { mapActions } from "vuex";
import { SidebarMenu } from "vue-sidebar-menu";
import asideMenu from "./components/asideMenu.vue";
import lightBox from "./components/lightbox.vue";
import maskMap from "./components/maskMap.vue";
import addRoom from "./components/webRTC/addRoom.vue";


import { useI18n } from "vue-i18n";

export default {
  name: "App",
  setup() {
    const { t, locale } = useI18n();
    return {
      t,
      locale,
    };
  },  
  data() {
    return {
      menu: [
        {
          header: false,
          title: "",
        },
        {
          href: "/roomManage",
          title: this.t('roomManage'),
          icon: "fa fa-home",
        },
        {
          href: "/roomMonitor",
          title: this.t('roomMonitor'),
          icon: "fa fa-bullseye",
        },
        {
          href: "/testPage",
          title: "測試區",
          icon: "fa fa-list-ul",
          // child: [
          //   {
          //     href: "/page/sub-page-1",
          //     title: "Sub Page 01",
          //     icon: "fa fa-file-alt",
          //   },
          //   {
          //     href: "/page/sub-page-2",
          //     title: "Sub Page 02",
          //     icon: "fa fa-file-alt",
          //   },
          // ],
        },
      ],
      collapsed: true,
    };
  },
  components: {
    SidebarMenu,
    asideMenu,
    lightBox,
    maskMap,
    addRoom,
  },
  methods: {
    ...mapActions(["fetchLocations", "fetchPharmacies"]),
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
    onItemClick(e, i) {
      console.log("onItemClick");
    },
    onCollapse(c) {
      console.log("onCollapse");
      this.collapsed = c;
    },
    onItemClick(e, i) {
      console.log("onItemClick");
    },
    onCollapse(c) {
      console.log("onCollapse");
      this.collapsed = c;
    },
  },
  mounted() {
    this.fetchLocations();
    this.fetchPharmacies();
  },
};
</script>

<style lang="scss" src="./style.scss"></style>


<style>
#view {
  padding-left: 350px;
}
#view.collapsed {
  padding-left: 90px;
}

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}
</style>


