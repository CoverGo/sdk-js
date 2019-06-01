import gql from '../gql'

const query = /* GraphQL */ `
  query login($tenantId: String!, $clientId: String!, $username: String!, $password: String!){
    token_2(tenantId: $tenantId, clientId: $clientId, username: $username, password: $password) {
      accessToken
      expiresIn
      error
    }
  }
`

export const login = ({variables, token, locale, __debug}) => gql({query, variables, token, locale, __debug})