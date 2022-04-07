<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dark flat>
        <v-toolbar-title>
          <nuxt-link
            style="color: inherit"
            :to="localePath({ name: 'index' })"
            >{{ siteName }}</nuxt-link
          ></v-toolbar-title
        >

        <v-spacer></v-spacer>

        <v-btn icon :to="localePath({ name: 'search' })">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn v-if="!isMobile" icon :to="localePath({ name: 'about' })">
          <v-icon>mdi-information</v-icon>
        </v-btn>

        <v-menu v-if="!isMobile" offset-y>
          <template #activator="{ on }">
            <v-btn depressed icon v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item exact :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
            <v-list-item exact :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-toolbar-items v-if="!isMobile"> </v-toolbar-items>
      </v-app-bar>
    </div>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer class="mt-10" dark>
      <v-container class="py-10 text-center"
        >Powered by
        <a
          target="_blank"
          href="https://lab.ndl.go.jp/dl/"
          :style="`color: inherit;`"
          >国立国会図書館「次世代デジタルライブラリー」</a
        ></v-container
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      siteName: process.env.siteName,
    }
  },
  computed: {
    isMobile() {
      if (['xs', 'sm'].includes(this.$vuetify.breakpoint.name)) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style>
* {
  text-transform: none !important;
}

a {
  text-decoration: none !important;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0 0 0 / 5%);
}
</style>
