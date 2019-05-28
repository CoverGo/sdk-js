import gql from "../gql/"

const query = `
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

export default async ({ objectInput, token, locale }) => {
  // Prepare facts payload
  // const facts = objectInput.facts?.map(fact => ({
  //   type: fact.type,
  //   values: fact.value,
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

  const facts = objectInput.facts?.map(fact => {
    return {
      type: fact.type,
      values: fact.values ? fact.values : scalarValueFromValue(fact.value)
    }
  })

  let res = await gql({
    query,
    variables: {
      createObjectInput: {
        addresses:  objectInput.addresses,
        nameFormat: objectInput.name,
        facts,
      }
    },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (!res?.data?.createObject?.createdStatus?.id === undefined) res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
