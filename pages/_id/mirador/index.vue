<template>
  <div
    id="mirador"
    style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"
  ></div>
</template>

<script lang="ts">
import Mirador from 'mirador/dist/es/src/index'
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  components: {},
  layout: 'blank',
})
export default class FullTextSearch extends Vue {
  mounted() {
    const id = this.$route.params.id

    const windows = []

    const obj: any = {}
    obj.manifestId = `https://d1fasenpql7fi9.cloudfront.net/v1/manifest/${id}.json`
    obj.thumbnailNavigationPosition = 'far-right'
    windows.push(obj)

    Mirador.viewer({
      id: 'mirador',
      language: this.$i18n.locale,
      theme: {
        transitions:
          window.location.port === '4488' ? { create: () => 'none' } : {},
      },
      window: {
        highlightAllAnnotations: true,
        sideBarOpen: true,
        defaultSideBarPanel: 'annotations',
        allowClose: false,
        allowMaximize: false,
        allowFullscreen: true,
        hideWindowTitle: false,
      },
      workspaceControlPanel: {
        enabled: false,
      },
      windows,
    })
  }
}
</script>
