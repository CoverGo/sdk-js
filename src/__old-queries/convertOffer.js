import gql from "../gql/"

const query = `
mutation convertOffer($quoteId: String! $offerId: String!){
  convertOffer(quoteId: $quoteId offerId: $offerId){
    errors
    status
  }
}
`

export default async ({ quoteId, offerId, token, locale }) => {
  let res = await gql({
    query,
    variables: { quoteId, offerId },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (res?.data?.convertOffer?.status !== "success") res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
