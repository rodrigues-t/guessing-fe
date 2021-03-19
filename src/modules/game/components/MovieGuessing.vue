<template>
  <div class="d-flex flex-column text-center mt-2">
    <span class="title mb-2">{{ movie.title }}</span>
    <b-row>
      <b-col cols="12" md="4" offset-md="4"  xl="2" offset-xl="5">
        <b-img-lazy rounded fluid :src="movie.poster" />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="12" md="4" offset-md="4" xl="2" offset-xl="5">
        <ValidationObserver ref="formObserver">
          <b-form>
            <label class="mr-sm-2" for="input-guess">IMDB score guess</label>
            <ValidationProvider
              name="Guess"
              rules="required|between:0,10"
              v-slot="v"
            >
              <b-form-input
                id="input-guess"
                class="mb-2 mr-sm-2 mb-sm-0"
                type="number"
                max="10"
                required
                :class="
                  (v.errors.length > 0 ? 'is-invalid ' : '') +
                  (v.valid ? 'is-valid' : '')
                "
                v-model.number="rate"
              />
              <b-form-invalid-feedback>
                {{ v.errors[0] }}
              </b-form-invalid-feedback>
            </ValidationProvider>
            <b-button block variant="dark" class="mt-1" @click="guessClick">Guess</b-button>
          </b-form>
        </ValidationObserver>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
import Movie from "../models/Movie";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { required, between } from "vee-validate/dist/rules";

extend("required", { ...required, message: "{_field_} is required" });
extend("between", {
  ...between,
  message: "{_field_} must be between {min} and {max}",
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class MovieGuessing extends Vue {
  @Prop({ required: true }) public movie!: Movie;

  public rate = 5;

  @Emit('user-guess-event')
  userGuess(): number {
    return this.rate;
  }
  async guessClick(): Promise<void> {
    const isValid = await this.$refs.formObserver.validate();
    if (isValid) {
      this.userGuess();
    } else {
      this.$bvToast.toast("Please, give your guess.", {
        title: "Invalid guess",
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
<style scoped>
.title {
  font-weight: bold;
}
</style>