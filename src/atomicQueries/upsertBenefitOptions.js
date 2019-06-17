import { gql } from '../gql'

const upsertBenefitOption = gql`
mutation upsertBenefitOption($policyId: String! $input: benefitOptionInput!){
  upsertBenefitOption(policyId: $policyId input:$input){
    errors
    status
  }
}
`

export { upsertBenefitOption }