import { gql } from '../gql'

const initializeTransaction = gql`
  mutation initializeTransaction($initializeTransactionInput: initializeTransactionInput!){
    errors
    value {
      token
      transactionId
      url
    }
  }
`.withFieldErrorMapping()

export { initializeTransaction }