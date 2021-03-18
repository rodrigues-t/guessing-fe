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

@Component({
    components: {
        StartForm
    }
})
export default class Guessing extends Vue {  

    private isLoadingMovies = false;

    startEvent(form: unknown): void {
        console.log('start!', form);
        //this.isLoadingMovies = true;
    }
}
</script>

<style>
</style>