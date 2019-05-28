import gql from "../gql/"

const query = `
mutation addOffer($policyId: String! $offerInput: addOfferInput!){
  addOffer(policyId: $policyId offerInput: $offerInput){
    createdStatus {
      id
    }
    errors
    status
  }
}
`

export default async ({ policyId, offerInput, token, locale }) => {
  let res = await gql({
    query,
    variables: { policyId, offerInput },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (res?.data?.addOffer?.status !== "success") res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res?.data.addOffer.createdStatus.id)
}
