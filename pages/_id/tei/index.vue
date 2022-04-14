<template>
  <div>
    <v-container fluid class="mt-5 mb-10">
      <v-row align="center">
        <v-col cols="2">
          <v-text-field v-model="page" dense outlined hide-details ></v-text-field>
        </v-col>
        <v-col>
          <div>/ {{ items.length }} ページ</div>
        </v-col>
        <v-col>
          <v-btn class="ma-1" :disabled="page < 2" @click="move(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-btn class="ma-1" :disabled="page > items.length - 1" @click="move(1)"><v-icon>mdi-arrow-right</v-icon></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <TeiElement v-if="element" :element="element"></TeiElement>
          
        </v-col>
        <v-col>
          <Osd
            height="600"
            width="100%"
            :manifest="manifest"
            :page="page"
            :xywh="xywh"
            @page="updatePage"
          ></Osd>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Watch, Component } from 'nuxt-property-decorator'
const convert = require('xml-js')
// const CETEIcean = require('CETEIcean/src/CETEI.js')

@Component({
  components: {},
})
export default class Header extends Vue {
  page: number = this.$route.query.page ? Number(this.$route.query.page) : 1

  id: string = this.$route.params.id

  manifest: string = '' // `https://www.dl.ndl.go.jp/api/iiif/${id}/manifest.json`

  updatePage(value: number) {
    this.page = value
  }


  element: any = null
  xml: any = null

  items: number[] = []

  facsMap: any = {}

  @Watch('page')
  watchPage(value: number) {
    if (value) {
      this.facs = null
      this.showPage()

      this.$router.push(
        (this as any).localePath({
          name: 'id-tei',
          params: {
            id: this.id,
          },
          query: {
            page: value,
          },
        })
      )
    }
  }

  get facs() {
    return this.$store.getters.getFacs
  }
  
  set facs(value) {
    this.$store.commit('setFacs', value)
  }

  get xywh(){
    const facs = this.facs
    const facsMap = this.facsMap
    if(!facs || !facsMap){
      return null
    }

    if(!facsMap[facs]){
      return null
    }

    return facsMap[facs]

  }

  move(value: number) {
    this.page = Number(this.page) + value
  }

  async created() {

    let id = this.id

    //id = "3437686"

    this.manifest = `https://www.dl.ndl.go.jp/api/iiif/${id}/manifest.json`

    const url = `https://ocr.aws.ldas.jp/v1/tei/${id}.xml`

    const xml = await this.$axios.$get(url)

    // console.log({xml})
    const parser = new DOMParser();
    const data  = parser.parseFromString(xml,"text/xml");
    // const data = await CETEIcean.makeHTML5(xml)

    this.xml = data

    const divs = data.querySelectorAll('div[n]')

    const pages = []
    for (let i = 0; i < divs.length; i++) {
      pages.push(i + 1)
    }
    this.items = pages

    this.showPage()

    const zones: any = data.querySelectorAll('zone')
    const facsMap: any = {}
    for(const zone of zones){
      const id = zone.getAttribute('xml:id')
      const x = Number(zone.getAttribute('ulx'))
      const y = Number(zone.getAttribute('uly'))
      const w = Number(zone.getAttribute('lrx')) - x
      const h = Number(zone.getAttribute('lry')) - y
      const xywhObj = {x,y,w,h}
      facsMap[id] = xywhObj
    }

    this.facsMap = facsMap
  }

  conv2json(xml: any) {
    xml = new XMLSerializer().serializeToString(xml)
    const result = convert.xml2json(xml) //, spaces: 4 , { compact: false} 
    let data = JSON.parse(result)
    data = data.elements[0]
    return data
  }

  showPage() {
    const page = Number(this.page)
    const div = this.xml.querySelector(`div[n="${page}"]`)
    // console.log(div)
    const data = this.conv2json(div)
    // console.log({data})
    this.element = data
    /*
    let html = ''
    if (div) {
      //html = div.outerHTML
    }
    this.html = html
    */
  }
}
</script>
