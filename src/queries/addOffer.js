const query = /* GraphQL */ `
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