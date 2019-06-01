const query = /* GraphQL */ `
  mutation addLink($linkInput: createLinkInput!){
    addLink(linkInput: $linkInput) {
      status
      errors
    }
  }
`