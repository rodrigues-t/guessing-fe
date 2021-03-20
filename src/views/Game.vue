<template>
  <div>
    <b-row>
      <b-col cols="12" class="text-center">
        <b-card body-class="p-1">
          <div>{{ `${userName} is guessing about "${searchTerm}"` }}</div>
          <div class="step">
            {{
              `Movie ${currentMovieIndex + 1} out of 
              ${movies ? movies.length : ""}`               
            }}
            <b-icon v-if="isLoading" icon="arrow-clockwise" animation="spin"></b-icon>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <transition name="slide" mode="out-in">
      <div v-if="!isLoading" key="movie">
        <b-row>
          <b-col cols="12">
            <movie-guessing
              v-if="currentMovie"
              :movie="currentMovie"
              @user-guess-event="userGuessEvent"
            />
          </b-col>
        </b-row>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GameStore from "@/modules/game/store";
import MovieService from "@/modules/game/services/MovieService";
import ResultService from "@/modules/game/services/ResultService";
import Movie from "@/modules/game/models/Movie";
import MovieGuessing from "@/modules/game/components/MovieGuessing.vue";
import Rules from "@/modules/game/rules";

@Component({
  components: {
    MovieGuessing,
  },
})
export default class Game extends Vue {
  public isLoading = true;
  public currentMovieIndex = 0;
  public currentMovie: Movie | null = null;
  public guessingRates = new Map<string, number>();

  constructor() {
    super();
    if (this.movies === null) {
      this.$router.push("/");
    }
  }

  created(): void {
    if (this.movies !== null) {
      this.getCurrentMovie();
    }
  }

  get userName(): string | null {
    return GameStore.userName;
  }

  get searchTerm(): string | null {
    return GameStore.searchTerm;
  }

  get movies(): Array<Movie> {
    return GameStore.movies!;
  }

  async getCurrentMovie(): Promise<void> {
    try {
      this.isLoading = true;
      let response = await new MovieService().getMovieById(
        this.movies[this.currentMovieIndex].imdbID
      );
      this.currentMovie = response.data;
      GameStore.updateMovie(response.data);
    } catch (e) {
      // Modal...
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  postResult(): void {
    new ResultService().postResult({
      score: GameStore.score!,
      userName: GameStore.userName!,
      searchTerm: GameStore.searchTerm!,
    });
  }

  userGuessEvent(rate: number): void {
    const isCorrect = new Rules().isRateCorrected(
      rate,
      this.currentMovie!.imdbRating!
    );
    if (isCorrect) {
      this.displaySuccess("Great", "=) +1!!!");
    } else {
      this.displayDanger("Not this time", "=(");
    }
    this.guessingRates.set(this.currentMovie!.imdbID, rate);

    if (this.currentMovieIndex === this.movies.length - 1) {
      this.endGame();
    } else {
      this.currentMovieIndex++;
      this.getCurrentMovie();
    }
  }

  endGame(): void {
    const score = this.getFinalScore();
    GameStore.setScore(score);
    this.postResult();
    this.$router.push("/result");
  }

  getFinalScore(): number {
    return this.movies.reduce((score, movie): number => {
      const guessRate = this.guessingRates.get(movie.imdbID);
      return (
        score +
        (new Rules().isRateCorrected(guessRate!, movie.imdbRating!) ? 1 : 0)
      );
    }, 0);
  }

  displayToast(title: string, text: string, variant: string): void {
    this.$bvToast.toast(text, {
      title: title,
      variant: variant,
      autoHideDelay: 4000,
    });
  }

  displaySuccess(title: string, text: string): void {
    this.displayToast(title, text, "success");
  }

  displayDanger(title: string, text: string): void {
    this.displayToast(title, text, "danger");
  }
}
</script>
<style lang="scss"  scoped>
@import "../config/styles/slide.scss";

div.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
div.step {
  font-weight: bold;
}
</style>