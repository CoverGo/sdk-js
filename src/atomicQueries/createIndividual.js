import { gql } from '../gql'

const createIndividual = gql`
mutation createIndividual($createIndividualInput: createIndividualInput!) {
  createIndividual(createIndividualInput:$createIndividualInput ){
    createdStatus{
      id
    }
    errors
    status
  }
}
`.withFieldErrorMapping()

export { createIndividual }