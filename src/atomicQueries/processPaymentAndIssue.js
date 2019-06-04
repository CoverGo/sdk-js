import { gql } from '../gql'

const processPaymentAndIssue = gql`
mutation processPaymentAndIssue($payment: paymentInput!){
  processPayment_2(input: $payment){
    status
    errors
  }
}`

export { processPaymentAndIssue }