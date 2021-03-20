import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

export default localVue;