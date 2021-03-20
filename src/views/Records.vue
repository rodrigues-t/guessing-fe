<template>
  <div>
    <page-load v-if="isLoading" />
    <b-row v-else>
      <b-col cols="12" class="text-center">
        <b-card v-if="results">
          <b-table
            id="results-table"
            striped
            hover
            :items="results"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            show-empty
            :empty-text="'No results yet.'"
          >
            <template #empty="scope">
              <h5>{{ scope.emptyText }}</h5>
            </template>
            <template #cell(created_at)="data">
              {{ new Date(data.value).toDateString() }}
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import GameResult from "@/modules/game/models/GameResult";
import ResultService from "@/modules/game/services/ResultService";
import PageLoad from "@/modules/game/components/PageLoad.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    PageLoad,
  },
})
export default class Records extends Vue {
  public results: Array<GameResult> | null = null;
  public isLoading = true;
  public sortBy = "score";
  public sortDesc = true;
  
  public fields = [
    { key: "userName", sortable: true },
    { key: "searchTerm", sortable: true },
    { key: "created_at", sortable: true },
    { key: "score", sortable: true },
  ];

  created(): void {
    this.getResults();
  }
    
  async getResults(): Promise<void> {
    try {
      this.isLoading = true;
      const response = await new ResultService().getResults();
      this.results = response.data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
