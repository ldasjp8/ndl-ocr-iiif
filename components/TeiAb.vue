<template>
  <span>
    <a style="color: inherit" @click="setFacs()">
    <template v-for="(e, key) in element.elements">
      <TeiElement :key="key" :element="e"></TeiElement>
    </template>
    </a> / 
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'


@Component({
  components: {},
})
export default class TeiAb extends Vue {
  @Prop({
  })
  element!: any

  get facs() {
    return this.$store.getters.getFacs
  }
  
  set facs(value) {
    this.$store.commit('setFacs', value)
  }

  setFacs() { 
    const attributes = this.element.attributes
    if(attributes){
      const facs = attributes.facs
      this.facs = facs.replace("#", "")
    }
  }
}
</script>
