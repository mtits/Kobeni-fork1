/**
 * init all PZ related vars
 */
export const useInitPaymentzStates = () => {
  useState('pzMode', () => 'Test')
  useState('partnerID', () => '')
  useState('memberID', () => '')
  useState('merchantUsername', () => '')
  useState('amount', () => '')
  useState('merchantTransactionId', () => {
    return generateTrxId('kbn', 6)
  })
  useState('merchantSecureKey', () => '')
}
