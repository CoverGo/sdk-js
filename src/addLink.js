// TODO: import something that will handle requests
import gql from "../gql/";

const query = `
mutation addLink($linkInput: createLinkInput!){
  addLink(linkInput: $linkInput) {
    status
    errors
  }
}
`;

export default async ({ input, token, locale }) => {
  // linkObject:
  // - targetId === object id
  // - sourceId === holder id
  // - link === "owns" -> that defines that holder owns an object

  let res = await gql({
    query,
    variables: { linkInput: input },
    token,
    locale
  });

  // TODO: We should catch network errors and errors preventing getting response here, pass them up
  // Otherwise return what we got
  return res;
};
