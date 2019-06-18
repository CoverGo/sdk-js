import { gql } from '../gql'

const initializeTransaction = gql`
  mutation initializeTransaction($initializeTransactionInput: initializeTransactionInput!){
    addFact(initializeTransactionInput: $initializeTransactionInput){
      errors
      value {
        token
        transactionid
        url
      }
    }
  }
`.withFieldErrorMapping()

export { initializeTransaction }