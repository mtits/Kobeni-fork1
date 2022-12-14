import { nanoid } from 'nanoid'
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
    return `kbn-${nanoid(6)}`
  })
  useState('merchantSecureKey', () => '')
}
