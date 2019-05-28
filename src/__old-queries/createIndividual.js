import gql from "../gql/"

const query = `
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

export default async ({ individualInput, token, locale }) => {
  // Prepare facts payload
  // const facts = individualInput.facts?.map(fact => ({
  //   type: fact.type,
  //   value: fact.value,
  // }))

  const scalarValueFromValue = (value) => {
    switch (typeof value) {
      case "number":
        return { numberValue: parseInt(value) }
      case "boolean":
        return { booleanValue: value }
      case "string":        
        return { stringValue: value }
      default:
        return { stringValue: value }
    }
  }

  const facts = individualInput?.facts?.map(fact => {
    return {
      type: fact.type,
      values: fact.values ? fact.values : scalarValueFromValue(fact.value)
    }
  })

  let res = await gql({
    query,
    variables: {
      createIndividualInput: {
        ...individualInput.credentials,
        contacts: individualInput.contacts,
        identities: individualInput.identities,
        addresses: individualInput.addresses,
        facts,
        type: "CUSTOMER",
      },
    },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (!res?.data?.createIndividual?.createdStatus?.id) res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
