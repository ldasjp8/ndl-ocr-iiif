<template>
  <ul class="horizontal-list">
    <li v-for="(obj, index) in data" :key="index" class="item">
      <CardItem
        :key="'value_' + index"
        class="mt-2 mb-4"
        :horizontal="true"
        :item="obj"
        :width="width"
        :height="height"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import CardItem from '~/components/HorizontalCardItem.vue'

@Component({
  components: {
    CardItem,
  },
})
export default class Header extends Vue {
  @Prop({
    default: 240,
  })
  width!: number

  @Prop({
    default: 300,
  })
  height!: number

  @Prop({ default: [] })
  data!: any[]
}
</script>
<style>
.horizontal-list {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-left: 0 !important;
  padding-right: 0;
}

.item {
  /* 横スクロール用 */
  display: inline-block;

  /* 見た目調整 */
  margin-right: 16px;
  margin-left: 16px;
}
</style>
