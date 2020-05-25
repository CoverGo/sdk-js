import { initializePolicy } from "../atomicQueries"

const batchInitializePolicy = async ({ payload, createdEntities, token, locale, options = { url: "https://api.covergo.com/graphql" }, __debug = false }) => {
	// We are also passing these
	const { startDate, endDate, productId, referralCode, source, values, facts } = payload.policyParticulars

	const insuredIds = createdEntities.filter(({ isInsured }) => isInsured).map(entity => entity.systemId)
	const holderId = createdEntities.filter(({ isHolder }) => isHolder).map(entity => entity.systemId)[0]
	const otherHolderIds = createdEntities.filter(({ isOtherHolder }) => isOtherHolder).map(entity => entity.systemId)

	const initializePolicyInput = {
		holderId,
		insuredIds,
		startDate,
		endDate,
		productId,
		referralCode,
		source,
		values,
		facts,
		otherHolderIds,
	}

	// Initialize policy
	const res = await initializePolicy({
		variables: { initializePolicyInput },
		token,
		locale,
		options,
		__debug,
	})

	if (res.errors) return Promise.resolve({ errors: res.errors })

	const policyId = res.data.initializePolicy.policyStatus.id

	return Promise.resolve(policyId)
}

export { batchInitializePolicy }
