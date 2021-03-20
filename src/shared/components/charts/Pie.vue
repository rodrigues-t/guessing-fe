<template>
  <canvas id="pie" />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-types*/
import { Component, Prop, Vue } from "vue-property-decorator";
import Chart from "chart.js";

@Component
export default class Pie extends Vue {
  @Prop({ default: [] }) readonly labels!: Array<string>;
  @Prop({ default: [] }) readonly colors!: Array<string>;
  @Prop({ default: [] }) readonly data!: Array<number>;
  @Prop({
    default: () => {
      return Chart.defaults.pie;
    },
  })
  readonly options: object | undefined;

  mounted(): void {
    this.createChart({
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
      labels: this.labels,
    });
  }

  createChart(chartData: object): void {
    const canvas = document.getElementById("pie") as HTMLCanvasElement;
    const options = {
      type: "pie",
      data: chartData,
      options: this.options,
      responsive: true,
      maintainAspectRatio: false,
    };
    new Chart(canvas, options);
  }
}
</script>