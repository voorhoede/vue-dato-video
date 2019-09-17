
import { shallowMount } from '@vue/test-utils'
import VueDatoVideo from './vue-dato-video.vue'

test('Renders', () => {
  const wrapper = shallowMount(VueDatoVideo)
  expect(wrapper.exists()).toBe(true)
})
