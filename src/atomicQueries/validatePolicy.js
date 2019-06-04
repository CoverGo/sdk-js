import { gql } from '../gql'

const query = /* GraphQL */ `
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

export const validatePolicy = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})