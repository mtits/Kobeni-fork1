import axios from 'axios'

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
    console.log({
      requestData: {
        mode: body.mode,
        token: accessToken,
        data: body.payload,
      },
      responseData: response.data,
    })

    return response.data

    // error
  } catch (error) {
    // log to server before returning
    console.log({
      requestData: {
        mode: body.mode,
        token: accessToken,
        data: body.payload,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
