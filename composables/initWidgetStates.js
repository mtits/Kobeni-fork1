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

  useState('widgetStyle', () => 'plain')
  useState('maskCvv', () => true)
  useState('requireCvv', () => true)
  useState('showCVVHint', () => false)
  useState('allowEmptyCvv', () => false)
  useState('validation', () => true)
  useState('showLabels', () => true)
  useState('showPlaceholders', () => true)
  useState('disableCardExpiryDateValidation', () => false)
  useState('payNowLabel', () => 'ლ(｀∀´ლ)  okane kudasai!!')
  useState('locale', () => 'en')
}
