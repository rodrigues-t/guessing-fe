<template>
  <b-row>
    <b-col cols="12" md="4" offset-md="4">
      <start-form :disableStart="isLoadingMovies" @start-game-event="startEvent" />
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
        StartForm
    }
})
export default class Guessing extends Vue {  

    private isLoadingMovies = false;

    async getMovies(searchTerm: string): Promise<Array<Movie>> {
        const response = await new MovieService().getMoviesBySearchTerm(searchTerm);
        return response.data;

    }

    async startEvent(form: any): Promise<void> {
        this.isLoadingMovies = true;
        try {
            const movies: Array<Movie> =  await this.getMovies(form.searchTerm);
            console.log(movies);
        } catch(e) {
            console.log(e);
        } finally {
            this.isLoadingMovies = false;
        }
    }
}
</script>

<style>
</style>