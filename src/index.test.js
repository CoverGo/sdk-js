import { gql } from './gql';
import { benefitCategories, login, productListing, checkoutConfig, createIndividual, getPrices } from './atomicQueries'
import { singleProductVariables, multiproductvariables, batchInitializePolicyVariables } from '../test/mockArgs'
import { singleProduct } from './atomicQueries/singleProduct'
import { createPolicy } from './publicSDK/InitializePolicy';

let token
const __debug = false

async function getToken () {
  const variables = {tenantId:"vhis_uat", clientId:"coverQuote", username:"coverQuoteGuest", password:"coverQuoteGuest"}
  // const variables = {tenantId:"test_uat", clientId:"covergo_crm", username:"admin@covergo.com", password:"adminadmin"}
  const res = await login({__debug, variables})
  token = res.data.token_2.accessToken
  Promise.resolve(token)
}

beforeAll(() => {
  return getToken()
})

afterAll(() => {
  token = null
})

describe('Login Mutation', () => {
  it('should return a valid token', async () => {
    const variables = {tenantId:"vhis_uat", clientId:"coverQuote", username:"coverQuoteGuest", password:"coverQuoteGuest"}
    expect.assertions(1)
    const res = await login({__debug, variables})
    expect(res.data.token_2.accessToken).not.toBe(null)
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

  it('should return prices for a single product', async () => {
    expect.assertions(2)
    const variables = singleProductVariables
    const res = await getPrices({__debug, token, variables})
    expect(res).toHaveProperty('data.products.list')
    expect(res.data.products.list[0]).toHaveProperty('pricing')
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
      let res = await gql({query, variables: {}, token, __debug})
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

describe('BatchInitializePolicy', () => {
  it('should initialize a policy', async () => {
    expect.assertions(1)
    const variables = batchInitializePolicyVariables
    const res = await createPolicy({variables, token, __debug})
    expect(res.policyId).toBeDefined()
  })
})