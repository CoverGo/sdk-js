import { gql } from '../gql'

const addOffer = gql`
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

export { addOffer }