import { gql } from '../gql'

/**
 * login
 * @param {Object} variables - gql variables
 * @param {string} variables.tenantId
 * @param {string} variables.clientId
 * @param {string} variables.username
 * @param {string} variables.password
 *
 */
const login = gql`
  query login($tenantId: String!, $clientId: String!, $username: String!, $password: String!){
    token_2(tenantId: $tenantId, clientId: $clientId, username: $username, password: $password) {
      accessToken
      expiresIn
      error
    }
  }
`

export { login }