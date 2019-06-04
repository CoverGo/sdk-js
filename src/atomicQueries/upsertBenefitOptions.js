import gql from '../gql'

const query = /* GraphQL */ `
mutation upsertBenefitOption($policyId: String! $input: benefitOptionInput!){
  upsertBenefitOption(policyId: $policyId input:$input){
    errors
    status
  }
}
`

export const upsertBenefitOption = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})