import gql from '../gql'

const query = /* GraphQL */ `
mutation deleteEntity($id: String!) {
  deleteEntity(id:$id ){
    errors
    errors_2{
      code
      message
    }
    status
  }
}
`

export const deleteEntity = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})