import { gql } from '../gql'

const initializePolicy = gql`
mutation initializePolicy($initializePolicyInput: initializePolicyInput){
  initializePolicy(policy: $initializePolicyInput){
    status
    errors
    policyStatus{
      id
    }
  }
}`

export { initializePolicy }