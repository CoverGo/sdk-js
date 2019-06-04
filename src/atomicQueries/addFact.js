import { gql } from '../gql'

const addFact = gql`
  mutation addFact($entityId: String! $factInput: addFactInput!){
    addFact(entityId: $entityId factInput: $factInput){
      errors
      status
    }
  }
`

export { addFact }