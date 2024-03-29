import { nanoid } from 'nanoid'
import md5 from 'crypto-js/md5'

/**
 * Formats an array into a string with a specific separator/delimiter
 * @param {array} arrayMain
 * @param {string} separator
 * @returns {string} e.g. "customer.givenName=john&customer.surname=wick&...""
 */
export const arrayToFormatter = (arrayMain, separator) => {
  return arrayMain.join(separator)
}

/**
 * Formats textarea string to URL data param string
 * @param {string} textAreaString
 * @returns {string}
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
  navigator.clipboard.writeText(JSON.stringify(jsonResponse, null, 2))
}

/**
 * brand list go brrrr...
 * @returns {array} List of all support brands for copyandpay
 */
export const getBrandsList = () => {
  return {
    cards: [
      'AFFIRM',
      'AIRPLUS',
      'ALIA',
      'ALIADEBIT',
      'AMEX',
      'APPLEPAY',
      'ARGENCARD',
      'AXP',
      'BCMC',
      'CABAL',
      'CABALDEBIT',
      'CARNET',
      'CARTEBANCAIRE',
      'CARTEBLEUE',
      'CASHLINKMALTA',
      'CENCOSUD',
      'CLICK_TO_PAY',
      'DANKORT',
      'DINERS',
      'DISCOVER',
      'ELO',
      'FACILYPAY_3X',
      'FACILYPAY_3XSANSFRAIS',
      'FACILYPAY_4X',
      'FACILYPAY_4XSANSFRAIS',
      'GOOGLEPAY',
      'HEB_GIFT_CARD',
      'HIPERCARD',
      'JCB',
      'MADA',
      'MAESTRO',
      'MASTER',
      'MASTERDEBIT',
      'MEEZA',
      'MERCADOLIVRE',
      'NARANJA',
      'NATIVA',
      'SCHEELS',
      'SERVIRED',
      'SISTEMACLAVE',
      'STAPLES',
      'TARJETASHOPPING',
      'TCARD',
      'TCARDDEBIT',
      'UNIONPAY',
      'UNIONPAY_SMS',
      'VISA',
      'VISADEBIT',
      'VISAELECTRON',
      'VPAY',
    ],
    virtual: [
      'ACI_PAYAFTER',
      'ACI_WALLETHUB',
      'AFTERPAY',
      'AFTERPAY_PACIFIC',
      'ALIPAY',
      'APOSTAR',
      'ASTROPAY_STREAMLINE_CASH',
      'ASTROPAY_STREAMLINE_OT',
      'BALOTO',
      'BANCOLOMBIA',
      'BANCONTACT_LINK',
      'BANCONTACT_QR',
      'BBVA_CONTINENTAL',
      'BCP',
      'BEVALIDA',
      'BLIK',
      'BOTON_PSE',
      'CAJA_AREQUIPA',
      'CAJA_CUSCO',
      'CAJA_HUANCAYO',
      'CAJA_ICA',
      'CAJA_PIURA',
      'CAJA_TACNA',
      'CAJA_TRUJILLO',
      'CASHU',
      'CHÈQUE-VACANCES',
      'CHINAUNIONPAY',
      'CLIQ',
      'CREDIT_CLICK',
      'DAOPAY',
      'DIMONEX',
      'EFECTY',
      'ENTERPAY',
      'GANA',
      'HYPERCASH',
      'IKANOOI_SE',
      'INICIS',
      'INTERBANK',
      'KLARNA_PAYMENTS_BILLPAY',
      'KLARNA_PAYMENTS_ONE',
      'KLARNA_PAYMENTS_PAYLATER',
      'KLARNA_PAYMENTS_PAYNOW',
      'KLARNA_PAYMENTS_SLICEIT',
      'MASTERPASS',
      'MBWAY',
      'MEEZA_LINK',
      'MEEZA_QR',
      'MONEYBOOKERS',
      'MONEYSAFE',
      'MSTART',
      'NEQUI',
      'ONECARD',
      'ONEY',
      'PAGOSNET',
      'PAGO_EFECTIVO',
      'PAGO_FACIL',
      'PAYBOX',
      'PAYDIREKT',
      'PAYNET',
      'PAYOLUTION_ELV',
      'PAYOLUTION_INS',
      'PAYOLUTION_INVOICE',
      'PAYPAL',
      'PAYPAL_CONTINUE',
      'PAYSAFECARD',
      'PAYTRAIL',
      'PAYTRAIL_VA',
      'PF_KARTE_DIRECT',
      'PIX',
      'POSTPAY',
      'PREPAYMENT_VRP',
      'PRZELEWY',
      'PUNTO_RED',
      'QIWI',
      'RAPI_PAGO',
      'RATENKAUF',
      'RED_SERVI',
      'ROCKETFUEL',
      'SADAD_VA',
      'SCOTIABANK',
      'SENCILLITO',
      'SEZZLE',
      'SHETAB',
      'SIBS_MULTIBANCO',
      'SOFINCO',
      'SOFINCOSANSFRAIS',
      'SPOTII',
      'STC_PAY',
      'SU_RED',
      'SU_SUERTE',
      'TABBY',
      'TAMARA',
      'TENPAY',
      'TRUSTLY',
      'TWINT',
      'VALU',
      'VIPPS',
      'WECHAT_PAY',
      'WESTERN_UNION',
      'YANDEX',
      'YANDEX_CHECKOUT',
      'ZOODPAY',
    ],
    bank: [
      'BITCOIN',
      'BOLETO',
      'DIRECTDEBIT_SEPA',
      'ENTERCASH',
      'EPS',
      'GIROPAY',
      'IDEAL',
      'INTERAC_ONLINE',
      'OXXO',
      'POLI',
      'PREPAYMENT',
      'SADAD',
      'SEPA',
      'SOFORTUEBERWEISUNG',
      'TRUSTPAY_VA',
    ],
  }
}

