import { gql } from '../gql'

const validatePolicy = gql`
  query validatePolicy ($policyId: String!) {
    validatePolicy_2(policyId: $policyId) {
      status
      errors
      errors_2 {
        code
        message
      }
    }
  }
`

export { validatePolicy }