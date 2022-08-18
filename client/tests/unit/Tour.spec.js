import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios'
import Tour from '@/views/Tour.vue';

var mockTours = [
  {
    id: "abcd",
    name: "ABCD",
    country: "US",
    score: 10
  },
  {
    id: "bcde",
    name: "BCDE",
    country: "US",
    score: 88
  },
  {
    id: "cdef",
    name: "CDEF",
    country: "US",
    score: 50
  }
];

// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.spyOn(axios, 'get').mockResolvedValue({data: mockTours});

describe('Tour.vue', () => {
  const wrapper = mount(Tour, {
    tour: mockTours[0]
  });
  it('has data', () => {
    expect(typeof Tour.data).toBe('function')
  });
  it('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("mocking the axios call to get tours should work", async () => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/tours')

    // Wait until the DOM updates.
    await flushPromises();

    // check response data validation
    expect(wrapper.vm.tours.length).toBe(3);
    expect(wrapper.vm.tours[0].id).toBe("abcd");
    expect(wrapper.vm.tours[0].name).toBe("ABCD");
    expect(wrapper.vm.tours[0].country).toBe("US");
    expect(wrapper.vm.tours[0].score).toBe(10);
  });
});
