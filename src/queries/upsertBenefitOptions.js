const query = /* GraphQL */ `
mutation upsertBenefitOption($policyId: String! $input: benefitOptionInput!){
  upsertBenefitOption(policyId: $policyId input:$input){
    errors
    status
  }
}
`