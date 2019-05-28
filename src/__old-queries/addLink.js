import gql from "../gql/"

const query = `
mutation addLink($linkInput: createLinkInput!){
  addLink(linkInput: $linkInput) {
    status
    errors
  }
}
`

export default async ({ linkInput, token, locale }) => {
  // linkObject:
  // - targetId === object id
  // - sourceId === holder id
  // - link === "owns" -> that defines that holder owns an object

  // TODO: how to now whether to create objec link or realtionship link?
  let res = await gql({
    query,
    variables: { linkInput },
    token,
    locale,
  })

  // Check for errors
  // We are mimicking graphql error structure with res.errors
  if (res?.data?.addLink?.status !== "success") res.errors = [{ message: "Unexpected error" }]
  return Promise.resolve(res)
}
