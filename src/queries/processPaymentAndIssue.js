const query = /* GraphQL */ `
mutation processPaymentAndIssue($payment: paymentInput!){
  processPayment_2(input: $payment){
    status
    errors
  }
}`