<template>
  <component
    :is="getComponent(element)" :element="element">
    <template v-if="element.text">
      {{ element.text }}
    </template>
    <template v-else>
      <template v-for="(e, key) in element.elements">
        <TeiElement :key="key" :element="e"></TeiElement>
      </template>
    </template>
  </component>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component({
  components: {},
  name: "TeiElement"
})
export default class TeiElement extends Vue {
  @Prop({
  })
  element!: any

  getComponent(element: any) {
    if (element.name === 'lb') {
      return 'br'
    } if (element.name === 'ab') {
      return 'tei-ab'
    } else {
      return 'span'
    }
  }
}
</script>
