<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
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
