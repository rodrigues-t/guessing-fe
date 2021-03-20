<template>
  <div v-if="hasData">
    <Pie :data="data" :labels="labels" :colors="colors" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Pie from "@/shared/components/charts/Pie.vue";
import { getColors } from "@/shared/utils/colors";
import GameResult from "@/modules/game/models/GameResult";

@Component({
  components: {
    Pie,
  },
})
export default class ResultsChart extends Vue {
  @Prop({ required: true }) readonly results!: Array<GameResult>;
  public labels = new Array<string>();
  public data = new Array<number>();
  public colors = new Array<string>();

  mounted(): void {
    this.setData();
    this.setColors();
  }

  get hasData(): boolean {
    return (
      this.data.length > 0 && this.labels.length > 0 && this.colors.length > 0
    );
  }

  setData(): void {
    const uniqueValues = new Set<number>(this.results.map((r) => r.score));
    Array.from(uniqueValues).forEach((uv) => {
      const quant = this.results
        .filter((r) => r.score === uv)
        .reduce((acc: number, current: GameResult) => acc + 1, 0);
      this.labels.push(uv.toString() + " hits");
      this.data.push(quant);
    });
  }

  setColors(): void {
    this.colors = getColors(this.data.length);
  }
}
</script>