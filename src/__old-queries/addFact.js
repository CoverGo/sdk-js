import gql from "../gql/"

const query = `
mutation addFact($entityId: String! $factInput: addFactInput!){
  addFact(entityId: $entityId factInput: $factInput){
    errors
    status
  }
}
`

export default async ({ entityId, factInput, token, locale }) => {
  let res = await gql({
    query,
    variables: { entityId, factInput },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (res?.data?.addFact?.status !== "success") res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
