const query = /* GraphQL */`
mutation convertOffer($quoteId: String! $offerId: String!){
  convertOffer(quoteId: $quoteId offerId: $offerId){
    errors
    status
  }
}
`