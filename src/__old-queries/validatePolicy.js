import gql from "../gql/"

const query = `
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

export default async ({ policyId, token, locale }) => {
  let res = await gql({
    query,
    variables: { policyId },
    token,
    locale,
  })

  // Check for errors
  if (res?.data?.validatePolicy_2?.errors_2) return Promise.resolve({ ...res, errors: [{ message: `${res.data.validatePolicy_2.errors_2}` }] })
  if (res?.data?.validatePolicy_2?.errors) return Promise.resolve({ ...res, errors: [{ message: `${res.data.validatePolicy_2.errors}` }] })
  if (res?.data?.validatePolicy_2?.status === undefined || res?.data?.validatePolicy_2?.status !== "success")
    return Promise.resolve({ ...res, errors: [{ message: "Unexpected error" }] })
  return Promise.resolve(true)
}
