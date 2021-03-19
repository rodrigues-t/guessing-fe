<template>
  <div class="loading">
    <b-icon icon="circle-fill" animation="throb" font-scale="5"></b-icon>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
@Component
export default class PageLoad extends Vue {
}
</script>
<style scoped>
div.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
</style>