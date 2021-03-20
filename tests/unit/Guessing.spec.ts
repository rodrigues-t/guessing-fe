import { mount } from '@vue/test-utils'
import Guessing from '@/views/Guessing.vue'
import StartForm from '@/modules/game/components/StartForm.vue';
import flushPromises from 'flush-promises';
import localVue from './setupVue';


describe('Guessing View Tests', () => {
  it('StartForm rendered', () => {
    const wrapper = mount(Guessing, { localVue })
    const start = wrapper.findComponent(StartForm);
    expect(start.exists()).toBeTruthy();
  })

  it("start event not called", async () => {
    let startEvent = jest.fn();
    const wrapper = mount(Guessing, {
      methods: {
        startEvent
      },
      localVue
    })
    const startButton = wrapper.find('button');
    startButton.trigger('click');
    await flushPromises();
    expect(startEvent).not.toBeCalled();
  })

  it("start event called", async () => {
    let startEvent = jest.fn();
    const wrapper = mount(Guessing, {
      methods: {
        startEvent
      },
      localVue
    })
    
    const startButton = wrapper.find('button');
    const textInputTerm = wrapper.find('input[type="text"]#input-term');
    const textInputUser = wrapper.find('input[type="text"]#input-username');
    
    await textInputTerm.setValue('terminator')
    await textInputUser.setValue('thiago')
    await startButton.trigger('click');
    await flushPromises();

    expect(startEvent).toBeCalled();
  })
})
