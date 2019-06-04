import { gql } from '../gql'

const addLink = gql`
  mutation addLink($linkInput: createLinkInput!){
    addLink(linkInput: $linkInput) {
      status
      errors
    }
  }
`

export { addLink }