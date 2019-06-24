import { gql } from "./gql"
import { benefitCategories, login, productListing, checkoutConfig, createIndividual, getPrices } from "./atomicQueries"
import { singleProductVariables, multiproductvariables, batchInitializePolicyVariables } from "../test/mockArgs"
import { singleProduct } from "./atomicQueries/singleProduct"
import { createPolicy } from "./publicSDK/InitializePolicy"

const batch2 = {
	policyParticulars: {
		startDate: null,
		productId: {
			type: "home",
			plan: "chubb_myhomeguard_occupier_plana",
			version: null,
		},
		pricing: {
			discountCodes: [],
		},
		referralCode: null,
		source: "COMPARISON",
		benefitOptions: [],
		values: [
			{
				key: "isOwner",
				values: {
					booleanValue: false,
				},
			},
			{
				key: "isOccupier",
				values: {
					booleanValue: true,
				},
			},
			{
				key: "insureds",
				values: {
					arrayValue: [
						{
							objectValue: [
								{
									key: "ageOfBuilding",
									values: {
										numberValue: 17,
									},
								},
								{
									key: "grossAreaInSqFt",
									values: {
										numberValue: 500,
									},
								},
								{
									key: "buildingType",
									values: {
										stringValue: "multiStoreyBuilding",
									},
								},
								{
									key: "numberOfFloors",
									values: {
										numberValue: 4,
									},
								},
							],
						},
					],
				},
			},
		],
	},
	holder: {
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
	},
	insuredObjects: [
		{
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
			facts: [
				{
					type: "ageOfBuilding",
					values: {
						numberValue: 17,
					},
				},
				{
					type: "grossAreaInSqFt",
					values: {
						numberValue: 500,
					},
				},
				{
					type: "buildingType",
					values: {
						stringValue: "multiStoreyBuilding",
					},
				},
				{
					type: "numberOfFloors",
					values: {
						numberValue: 4,
					},
				},
			],
		},
	],
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
		const variables = batchInitializePolicyVariables
		// const variables = batch2
		const res = await createPolicy({ variables, token, __debug })
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
