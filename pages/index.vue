<template>
  <div>
    <Header />

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
            <v-row>
              <v-col>
                <v-btn
                  :href="`https://mirador.cultural.jp/?manifest=${output.manifest}`"
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
              <v-col>
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
                </v-btn>
              </v-col>
            </v-row>
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

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.search()
  }

  async search() {
    const id = this.id

    if (!id) {
      return
    }

    const name = new Date().getTime().toString()

    this.status = 'RUNNING'

    const res = await this.$axios.$post(
      'https://0nqmlna15g.execute-api.us-east-1.amazonaws.com/prod/execution',
      {
        input: `{"id": "${id}"}`,
        name,
        stateMachineArn:
          'arn:aws:states:us-east-1:921043147308:stateMachine:sfn-sam-app-statemachine',
      }
    )
    // console.log({ res })
    const executionArn = res.executionArn

    while (true) {
      const res = await this.$axios.$post(
        `https://0nqmlna15g.execute-api.us-east-1.amazonaws.com/prod/execution/status`,
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
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }
}
</script>
