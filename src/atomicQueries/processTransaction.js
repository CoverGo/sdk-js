import { gql } from '../gql'

const processTransaction = gql`
  mutation processTransaction($transactionId: transactionId $processTransactionInput: processTransactionInput!){
    addFact(transactionId: $transactionId input: $processTransactionInput){
      errors
      status
      policyStatus {
        id
        status
      }
    }
  }
`.withFieldErrorMapping()

export { processTransaction }