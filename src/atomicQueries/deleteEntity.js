import { gql } from '../gql'

const deleteEntity = gql`
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

export { deleteEntity }