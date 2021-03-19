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
<script>
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

  get score() {
    return GameStore.score;
  }

  get moviesCount() {
    return GameStore.movies?.length ?? 0;
  }

  get successPercent() {
    return (this.score / this.moviesCount) * 100;
  }

  startAgain() {
      this.$router.push('/');
      GameStore.reset();
  }
}
</script>
<style scoped>
div.percent {
  font-size: 60px;
}
</style>
