import gql from "../gql/"

const query = `
mutation processPaymentAndIssue($payment: paymentInput!){
  processPayment_2(input: $payment){
    status
    errors
  }
}`

export default async ({ paymentInput, token, locale }) => {
  let res = await gql({
    query,
    variables: { payment: paymentInput },
    token,
    locale,
  })

  // Check for errors
  if (res?.data?.processPayment_2?.errors) return Promise.resolve({ ...res, errors: [{ message: `${res.data.processPayment_2.errors}` }] })
  if (res?.data?.processPayment_2?.status === undefined || res?.data?.processPayment_2?.status !== "success")
    return Promise.resolve({ ...res, errors: [{ message: "Unexpected error" }] })

  // If all good return true
  return Promise.resolve(true)
}
