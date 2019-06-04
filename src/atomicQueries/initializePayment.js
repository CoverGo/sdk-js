import { gql } from '../gql'

const initializePayment = gql`
  mutation initPayment($paymentInput: initializePaymentInput!) {
    initializePayment(input: $paymentInput) {
      errors,
      value {
        token
        url
      }
    }
  }
`

export { initializePayment }