import DOMPurify from 'dompurify'
import { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('sanitize-html', {
    beforeMount(el: HTMLElement, binding: DirectiveBinding<string>) {
      el.innerHTML = DOMPurify.sanitize(binding.value)
    },
    beforeUpdate(el: HTMLElement, binding: DirectiveBinding<string>) {
      el.innerHTML = DOMPurify.sanitize(binding.value)
    },
  })
})
