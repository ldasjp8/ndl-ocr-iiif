<template>
  <div>
    <div id="openseadragon" :style="`background-color: black; height: ${height}px; width: ${width};`"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'nuxt-property-decorator'
import OpenSeadragon from 'openseadragon'

@Component({
  components: {},
  
})
export default class Header extends Vue {
  
  async mounted() {
    const manifest = this.manifest

    const tileSources: any[] = []

    const mdata = await this.$axios.$get(manifest)
    const canvases = mdata.sequences[0].canvases
    // const pages: any[] = []
    
    for(const canvas of canvases){
      tileSources.push(canvas.images[0].resource.service["@id"] + "/info.json")
    }

    const viewer = OpenSeadragon({
      sequenceMode: true,
      id: 'openseadragon',
      tileSources,
      initialPage: Number(this.page) - 1
    })
    this.viewer = viewer

    const self = this
    viewer.addHandler('page', function(event: any) {
      self.$emit("page", event.page + 1);

    });
  }

  viewer: any = null

  @Prop({
    default: 1,
  })
  page!: number

  @Prop({
    default: 600,
  })
  height!: number

  @Prop({
    default: "100%",
  })
  width!: string

  @Prop({
    
  })
  manifest!: string

  @Prop({
    
  })
  xywh!: any
  
  @Watch('page')
  watchPage(value: number) {
    if(value){
      this.viewer.goToPage(Number(value) - 1)
    }
  }

  @Watch('xywh')
  watchXywh(value: any) {
    if(value){
      const w = this.viewer.world.getItemAt(0).source.width;
      const box = new OpenSeadragon.Rect(value.x / w, value.y / w, value.w / w, value.h / w);
      this.viewer.viewport.fitBounds(box);
    }
  }
}
</script>
