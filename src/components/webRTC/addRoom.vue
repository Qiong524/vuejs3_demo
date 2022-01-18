<template>

  <transition name="modal">
    <div class="modal-mask" v-show="showAdd">
      <div class="modal-wrapper">

        <div class="modal-container">
          <div class="modal-body">
            <!-- 內容放這裡 -->
            <h1 class="store-name">建立聊天室</h1>
            <hr>
            <p class="title">名稱：<input v-model="roomName" placeholder=""></p> 
            <p class="title">密碼：<input v-model="roomPwd" placeholder=""></p> 
            <p class="title">主持人密碼：<input v-model="speakerPwd" placeholder=""></p> 
            <p class="title">房間描述：<input v-model="roomDescription" placeholder=""></p> 
            <button class="btn btn-primary btnCall ml-3" @click="openInfoBox()">建立</button>
            <button class="btn btn-primary btnCall ml-3" @click="close()">取消</button>
          </div>
        </div>

      </div>
    </div>
  </transition>






</template>

<script>
export default {
  name: 'addRoom',
  computed: {
    showAdd: {
      get() {
        return this.$store.state.showAdd;
      },
      set(value) {
        this.$store.commit('setshowAdd', value);
      },
    },
  },
  methods: {
    close() {
      this.showAdd = false;
    },
    async create() {
      const roomName = this.roomForm.get('name').value;
      const speakerPassword = this.roomForm.get('speakerPassword').value;
      const attendeePassword = this.roomForm.get('attendeePassword').value;
      const roomDesc = this.description;

      let roomId = '';
      let postUrl = '';
      if ( this.optUpdate ) {
        roomId = this.dataRoom.id;
        postUrl = getHost() + '/room/updateRoom';
      } else {
        roomId = this.makeRandomString(6);
        postUrl = getHost() + '/room/createRoom';
      }

      this.logger.debug('id: %s, name: %s, speakerPassword: %s, attendeePassword: %s, roomDesc: %s',
        roomId,
        roomName,
        speakerPassword,
        attendeePassword,
        roomDesc);

      this.http.post(postUrl, {
        roomId,
        roomName,
        speakerPassword,
        attendeePassword,
        roomDesc
      }).subscribe((res) => {
        this.eventbus.room$.next({
          type: EventType.room_created
        });

        const action = this.optUpdate ? this.i18n.lang.update : this.i18n.lang.create;
        this.snackbar.open(`${action} ${roomName} ${this.i18n.lang.success}, ID: ${roomId}`, 'close', {duration: 5000});
      }, error => {
        this.snackbar.open(`${error.name}: ${error.message}`, 'close', {duration: 5000});
      });
    },



  },
};
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .65);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 520px;
  margin: 0px auto;
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-body {
  color: #1a1b33;
  margin: 20px 0;
}
</style>

<style>
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>

<style lang="scss" scoped>
.store-name {
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.5;
}
.title{
  font-weight: 500;
  margin-bottom: .5rem;
  line-height: 1.7;
}
table {
  border-spacing: 0;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 1rem;
}
th{
  background-color: #42b983;
  color: #fff;
}
td, th{
  padding: .3em;
  text-align: center;
  line-height: 1.5rem;
}
</style>