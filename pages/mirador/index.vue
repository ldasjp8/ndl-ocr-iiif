<template>
  <div
    id="mirador"
    style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"
  ></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
const Mirador = require('mirador/dist/es/src/index')
@Component({
  components: {},
  layout: 'blank',
})
export default class FullTextSearch extends Vue {
  mounted() {
    const manifest = this.$route.query.manifest

    const windows = []

    const obj: any = {}
    obj.manifestId = manifest
    obj.thumbnailNavigationPosition = 'far-right'
    windows.push(obj)

    Mirador.default.viewer({
      id: 'mirador',
      language: (this as any).$i18n.locale,
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
