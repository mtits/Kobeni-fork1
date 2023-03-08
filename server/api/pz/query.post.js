import axios from 'axios'
import pino from 'pino'

// pino logger instance
const logger = pino({
  name: 'Kobeni - Query Transaction',
})

export default defineEventHandler(async (event) => {
  //
  const accessToken = getHeader(event, 'accessToken')
  const body = await readBody(event)

  // set the endpoint depending on the environment
  const subDomain = body.mode == 'Test' ? 'preprod' : 'secure'
  const endPoint = `https://${subDomain}.prtpg.com/transactionServices/REST/v1/payments/${body.id}`

  const data = `authentication.memberId=${body.memberId}&authentication.checksum=${body.checksum}&paymentType=IN&idType=PID`

  try {
    const response = await axios({
      headers: { AuthToken: accessToken },
      method: 'post',
      url: endPoint,
      data: data,
    })

    // log to server before returning
    logger.info(
      {
        requestData: data,
        responseData: response.data,
      },
      `(MODE: ${body.mode}) HTTP ${response.status} - Query operation successful`
    )

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    logger.error(
      {
        requestData: data,
        responseData: error.response.data,
      },
      `(MODE: ${body.mode}) HTTP ${error.response.status} - Query operation failed`
    )

    return error.response.data
  }
})
