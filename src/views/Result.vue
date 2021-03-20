<template>
  <b-row>
    <b-col cols="12" class="text-center">
      <b-card>
        <div>Success rate: {{ score }} out of {{ moviesCount }} guessess</div>
        <div class="percent">{{ successPercent }}%</div>
        <div>
          <b-button @click="startAgain" variant="dark">Start again</b-button>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GameStore from "@/modules/game/store";

@Component
export default class Result extends Vue {
  constructor() {
    super();
    if (this.score === null) {
      this.$router.push("/");
    }
  }

  get score(): number | null {
    return GameStore.score;
  }

  get moviesCount(): number {
    return GameStore.movies?.length ?? 0;
  }

  get successPercent(): number {
    if (this.moviesCount === 0) return 0;
    return (this.score ?? 0 / this.moviesCount) * 100;
  }

  startAgain(): void {
    this.$router.push("/");
    GameStore.reset();
  }
}
</script>
<style scoped>
div.percent {
  font-size: 60px;
}
</style>
