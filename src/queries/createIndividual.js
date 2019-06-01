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