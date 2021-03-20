import { mount } from '@vue/test-utils'
import Records from '@/views/Records.vue'
import flushPromises from 'flush-promises';
import localVue from './setupVue';
import ResultService from '@/modules/game/services/ResultService';


describe('Records View Tests', () => {
    it('View rendered', async () => {
        jest.spyOn(ResultService.prototype, 'getResults')
            .mockImplementation(() => Promise.resolve({
                data: [
                    {
                        score: 1,
                        created_at: '2021-03-18T12:49:35.000000Z',
                        userName: 'Thiago',
                        searchTerm: 'terminator'
                    }
                ]
            }));

        const wrapper = mount(Records, { localVue })
        await flushPromises();
        const table = wrapper.find('table');
        expect(table.exists()).toBeTruthy();
    });
});