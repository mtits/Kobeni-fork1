import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  // set the endpoint depending on the environment
  if (body.mode == 'Test') {
    endPoint = `https://eu-test.oppwa.com/v1/checkouts/${body.checkoutID}/payment`
  } else {
    endPoint = `https://eu-prod.oppwa.com/v1/checkouts/${body.checkoutID}/payment`
  }

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
