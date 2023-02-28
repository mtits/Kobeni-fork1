import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - REST API',
})

export default defineEventHandler(async (event) => {
  //
  const accessToken = getHeader(event, 'accessToken')
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'preprod' : 'secure'
  const endPoint = `https://${subDomain}.prtpg.com/transactionServices/REST/v1/payments`

  try {
    const response = await axios({
      headers: { AuthToken: accessToken },
      method: 'post',
      url: endPoint,
      data: body.payload,
    })

    // log to server before returning
    logger.info(
      {
        requestData: body.payload,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - REST API operation successful`
    )

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: body.payload,
        responseData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - REST API operation failed`
    )

    return error.response.data
  }
})
