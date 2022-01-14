

<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <nav>
    <select v-model="locale">
      <option>zh-TW</option>
      <option>en-US</option>
    </select>
  </nav>
  <p>{{ t("roomManage") }}</p>
  <p>{{ t("createRoom") }}</p>
</template>

<script>
import { watch } from "vue";
import { useI18n } from "vue-i18n";
export default {
  name: "HomeView",
  setup() {
    const { t, locale } = useI18n();

    watch(locale, (newlocale) => {
      localStorage.setItem("locale", newlocale);
    });

    return {
      t,
      locale,
    };
  },

};
</script>