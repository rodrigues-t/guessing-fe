<template>
  <div>
    <page-load v-if="isLoading" />
    <div v-else>
      <!-- Chart -->
      <b-row v-if="containsResult">
        <b-col cols="12" lg="4" offset-lg="4" class="text-center">
          <span>Top 10 chart</span>
          <results-chart :results="topResults" />
        </b-col>
      </b-row>
      <!-- Table -->
      <b-row v-if="results">
        <b-col cols="12" class="text-center">
          <b-card>
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
    <b-modal
      id="modalError"
      title="Something wrong heppened"
      v-model="showModalError"
      @ok="closeModalError"
    >
      <p>Your result could not be save. Please try play again. =(</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import GameResult from "@/modules/game/models/GameResult";
import ResultService from "@/modules/game/services/ResultService";
import PageLoad from "@/modules/game/components/PageLoad.vue";
import { Vue, Component } from "vue-property-decorator";
import ResultsChart from "@/modules/game/components/charts/ResultsChart.vue";


@Component({
  components: {
    PageLoad,
    ResultsChart,
  },
})
export default class Records extends Vue {
  public results: Array<GameResult> | null = null;
  public isLoading = true;
  public showModalError = false;
  public sortBy = "score";
  public sortDesc = true;
  
  public fields = [
    { key: "userName", sortable: true },
    { key: "searchTerm", sortable: true },
    { key: "created_at", sortable: true },
    { key: "score", sortable: true },
  ];

  get containsResult(): boolean {
    if(!this.results) return false;
    return this.results.length > 0;
  }

  get topResults(): Array<GameResult> | null{
    if(this.results === null) return null;
    return this.results.slice(0, 10);
  }

  created(): void {
    this.getResults();
  }

  closeModalError(): void {
    this.showModalError = false;
    this.getResults();
  }

  async getResults(): Promise<void> {
    try {
      this.isLoading = true;
      const response = await new ResultService().getResults();
      this.results = response.data;
    } catch (e) {
      this.showModalError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
