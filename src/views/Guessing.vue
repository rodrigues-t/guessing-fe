<template>
  <b-row>
    <b-col cols="12" md="4" offset-md="4">
      <start-form
        :disableStart="isLoadingMovies"
        @start-game-event="startEvent"
      />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StartForm from "@/modules/game/components/StartForm.vue";
import MovieService from "@/modules/game/services/MovieService";
import Movie from "@/modules/game/models/Movie";

@Component({
  components: {
    StartForm,
  },
})
export default class Guessing extends Vue {
  private isLoadingMovies = false;

  async getMovies(searchTerm: string): Promise<Array<Movie>> {
    const response = await new MovieService().getMoviesBySearchTerm(searchTerm);
    return response.data;
  }

  handleError(response: any): void {
    let variant = response.status == 422 ? "warning" : "danger";
    let text =
      response.status == 422
        ? "Please, be more specific in your search term."
        : response.status == 404
        ? "No results found. Please, type other term."
        : response.data.error;
    this.$bvToast.toast(text, {
      title: "Something wrong happened.",
      variant,
      autoHideDelay: 5000,
    });
  }

  async startEvent(form: any): Promise<void> {
    this.isLoadingMovies = true;
    try {
      const movies: Array<Movie> = await this.getMovies(form.searchTerm);
      console.log(movies);
    } catch (e) {
      this.handleError(e.response);
    } finally {
      this.isLoadingMovies = false;
    }
  }
}
</script>

<style>
</style>