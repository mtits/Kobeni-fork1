import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Get Transaction Results',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'eu-test' : 'eu-prod'
  const endPoint = `https://${subDomain}.oppwa.com/v1/checkouts/${body.checkoutID}/payment`

  try {
    const response = await axios({
      method: 'get',
      url: endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      params: {
        entityId: body.entityId,
      },
    })

    // log to server before returning
    logger.info(
      {
        resource: body.checkoutID,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) Query operation successful`
    )

    return response.data
  } catch (error) {
    logger.error(
      error.response.data,
      `(MODE: ${body.mode}) Query operation failed`
    )

    return error.response.data
  }
})
