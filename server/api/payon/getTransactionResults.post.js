import axios from 'axios'

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

    console.log({ transactionResult: response.data })

    return response.data
  } catch (error) {
    console.log({
      requestData: {
        mode: body.mode,
        accessToken: body.accessToken,
        entityId: body.entityId,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
