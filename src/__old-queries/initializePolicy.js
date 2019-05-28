import gql from "../gql/"

const query = `
mutation initializePolicy($policy: initializePolicyInput){
  initializePolicy(policy: $policy){
    status
    errors
    policyStatus{
      id
    }
  }
}`

export default async ({ initializePolicyInput, token, locale }) => {
  let res = await gql({
    query,
    variables: { policy: initializePolicyInput },
    token,
    locale,
  })

  // Check for errors
  if (res?.data?.initializePolicy?.errors) return Promise.resolve({ ...res, errors: [{ message: `${res.data.initializePolicy.errors}` }] })
  if (res?.data?.initializePolicy?.policyStatus?.id === undefined) return Promise.resolve({ ...res, errors: [{ message: "Unexpected error" }] })

  // If all good return policy id
  return Promise.resolve(res.data.initializePolicy.policyStatus.id)
}
