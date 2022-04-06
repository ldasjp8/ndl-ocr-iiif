<template>
  <div>
    <v-container class="my-10">
      <div class="text-center">
        国立国会図書館「次世代デジタルライブラリー」が提供するAPIを用いた検索を行います。
        <div class="mt-4">
          <a target="_blank" href="https://lab.ndl.go.jp/dl/"
            >https://lab.ndl.go.jp/dl/</a
          >
        </div>
      </div>

      <div class="mt-10 text-center">
        <v-text-field
          v-model="q"
          rounded
          filled
          :placeholder="`${'検索語を入力してください。'} ${$t(
            'example'
          )}: 校異源氏物語`"
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
          {{ $t('search') }}</v-btn
        >
        <v-btn
          class="ma-2"
          large
          rounded
          depressed
          color="success"
          @click="q = '校異源氏物語'"
        >
          {{ $t('example') }} 校異源氏物語</v-btn
        >
      </div>

      <div class="mt-10">
        <template v-if="status === 'RUNNING'">
          <v-progress-linear
            indeterminate
            color="primary"
            class="mt-3"
          ></v-progress-linear>
        </template>

        <template v-else>
          <div v-if="results.hit">
            <div class="text-center">
              <div class="my-5">
                <h3 class="mb-2">{{ $t('検索結果') }}</h3>
                <span>{{ results.hit }} 件</span>
              </div>
            </div>
            <HorizontalItems :data="results.list" :height="150" />
          </div>
        </template>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import HorizontalItems from '~/components/HorizontalItems.vue'
@Component({
  components: {
    HorizontalItems,
  },
})
export default class FullTextSearch extends Vue {
  q: any = ''
  siteDesc: any = process.env.siteDesc
  start: Number = 0
  results: any = {}

  status: string = ''

  created() {
    const q = this.$route.query.q
    if (q) {
      this.q = q
      this.init()
    }
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.search()
  }

  @Watch('$route.query.q')
  watchQ(): void {
    this.init()
  }

  async init() {
    this.results = {}
    this.status = 'RUNNING'
    const start = this.start
    const data = await this.$axios.$get(
      `https://lab.ndl.go.jp/dl/api/book/search?from=${start}&keyword=${this.q}`
    )
    this.results = data

    this.status = ''
  }

  search() {
    const q = this.q

    if (!q) {
      return
    }

    this.$router.push(
      (this as any).localePath({
        name: 'search',
        query: {
          q,
        },
      })
    )
  }
}
</script>
