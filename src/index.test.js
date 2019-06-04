import { gql } from './gql';
import { benefitCategories, login, productListing, checkoutConfig, createIndividual } from './atomicQueries'
import { singleProductVariables, multiproductvariables } from '../test/mockArgs'
import { singleProduct } from './atomicQueries/singleProduct'

let token
const __debug = false

async function getToken () {
  const variables = {tenantId:"vhis_uat", clientId:"coverQuote", username:"coverQuoteGuest", password:"coverQuoteGuest"}
  const res = await login({__debug, variables})
  token = res.data.token_2.accessToken
  Promise.resolve(token)
}

beforeAll(() => {
  return getToken()
})

describe('Login Mutation', () => {
  it('should return a valid token', async () => {
    const variables = {tenantId:"vhis_uat", clientId:"coverQuote", username:"coverQuoteGuest", password:"coverQuoteGuest"}
    expect.assertions(1)
    const res = await login({__debug, variables})
    expect(res).toHaveProperty('data.token_2.accessToken')
  })
})

describe('queries', () => {
  it('should return benefitCategories', async () => {
    expect.assertions(1)
    const res = await benefitCategories({__debug, token})
    expect(res).toHaveProperty('data.benefitCategories')
  })

  it('should return a single product', async () => {
    expect.assertions(1)
    const variables = singleProductVariables
    const res = await singleProduct({__debug, token, variables})
    expect(res).toHaveProperty('data.products')
  })

  it('should return a list of products', async () => {
    expect.assertions(1)
    const variables = multiproductvariables
    const res = await productListing({__debug, token, variables})
    expect(res).toHaveProperty('data.products')
  })

  it('should return a checkout config for a given product', async () => {
    expect.assertions(1)
    const variables = singleProductVariables
    delete variables.productTypes
    const res = await checkoutConfig({__debug, token, variables})
    expect(JSON.stringify(res)).toContain('checkoutConfig')
  })

  it('should return errors for malformed queries', async () => {
    const query = `query{}`
    const res = await gql``({__debug})
    expect(res).toHaveProperty('errors')
  })
})

describe('Entity Creation', () => {
  let individualId
  afterAll(async () => {
    if (individualId) {
      const query = `mutation {
        deleteEntity(id: "${individualId}"){
          errors
          errors_2{
            code
            message
          }
          status
        }
      }`
      let res = await gql({query, variables: {}, token, __debug: true})
    } else {
      return new Promise('done')
    }
  })
  it('should create an Individual', async () => {
    expect.assertions(1)
    const variables = {createIndividualInput:{englishFirstName:"AlexTest", englishLastName:"LastNameTest"}}
    const res = await createIndividual({variables, token, __debug})
    individualId = res.data.createIndividual.createdStatus.id
    expect(res.data.createIndividual.status).toBe('success')
  })
})