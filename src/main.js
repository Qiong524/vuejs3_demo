import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import App from './App.vue'
import store from './store'
import router from './router'
import zh from "./language/zh-TW.json";
import en from "./language/en-US.json";

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") ?? "zh-TW",
    fallbackLocale: "zh-TW",
    messages: {
        "zh-TW": zh,
        "en-US": en
    }
});

createApp(App).use(store).use(router).use(i18n).mount('#app');

// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//     apiKey: "AIzaSyDmPwvefSO5vbs1uYhMkCGFaYY1FMovjC4",
//     authDomain: "fir-auth-cd983.firebaseapp.com",
//     projectId: "fir-auth-cd983",
//     storageBucket: "fir-auth-cd983.appspot.com",
//     messagingSenderId: "277317020215",
//     appId: "1:277317020215:web:0981534ca796e71984edb2",
//     measurementId: "G-FT2GQMYQZ7"
// }

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


