import { gql } from '../gql'

const addBeneficiaryEligibility = gql`
mutation addBeneficiaryEligibility($policyId: String! $beneficiaryEligibilityInput: beneficiaryEligibilityInput!) {
  addBeneficiaryEligibility($policyId: $policyId beneficiaryEligibilityInput: $beneficiaryEligibilityInput){
    errors
    errors_2 {
      code
      message
    }
    status
  }
}
`

export { addBeneficiaryEligibility }