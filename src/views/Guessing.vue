<template>
  <b-row>
    <b-col cols="12" md="4" offset-md="4">
      <start-form
        @start-game-event="startEvent"
      />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StartForm from "@/modules/game/components/StartForm.vue";
import GameStore from "@/modules/game/store";

@Component({
  components: {
    StartForm,
  },
})
export default class Guessing extends Vue {

  constructor() {
    super();
    GameStore.reset();
  }
  
  async startEvent(form: any): Promise<void> {
    try {
      await GameStore.getMovies(form.searchTerm);
      this.setUpGame(form.userName, form.searchTerm);
      this.$router.push('/game');
    } catch (e) {
      this.handleError(e);
    }
  }

  setUpGame(userName: string, searchTerm: string): void {
    GameStore.setUserName(userName);
    GameStore.setSearchTerm(searchTerm);
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
}
</script>

<style>
</style>