import { gql } from '../gql'

const convertOffer = gql`
mutation convertOffer($policyId: String! $offerId: String!){
  convertOffer(policyId: $policyId offerId: $offerId){
    errors
    status
  }
}
`.withFieldErrorMapping()

export { convertOffer }