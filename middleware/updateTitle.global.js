export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(`Routing to page: ${to.name}`)
  // update the page title dynamically
  useHead({
    title: to.meta.pageTitle,
  })
})
