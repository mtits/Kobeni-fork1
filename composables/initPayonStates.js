/**
 * init all ACI related vars
 */
export const useInitPayonStates = () => {
  useState('referenceTransaction', () => '')
  useState('registrationId', () => '')
  useState('mode', () => 'Test')
  useState(
    'accessToken',
    () => 'OGE4Mjk0MTc0YjdlY2IyODAxNGI5Njk5MjIwMDE1Y2N8c3k2S0pzVDg='
  )
  useState('entityId', () => '8a8294174b7ecb28014b9699220015ca')
  useState('cnpModal', () => false)
}
