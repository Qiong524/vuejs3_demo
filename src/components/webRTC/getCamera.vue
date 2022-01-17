<template>
  <p>123456</p>
  <!-- <button class="btn btn-primary" @click="doLoad">初始化</button>
  <div>
    <video id="camera" autoplay playsinline controls />
  </div>
  <div>
    <video id="camera-chroma" autoplay playsinline controls />
  </div> -->

  <div class="row m-3 ml-5">
    <button class="btn btn-primary" @click="initPeerConnection">初始化</button>
    <button class="btn btn-primary btnCall ml-3" @click="createSignal(true)">
      send offer
    </button>
    <input
      type="text"
      class="form-control ml-3 col-2"
      v-model="room"
      placeholder="請輸入房號"
    />
    <button class="btn btn-primary ml-3" @click="joinRoom">加入房間</button>
    <input
      type="text"
      class="form-control ml-3 col-2"
      v-model="text"
      placeholder="請輸入訊息"
      @keypress.enter="sendText"
    />
    <button class="btn btn-primary ml-3" @click="sendText">送出訊息</button>
  </div>
  <div class="get-camera">
    <div class="row ml-5 border border-info mr-5 position-relative">
      <video
        width="200"
        height="200"
        class="rtc"
        autoplay
        id="myVideo"
        ref="myVideo"
        muted
        playsinline
      ></video>
      <video
        width="500"
        height="500"
        class="rtc ml-5"
        autoplay
        id="remoteVideo"
        ref="remoteVideo"
        playsinline
      ></video>
      <div class="col-3 position-absolute" style="top: 250px">
        <button
          class="btn btn-info ml-1"
          @click="closeTrack('audio', !audioTracks[0].enabled)"
        >
          {{ audioTracks && audioTracks[0].enabled ? "音訊On" : "音訊Off" }}
        </button>
        <button
          class="btn btn-info ml-3"
          @click="closeTrack('video', !videoTracks[0].enabled)"
        >
          {{ videoTracks && videoTracks[0].enabled ? "視訊On" : "視訊Off" }}
        </button>
      </div>
    </div>
  </div>


</template>

<script>
// import { mapGetters, mapState } from "vuex";

const constraints = (window.constraints = {
  audio: false,
  video: true,
});

export default {
  name: "getCamera",
  data() {
    return {
      localstream: null,
      pc: null,
      videoTracks: null,
      audioTracks: null,
    };
  },
  computed: {},
  methods: {
    async initPeerConnection() {
      console.log("initPeerConnection!!!");

      // try {
      //   console.log(constraints);
      //   console.log(navigator.mediaDevices);
      //   const stream = await navigator.mediaDevices.getUserMedia(constraints);
      //   console.log(stream);
      //   this.handleSuccess(stream);
      //   e.target.disabled = true;
      // } catch (e) {
      //   this.handleError(e);
      // }

      this.createMedia();
      // this.getAudioVideo();
      // this.createPeerConnection();
      // this.addLocalStream();
      // this.onIceCandidates();
      // this.onIceconnectionStateChange();
      // this.onAddStream();
      // this.onSocket();
    },
    handleSuccess() {
      console.log("success!!!!");
    },
    handleError() {
      console.log("error!!!!");
    },
    async createMedia() {
      console.log("createMedia!!!!");
      // 儲存本地流到全域
      this.localstream = await window.navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log('localstream!!!!!!!');
      this.$refs.myVideo.srcObject = this.localstream;
      console.log(this.$refs.myVideo.srcObject)
    },
    sendSignalingMessage(desc, offer) {
      const isOffer = offer ? "offer" : "answer";
      console.log(`寄出 ${isOffer}`);
      socket.emit("peerconnectSignaling", {
        desc: desc,
        to: 'jedy-0',
        from: 'hiro-1',
        room: '0509'
      });
    },
    async createSignal(isOffer) {
      try {
        if (!this.pc) {
          console.log('尚未開啟視訊')
          return;
        }
        this.offer = await this.pc[`create${isOffer ? 'Offer' : 'Answer'}`](this.signalOption);

        await this.pc.setLocalDescription(this.offer);
        this.sendSignalingMessage(this.pc.localDescription, isOffer ? true : false)
      } catch(err) {
        console.log(err);
      }
    },
    onSocket() {
      const vm = this;
      socket.on('peerconnectSignaling', async ({ desc, from, candidate }) => {
        if (desc && !vm.pc.currentRemoteDescription) {
          console.log('desc => ', desc);
          await vm.pc.setRemoteDescription(new RTCSessionDescription(desc));
          await vm.createSignal(desc.type === 'answer' ? true : false);
        } else if (candidate) {
          console.log('candidate =>', candidate);
          vm.pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });
      socket.on('message', message => {
        console.log('房間接收 => ', message);
      });
      socket.on('roomBroadcast', message => {
        console.log('房間廣播 => ', message);
      });
    },
    joinRoom() {
      if (!this.room) {
        return;
      }
      socket.emit('joinRoom', this.room);
      this.room = null;
    },
    sendText() {
      if (!this.text) {
        return;
      }
      socket.emit('message', this.text);
      this.text = null;
    },
    closeTrack(trackName, isOpen) {
      // console.log(this.videoTracks);
      this[`${trackName}Tracks`][0].enabled = isOpen
      this[`${trackName}Tracks`] = this.localstream[trackName === 'video'? 'getVideoTracks' : 'getAudioTracks']()
    }
  },
};
</script>

  <style>
    #myVideo{
      width: 200px;
      height: 200px;
      background: rgba(141, 167, 167, 0.178);
      transform: scaleX(-1);
    }

    #remoteVideo{
      width: 500px;
      height: 500px;
      background: rgba(141, 167, 143, 0.178);
    }
  </style>
