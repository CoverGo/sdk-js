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