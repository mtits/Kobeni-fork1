/**
 * Formats an array into a string with a specific separator/delimiter
 * @param {array} arrayMain
 * @param {String} separator
 * @returns String, e.g. "customer.givenName=john&customer.surname=wick&...""
 */
export const arrayToFormatter = (arrayMain, separator) => {
  let containerString = ''

  arrayMain.forEach((parameter, index, array) => {
    if (index < array.length - 1) {
      containerString += `${parameter}${separator}`
    } else {
      containerString += parameter
    }
  })

  return containerString
}

/**
 * Formats textarea string to URL data param string
 * @param {String} textAreaString
 * @returns String
 */
export const textAreaToURLParams = (textAreaString) => {
  return textAreaString.replace(/\n/g, '&')
}

/**
 * Appends the checkout ID to the clipboard
 * @param {String} data
 */
export const copyString = (data) => {
  navigator.clipboard.writeText(data)
}

/**
 * Appends an entire stringified JSON response object to the clipboard
 * @param {Object} jsonResponse
 */
export const copyEntireResponse = (jsonResponse) => {
  navigator.clipboard.writeText(JSON.stringify(jsonResponse))
}
