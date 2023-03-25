/**
 * init all widget related vars
 */
export const useInitWidgetStates = () => {
  // set default states of the widget
  useState('autoLaunchWidget', () => true)

  //
  useState('selectedCardBrands', () => {
    return ['VISA', 'MASTER']
  })

  useState('selectedVirtualBrands', () => {
    return []
  })

  useState('selectedBankBrands', () => {
    return []
  })

  // default selected
  useState('selectedBrands', () => {
    return ['VISA', 'MASTER']
  })

  // toggles
  useState('widgetStyle', () => 'plain')
  useState('maskCvv', () => true)
  useState('requireCvv', () => true)
  useState('showCVVHint', () => true)
  useState('allowEmptyCvv', () => false)
  useState('validation', () => true)
  useState('showLabels', () => true)
  useState('showPlaceholders', () => true)
  useState('disableCardExpiryDateValidation', () => false)
  useState('paypalBNPL', () => false)
  useState('paypalBNPLBuyerCountry', () => 'US')

  // widget labels
  useState('payNowLabel', () => 'ლ(｀∀´ლ)  okane kudasai!!')
  useState('labelBrand', () => 'Brand(s)')
  useState('cardNumber', () => 'CC / DC Number')
  useState('expiryDate', () => 'Expiration')
  useState('cardHolder', () => 'Name on Card')
  useState('cvv', () => 'Magic Numbers')

  useState('locale', () => 'en')
}
