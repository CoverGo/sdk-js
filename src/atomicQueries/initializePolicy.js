import { gql } from '../gql'

const initializePolicy = gql`
mutation initializePolicy($policy: initializePolicyInput){
  initializePolicy(policy: $policy){
    status
    errors
    policyStatus{
      id
    }
  }
}`

export { initializePolicy }