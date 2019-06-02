import gql from '../gql'

const query = /* GraphQL */ `
mutation createIndividual($createIndividualInput: createIndividualInput!) {
  createIndividual(createIndividualInput:$createIndividualInput ){
    createdStatus{
      id
    }
    errors
    status
  }
}
`

export const createIndividual = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})