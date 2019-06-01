export const addFact = /* GraphQL */ `
  mutation addFact($entityId: String! $factInput: addFactInput!){
    addFact(entityId: $entityId factInput: $factInput){
      errors
      status
    }
  }
`