/**
 * locale list go brrrr....
 * @returns {array} array list of all locales
 */
export const getLocaleList = () => {
  return [
    { text: 'Arabic', value: 'ar' },
    { text: 'French', value: 'be' },
    { text: 'Bulgarian', value: 'bg' },
    { text: 'Catalan', value: 'ca' },
    { text: 'Simplified Chinese', value: 'cn' },
    { text: 'Czech', value: 'cz' },
    { text: 'Danish', value: 'da' },
    { text: 'German', value: 'de' },
    { text: 'Greek', value: 'el' },
    { text: 'English', value: 'en' },
    { text: 'Spanish', value: 'es' },
    { text: 'Estonian', value: 'et' },
    { text: 'Basque', value: 'eu' },
    { text: 'Finnish', value: 'fi' },
    { text: 'French', value: 'fr' },
    { text: 'Greek', value: 'gr' },
    { text: 'Croatian', value: 'hr' },
    { text: 'Hungarian', value: 'hu' },
    { text: 'Indonesian', value: 'id' },
    { text: 'Italian', value: 'it' },
    { text: 'Japanese', value: 'ja' },
    { text: 'Korean', value: 'ko' },
    { text: 'Lithuanian', value: 'lt' },
    { text: 'Latvian', value: 'lv' },
    { text: 'Dutch', value: 'nl' },
    { text: 'Norwegian', value: 'no' },
    { text: 'Polish', value: 'pl' },
    { text: 'Portugese', value: 'pt' },
    { text: 'Romanian', value: 'ro' },
    { text: 'Russian', value: 'ru' },
    { text: 'Slovak', value: 'sk' },
    { text: 'Slovene', value: 'sl' },
    { text: 'Swedish', value: 'sv' },
    { text: 'Turkish', value: 'tr' },
    { text: 'Traditional Chinese', value: 'zh' },
  ]
}

/**
 * using nanoid, generate a string that can be used as a transaction id
 * @param {string} prefix
 * @param {number} length
 * @returns {string} as transaction id, e.g. kbn-rAndOm
 */
export const generateTrxId = (prefix, length) => {
  return `${prefix}-${nanoid(length)}`
}

/**
 * Uses md5 module from the crypto-js package, returns md5 hash as value for the checksum
 * @param {string} dataString
 * @returns {string} Hashed value of the required fields
 */
export const generateHash = (dataString) => {
  return md5(dataString).toString()
}

/**
 * Helper function to format the URL endpoints
 * @param {string} envMode
 * @param {string} integrationName COPYANDPAY, GET_RESULTS, S2S, BACKOFFICE, QUERY, RECURRING
 * @param {string} referenceId Required for some endpoints
 * @param {string} baseURL Defaults to 'oppwa.com', can be modified if API is hosted somewhere else
 * @returns {string} Formatted endpoint based on the env and integration
 */
export const oppwaEndPointFormatter = (
  envMode,
  integrationName,
  referenceId = null,
  baseURL = 'oppwa.com'
) => {
  const subDomain = envMode == 'Test' ? 'eu-test' : 'eu-prod'

  // validate if referenceId is empty
  if (referenceId == '') {
    throw new Error('Missing Reference/Checkout/Registration ID')
  } else {
    // ze formatting
    switch (integrationName) {
      case 'COPYANDPAY':
        return `https://${subDomain}.${baseURL}/v1/checkouts`

      case 'S2S':
        return `https://${subDomain}.${baseURL}/v1/payments`

      case 'GET_RESULTS':
        return `https://${subDomain}.${baseURL}/v1/checkouts/${referenceId}/payment`

      case 'BACKOFFICE':
        return `https://${subDomain}.${baseURL}/v1/payments/${referenceId}`

      case 'QUERY':
        return referenceId != null
          ? `https://${subDomain}.${baseURL}/v1/query/${referenceId}`
          : `https://${subDomain}.${baseURL}/v1/query`

      case 'RECURRING':
        return `https://${subDomain}.${baseURL}/v1/registrations/${referenceId}/payments`

      case 'LIST':
        return `https://${subDomain}.${baseURL}/v3/query`

      default:
        throw new Error('Invalid Integration Name', {
          cause: `Provided integration name ${integrationName} is not defined.`,
        })
    }
  }
}

/**
 *
 * @param {Number} evalNum
 * @returns the number with prefixed zero if it's only 1 digit
 */
export const expectoPrefixTheZeroNum = (evalNum) => {
  return evalNum < 10 ? `0${evalNum}` : evalNum
}
