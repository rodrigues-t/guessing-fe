<template>
  <div>
    <Nav></Nav>
    <b-container fluid class="pt-3">
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/shared/components/Nav.vue";
@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {
  
}
</script>
