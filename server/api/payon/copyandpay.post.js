import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - CopyAndPay',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'eu-test' : 'eu-prod'
  const endPoint = `https://${subDomain}.oppwa.com/v1/checkouts`

  try {
    const response = await axios({
      method: 'post',
      url: endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      data: body.dataParameters,
    })

    // log to server
    logger.info(
      {
        requestData: body.dataParameters,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) Checkout ID generated successfully`
    )

    return response.data
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: body.dataParameters,
        responseErrorData: error.response.data,
      },
      `(MODE: ${body.mode}) Failed to generate checkout ID`
    )

    return error.response.data
  }
})
