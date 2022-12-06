import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let endPoint = ''

  // set the endpoint depending on the environment
  if (body.mode == 'Test') {
    endPoint = `https://eu-test.oppwa.com/v1/registrations/${body.registrationId}/payments`
  } else {
    endPoint = `https://eu-prod.oppwa.com/v1/registrations/${body.registrationId}/payments`
  }

  try {
    const response = await axios({
      method: 'post',
      url: endPoint,
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
      data: body.dataParameters,
    })

    // log to server before returning
    console.log({
      requestData: {
        mode: body.mode,
        accessToken: body.accessToken,
        data: body.dataParameters,
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
        accessToken: body.accessToken,
        data: body.dataParameters,
      },
      responseErrorData: error.response.data,
    })

    return error.response.data
  }
})
