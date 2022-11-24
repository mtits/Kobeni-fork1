/**
 * Formats an array into a string with a specific separator/delimiter
 * @param {Array} array
 * @param {String} separator
 * @returns String
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
