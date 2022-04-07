<template>
  <v-card no-body :style="`width: ${width}px;`" flat outlined>
    <nuxt-link
      :to="
        localePath({
          name: 'id',
          params: { id: item.id },
        })
      "
    >
      <v-img
        :src="`https://www.dl.ndl.go.jp/api/iiif/${item.id}/R0000001/full/256,/0/default.jpg`"
        contain
        style="height: 150px"
        width="100%"
        class="grey lighten-2"
      ></v-img>
    </nuxt-link>
    <div
      class="pa-4"
      :style="`width: ${width}px; height: ${height}px; overflow-y: auto;`"
    >
      <nuxt-link
        :to="
          localePath({
            name: 'id',
            params: { id: item.id },
          })
        "
      >
        <h4>{{ item.title }} {{ item.volume }}</h4>
      </nuxt-link>

      <div class="mt-2">
        {{ item.responsibility }} {{ item.publisher }} {{ item.publishyear }}
      </div>
    </div>

    <v-card-actions class="pa-0">
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class CardItem extends Vue {
  @Prop({ required: true })
  item!: any

  @Prop({
    default: 300,
  })
  width!: number

  @Prop({
    default: 300,
  })
  height!: number
}
</script>
