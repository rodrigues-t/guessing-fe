<template>
  <b-card border-variant="dark">
    <ValidationObserver ref="formObserver">
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Movie search term"
          label-for="input-term"
        >
          <ValidationProvider
            name="Search term"
            rules="required|max:64"
            v-slot="v"
          >
            <b-form-input
              id="input-term"
              v-model="searchTerm"
              placeholder="Enter search term"
              required
              :class="
                (v.errors.length > 0 ? 'is-invalid ' : '') +
                (v.valid ? 'is-valid' : '')
              "
            />
            <b-form-invalid-feedback>
              {{ v.errors[0] }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="User name"
          label-for="input-username"
        >
          <ValidationProvider
            name="User name"
            rules="required|min:2|max:32"
            v-slot="v"
          >
            <b-form-input
              id="input-username"
              v-model="userName"
              placeholder="Enter your name"
              required
              :class="
                (v.errors.length > 0 ? 'is-invalid ' : '') +
                (v.valid ? 'is-valid' : '')
              "
            />
            <b-form-invalid-feedback>
              {{ v.errors[0] }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-button variant="dark" block @click="start" :disabled="moviesLoading">
          <b-icon
            icon="circle-fill"
            animation="throb"
            v-show="moviesLoading"
          ></b-icon>
          {{ startText }}
        </b-button>
      </b-form>
    </ValidationObserver>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required, min, max } from "vee-validate/dist/rules";
import GameStore from "@/modules/game/store";

extend("required", { ...required, message: "{_field_} is required" });
extend("min", {
  ...min,
  message: "{_field_} must be at least {length} characters",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class StartForm extends Vue {
  private searchTerm: string;
  private userName: string;

  constructor() {
    super();
    this.searchTerm = "";
    this.userName = "";
  }
  
  get moviesLoading(): boolean {
      return GameStore.moviesLoading;
  }

  get startText(): string {
    return this.moviesLoading ? " " : "Start";
  }

  @Emit("start-game-event")
  startGame(searchTerm: string, userName: string): unknown {
    return { searchTerm, userName };
  }

  async start(): Promise<void> {
    const isValid = await this.$refs.formObserver.validate();
    if (isValid) {
      this.startGame(this.searchTerm, this.userName);
    } else {
      this.$bvToast.toast("Please, enter valid information.", {
        title: "Invalid fields",
        variant: "danger",
        autoHideDelay: 4000,
      });
    }
  }

  $refs!: {
    formObserver: InstanceType<typeof ValidationObserver>;
  };
}
</script>