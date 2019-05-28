import gql from "../gql/"

const query = `
mutation upsertBenefitOption($policyId: String! $input: benefitOptionInput!){
  upsertBenefitOption(policyId: $policyId input:$input){
    errors
    status
  }
}
`

export default async ({ policyId, benefitOptionInput, token, locale }) => {
  let res = await gql({
    query,
    variables: { policyId, input: benefitOptionInput },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (res?.data?.upsertBenefitOption?.status !== "success") res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
