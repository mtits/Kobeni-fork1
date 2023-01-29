export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log({
    postedDataParams: body,
  })

  /**
   * append body as query parameters
   */
  await sendRedirect(
    event,
    `/paymentz/merchantRedirectURL?${new URLSearchParams(body).toString()}`,
    200
  )
})
