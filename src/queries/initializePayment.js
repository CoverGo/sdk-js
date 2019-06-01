const query = /* GraphQL */ `
  mutation initPayment($paymentInput: initializePaymentInput!) {
    initializePayment(input: $paymentInput) {
      errors,
      value {
        token
        url
      }
    }
  }
`