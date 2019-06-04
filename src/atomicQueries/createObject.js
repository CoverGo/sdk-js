import { gql } from '../gql'

const createObject = gql`
mutation createObject($createObjectInput: createObjectInput!){
  createObject(createObjectInput: $createObjectInput){
    status
    errors
    createdStatus{
      id
    }
  }
}
`

export { createObject }