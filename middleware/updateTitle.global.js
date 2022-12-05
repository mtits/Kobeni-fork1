export default defineNuxtRouteMiddleware((to, from) => {
  // update the page title dynamically
  useHead({
    title: to.meta.pageTitle,
  })
})
