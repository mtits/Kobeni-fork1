import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Generate Auth Token',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  //
  logger.info(body, 'Returned Response')

  /**
   * append body as query parameters
   */
  await sendRedirect(
    event,
    `/paymentz/merchantRedirectURL?${new URLSearchParams(body).toString()}`,
    200
  )
})
