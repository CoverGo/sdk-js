import gql from '../gql'

const query = /* GraphQL */ `
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

export const createObject = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})