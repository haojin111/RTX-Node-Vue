import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios'
import About from '@/views/About.vue';

const mockHotels = {
  outlets: {
    availability: {
      results: [
        { 
          property: {
            propertyCode: "abcd",
            name: "ABCD",
            location: {
              country: "US",
            },
            reviews: {
              summary: {
                score: 10
              }
            }
          }
        },
        { 
          property: {
            propertyCode: "CDEF",
            name: "CDEF",
            location: {
              country: "US",
            },
            reviews: {
              summary: {
                score: 30
              }
            }
          }
        },
        { 
          property: {
            propertyCode: "EFGH",
            name: "EFGH",
            location: {
              country: "US",
            },
            reviews: {
              summary: {
                score: 80
              }
            }
          }
        },
      ]
    }
  }
};

// Following lines tell Jest to mock any call to `axios.get`
// and to return `mockPostList` instead
jest.spyOn(axios, 'get').mockResolvedValue({data: mockHotels});

describe('About.vue', () => {
  const wrapper = mount(About);
  it('has data', () => {
    expect(typeof About.data).toBe('function')
  });
  it('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("mocking the axios call to get hotels should work", async () => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/api/fromSource')

    // Wait until the DOM updates.
    await flushPromises();

    // check response data validation
    expect(wrapper.vm.hotels.length).toBe(3);
    expect(wrapper.vm.hotels[0].property.propertyCode).toBe("abcd");
    expect(wrapper.vm.hotels[0].property.name).toBe("ABCD");
    expect(wrapper.vm.hotels[0].property.location.country).toBe("US");
    expect(wrapper.vm.hotels[0].property.reviews.summary.score).toBe(10);
  });
});
