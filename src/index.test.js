import { gql } from "./gql"
import { benefitCategories, login, productListing, checkoutConfig, createIndividual, getPrices } from "./atomicQueries"
import { singleProductVariables, multiproductvariables, batchInitializePolicyVariables } from "../test/mockArgs"
import { singleProduct } from "./atomicQueries/singleProduct"
import { createPolicy } from "./publicSDK/InitializePolicy"

const batchWithEntities = {
	policyParticulars: {
		startDate: '2019-06-27T00:00:00.000Z',
		endDate: '2019-06-28T00:00:00.000Z',
		productId: {
			type: "travel",
			plan: "starr_travellead_essential_singleTrip",
			version: 1,
		},
		pricing: {
			discountCodes: [],
		},
		referralCode: null,
		source: "COMPARISON",
		benefitOptions: [],
		values: [
		],
	},
	entities: [
		{
			tempId: 'holder1',
			entityType: 'individual',
			isHolder: true,
			isInsured: true,
			links: [{
				tempTargetId: 'holder1',
				link: 'self'
			}],
			englishFirstName: null,
			englishLastName: null,
			gender: "male",
			dateOfBirth: null,
			contacts: [
				{
					type: "email",
					value: null,
				},
				{
					type: "telephoneNumber",
					value: null,
				},
			],
			identities: [
				{
					type: "hkid",
					value: null,
				},
			],
			addresses: [
				{
					type: "address1",
					fields: [
						{
							type: "address1",
							value: null,
						},
						{
							type: "address2",
							value: null,
						},
						{
							type: "address3",
							value: null,
						},
						{
							type: "district",
							value: null,
						},
						{
							type: "territory",
							value: null,
						},
					],
				},
			],
		}
	]
}
const batch3 = {
  "policyParticulars": {
    "startDate": "2019-06-25T00:00:00.000Z",
    "endDate": "2019-06-26",
    "productId": {
      "type": "travel",
      "plan": "starr_travellead_essential_singleTrip",
      "version": "1"
    },
    "pricing": {
      "discountCodes": []
    },
    "referralCode": null,
    "source": "COMPARISON",
    "benefitOptions": [],
    "values": [
      {
        "key": "isAnnual",
        "value": {
          "booleanValue": false
        }
      },
      {
        "key": "isFamily",
        "value": {
          "booleanValue": false
        }
      },
      {
        "key": "insureds",
        "value": {
          "arrayValue": [
            {
              "objectValue": [
                {
                  "key": "age",
                  "value": {
                    "numberValue": 36
                  }
                }
              ]
            },
            {
              "objectValue": [
                {
                  "key": "age",
                  "value": {
                    "numberValue": 35
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "key": "destinationCountry",
        "value": {
          "arrayValue": [
            {
              "stringValue": "JPN"
            }
          ]
        }
      },
      {
        "key": "durationInDays",
        "value": {
          "numberValue": 2
        }
      },
      {
        "key": "startDate",
        "value": {
          "dateValue": "2019-06-25T00:00:00.000Z"
        }
      }
    ]
  },
  "holder": {
    "type": "CUSTOMER",
    "englishFirstName": "Alex",
    "englishLastName": "Monty",
    "dateOfBirth": "1982-06-26",
    "isOneOfInsured": true,
    "facts": [
      {
        "type": "isAnnual",
        "value": {
          "booleanValue": true
        }
      },
      {
        "type": "isFamily",
        "value": {
          "booleanValue": false
        }
      }
    ],
    "contacts": [
      {
        "type": "email",
        "value": "alex@covergo.com"
      },
      {
        "type": "telephoneNumber",
        "value": "12345678"
      }
    ],
    "identities": [
      {
        "type": "hkid",
        "value": "A1234563"
      }
    ],
    "relationshipsToHolder": [
      "self"
    ]
  },
  "insuredObjects": [],
  "insuredPeople": [
    {
      "englishFirstName": "Alex",
      "englishLastName": "Two",
      "dateOfBirth": "1983-08-14",
      "contacts": [
        {
          "type": "email",
          "value": null
        },
        {
          "type": "telephoneNumber",
          "value": null
        }
      ],
      "identities": [
        {
          "type": "hkid",
          "value": "A1234563"
        }
      ],
      "relationshipsToHolder": [
        "spouse"
      ]
    }
  ]
}

let token
const __debug = false

async function getToken() {
	const variables = { tenantId: "apex_uat", clientId: "coverQuote", username: "coverQuoteGuest", password: "coverQuoteGuest" }
	// const variables = {tenantId:"apex_uat", clientId:"covergo_crm", username:"admin@covergo.com", password:"adminadmin"}
	const res = await login({ __debug, variables })
	token = res.data.token_2.accessToken
	Promise.resolve(token)
}

beforeAll(() => {
	return getToken()
})

afterAll(() => {
	token = null
})

describe("Login Mutation", () => {
	it("should return a valid token", async () => {
		const variables = { tenantId: "apex_uat", clientId: "coverQuote", username: "coverQuoteGuest", password: "coverQuoteGuest" }
		expect.assertions(1)
		const res = await login({ __debug, variables })
		expect(res.data.token_2.accessToken).not.toBe(null)
	})
})

describe("queries", () => {
	it("should return benefitCategories", async () => {
		expect.assertions(1)
		const variables = {
			productTypes: ["travel"],
		}
		const res = await benefitCategories({ __debug, token, variables })
		expect(res).toHaveProperty("data.benefitCategories")
	})

	it("should return a single product", async () => {
		expect.assertions(1)
		const variables = singleProductVariables
		const res = await singleProduct({ __debug, token, variables })
		expect(res).toHaveProperty("data.products")
	})

	// it('should return prices for a single product', async () => {
	//   expect.assertions(2)
	//   const variables = singleProductVariables
	//   const res = await getPrices({__debug, token, variables})
	//   expect(res).toHaveProperty('data.products.list')
	//   expect(res.data.products.list[0]).toHaveProperty('pricing')
	// })

	it("should return a list of products", async () => {
		expect.assertions(1)
		const variables = multiproductvariables
		const res = await productListing({ __debug, token, variables })
		expect(res).toHaveProperty("data.products")
	})

	// it('should return a checkout config for a given product', async () => {
	//   expect.assertions(1)
	//   const variables = singleProductVariables
	//   delete variables.productTypes
	//   const res = await checkoutConfig({__debug, token, variables})
	//   expect(JSON.stringify(res)).toContain('checkoutConfig')
	// })

	// it('should return errors for malformed queries', async () => {
	//   const query = `query{}`
	//   const res = await gql``({__debug})
	//   expect(res).toHaveProperty('errors')
	// })
})

describe("Entity Creation", () => {
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
			let res = await gql({ query, variables: {}, token, __debug })
		} else {
			return new Promise("done")
		}
	})
	it("should create an Individual", async () => {
		expect.assertions(1)
		const variables = { createIndividualInput: { englishFirstName: "AlexTest", englishLastName: "LastNameTest" } }
		const res = await createIndividual({ variables, token, __debug })
		expect(res.data.createIndividual.status).toBe("success")
	})

	it("should return errors at the top level when using `withFieldErrorMapping`", async () => {
		expect.assertions(1)
		const variables = { createIndividualInput: { englishFirstName: { name: "Lura" }, englishLastName: "Schaden" } }
		const res = await createIndividual({ variables, token, __debug })
		console.log(JSON.stringify(res))
		expect(res.errors).toBeInstanceOf(Array)
	})
})

describe("BatchInitializePolicy", () => {
	it("should initialize a policy", async () => {
		expect.assertions(1)
		// const variables = batchInitializePolicyVariables
		// const variables = batch2
		// const variables = batch3
		const variables = batchWithEntities
		const res = await createPolicy({ variables, token, __debug: true })
		console.log(JSON.stringify(res))
		expect(res.policyId).toBeDefined()
	})
})

// describe('Payment flow', () => {
//   let policyId
//   beforeAll(() => {
//     const res = await createPolicy({variables: batchInitializePolicyVariables, token, __debug})
//     policyId = res.policyId
//   })
//   it('should initializeTransation', async () => {
//     expect.assertions(1)
//     const variables = {amount}
//   })
// })
