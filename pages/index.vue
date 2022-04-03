<template>
  <div>
    <v-container class="my-10">
      <div class="text-center">
        {{ siteDesc }}
      </div>
      <div class="mt-10 text-center">
        <v-text-field
          v-model="id"
          rounded
          filled
          :placeholder="`${'IDを入力してください。'} ${$t('example')}: 3437686`"
          @click:append="search"
          @keydown.enter="trigger"
        ></v-text-field>
        <v-btn
          class="ma-2"
          large
          rounded
          depressed
          color="primary"
          @click="search"
        >
          {{ $t('execution') }}</v-btn
        >
        <v-btn
          class="ma-2"
          large
          rounded
          depressed
          color="success"
          @click="id = 3437686"
        >
          {{ $t('example') }} 校異源氏物語</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  id: string = ''
  output: any = {}
  status: string = ''

  siteDesc: any = process.env.siteDesc

  created() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.search()
    }
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.search()
  }

  search() {
    const id = this.id

    if (!id) {
      return
    }

    this.$router.push(
      this.localePath({
        name: 'id',
        params: {
          id,
        },
      })
    )
  }
}
</script>
