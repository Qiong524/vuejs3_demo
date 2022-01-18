<template>
  <aside-conference />
  <div class="wraps">
    <button class="btn btn-primary" @click="addRoom()">
      {{ t("add") }}
    </button>
    <button class="btn btn-primary btnCall ml-3" @click="deleteRoom()">
      {{ t("delete") }}
    </button>
    <label>
      {{ t("search") }}：
      <input type="text" placeholder="請輸入關鍵字" v-model="keywords" />
      <i class="fas fa-search"></i>
    </label>
  </div>
  <hr />
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">#</th>
          <th scope="col">名稱</th>
          <th scope="col">創建時間</th>
          <th scope="col">開啟房間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 5" :key="i">
          <th scope="row">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault"> </label>
            </div>
          </th>
          <td>{{ i }}</td>
          <td>room{{ i }}</td>
          <td>xxxxx</td>
          <!-- <td><a href="/chatRoom" class="link-primary">link</a></td> -->
          <td>
            <router-link :to="`/chatRoom/${i}`"> /chatRoom/{{ i }}</router-link>
          </td>
        </tr>
        <!-- <router-view></router-view> -->
      </tbody>
    </table>
  </div>

  <add-room></add-room>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import asideConference from "../components/webRTC/asideConference.vue";
import { useI18n } from "vue-i18n";
import AddRoom from "../components/webRTC/addRoom.vue";

export default {
  name: "roomManage",
  components: {
    asideConference,
    AddRoom,
  },
  setup() {
    const { t, locale } = useI18n();
    return {
      t,
      locale,
    };
  },
  computed: {
    showAdd: {
      get() {
        //console.log(this.$store.state.showAdd);
        return this.$store.state.showAdd;
      },
      set(value) {
        this.$store.commit("setshowAdd", value);
      },
    },
  },
  methods: {
    addRoom() {
      console.log("addRoom!!!!!!!");
      // const dialogRef = this.dialog.open(AddroomComponent, {
      //   disableClose: true,
      // });
      console.log("showAdd#1===>" + this.showAdd);
      this.showAdd = true;
      console.log("showAdd#2===>" + this.showAdd);
    },
    deleteRoom() {
      this.selection.selected.forEach((select) => {
        this.logger.debug(JSON.stringify(select));
      });

      let message = "";
      if (this.selection.selected.length > 1) {
        message = `Conform to delete ${this.selection.selected.length} rooms: \n`;
        let max = this.selection.selected.length;
        if (max > 5) {
          max = 5;
        }

        for (let i = 0; i < max; i++) {
          message += this.selection.selected[i].id + " ";
        }

        if (this.selection.selected.length > max) {
          message += "...";
        }
      } else {
        message = `Conform to delete room '${this.selection.selected[0].id}'`;
      }

      if (confirm(message)) {
        this.selection.selected.forEach((select) => {
          const deleteUrl = getHost() + "/room/delete/" + select.id;
          this.http.get(deleteUrl).subscribe(
            (res) => {
              this.roomList();
            },
            (error) => {
              this.snackbar.open(`${error.name}: ${error.message}`, "close", {
                duration: 5000,
              });
            }
          );
        });

        this.selection.clear();
      }
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>