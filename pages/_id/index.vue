<template>
  <div>
    <Header />

    <v-container class="my-10">
      <div class="text-center">
        {{ siteDesc }}
        <div class="mt-4">
          <a target="_blank" href="https://lab.ndl.go.jp/dl/"
            >https://lab.ndl.go.jp/dl/</a
          >
        </div>
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

        <div class="mt-10">
          <template v-if="status === 'RUNNING'">
            <v-progress-linear
              indeterminate
              color="primary"
              class="mt-3"
            ></v-progress-linear>
          </template>
          <template v-else-if="status === 'FAILED'">
            {{ $t('failed') }}
          </template>
          <template v-else-if="status === 'SUCCEEDED'">
            <div class="mt-10 pb-10">
              <h3 class="text-center mb-5">ビューア</h3>
              <v-row>
                <v-col cols="12" :md="4">
                  <v-btn
                    :to="localePath({ name: 'id-mirador', params: { id: id } })"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    Mirador
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://universalviewer.io/examples/uv/uv.html#?manifest=${output.manifest}`"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    Universal Viewer
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://www.kanzaki.com/works/2016/pub/image-annotator?u=${output.manifest}`"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    Image Annotator
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${output.curation}`"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    Curation Viewer
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :to="localePath({ name: 'id-tei', params: { id: id } })"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    TEI Viewer
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://lab.ndl.go.jp/dl/book/${id}`"
                    target="_blank"
                    class="info"
                    block
                    rounded
                    depressed
                    large
                  >
                    次世代デジタルライブラリー
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div class="mt-10">
              <h3 class="text-center mb-5">データ</h3>
              <v-row>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`${output.manifest}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    マニフェストファイル
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`${output.curation}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    キュレーションリスト
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`${output.tei}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    TEI/XML
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="false" class="mt-10">
              <h3 class="text-center mb-5">関連サイト</h3>
              <v-row>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://lab.ndl.go.jp/dl/book/${id}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    次世代デジタルライブラリー
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://dl.ndl.go.jp/info:ndljp/pid/${id}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    国立国会図書館デジタルコレクション
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" :md="4">
                  <v-btn
                    :href="`https://jpsearch.go.jp/item/dignl-${id}`"
                    target="_blank"
                    color="secondary"
                    block
                    rounded
                    depressed
                  >
                    ジャパンサーチ
                    <v-icon class="ml-1">mdi-exit-to-app</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </template>
        </div>
      </div>
    </v-container>

    <Footer />
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
      this.init() // search()
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
      (this as any).localePath({
        name: 'id',
        params: {
          id,
        },
      })
    )
  }

  async init() {
    const id = this.id

    if (!id) {
      return
    }

    const name = new Date().getTime().toString()

    this.status = 'RUNNING'

    const res = await this.$axios.$post(process.env.step + '/execution', {
      input: `{"id": "${id}"}`,
      name,
      stateMachineArn:
        'arn:aws:states:us-east-1:921043147308:stateMachine:sfn-sam-app-statemachine',
    })
    // console.log({ res })
    const executionArn = res.executionArn

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const res = await this.$axios.$post(
        process.env.step + `/execution/status`,
        {
          executionArn,
        }
      )
      this.status = res.status
      if (res.status === 'SUCCEEDED') {
        const output = JSON.parse(res.output)
        const body = JSON.parse(output.body)
        this.output = body
        break
      } else if (res.status === 'FAILED') {
        console.log({ res })
        break
      }
    }
  }
}
</script>
