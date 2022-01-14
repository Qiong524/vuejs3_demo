import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
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

createApp(App).use(store).use(router).mount('#app')
