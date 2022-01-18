import { createStore } from 'vuex'

export default createStore({
  state: {
    currCity: '臺北市',
    currDistrict: '信義區',
    location: [],
    stores: [],
    keywords: '',
    showModal: false,
    infoBoxSid: null,
    showAdd: false,
  },
  getters: {
    cityList(state){
      return state.location.map((d) => d.name);
    },
    districtList(state){
      return state.location.find((d) => d.name === state.currCity)?.districts || [];
    },
    filteredStores(state){
      const{ stores } = state;

      return state.keywords
        ? stores.filter((d) => d.name.includes(state.keywords))
        : stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict );

    },
    currDistrictInfo(state, getters){
      return getters.districtList.find((d) => d.name === state.currDistrict) || [];
    }
  },
  //Vuex定義，只能從mutations操作state
  mutations: {
    setcurrCity(state, payload){
      state.currCity = payload;
    },
    setcurrDistrict(state, payload){
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload){
      state.location = payload;
    },
    setStores(state, payload){
      state.stores = payload;
    },
    setKeywords(state, payload){
      state.keywords = payload;
    },
    setshowModal(state, payload){
      state.showModal = payload;
    },
    setInfoBoxSid(state, payload){
      state.infoBoxSid = payload;
    },
    setshowAdd(state, payload){
      state.showAdd = payload;
    },

    

    
  },
  actions: {
    // 取得行政區資料
    async fetchLocations({ commit }) {  
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json());
  
      // 透過 commit 來操作 mutations
      commit('setAreaLocation', json);
    },
    // 取得藥局資料
    async fetchPharmacies({ commit }) {  
      const json = await fetch('https://kiang.github.io/pharmacies/json/points.json')
        .then((res) => res.json());

      // 整理資料格式，拆出經緯度
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));
  
      // 透過 commit 來操作 mutations
      commit('setStores', data);
    },


  },
  modules: {
  }
})
