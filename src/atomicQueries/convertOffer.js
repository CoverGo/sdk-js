import { gql } from '../gql'

const convertOffer = gql`
mutation convertOffer($quoteId: String! $offerId: String!){
  convertOffer(quoteId: $quoteId offerId: $offerId){
    errors
    status
  }
}
`

export { convertOffer }