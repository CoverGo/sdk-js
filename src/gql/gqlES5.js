import { fetch } from "cross-fetch"

const gqlES5 = async ({
	query = null,
	variables = null,
	url = "https://api.covergo.com/graphql",
	method = "POST",
	locale = null,
	token = null,
	headers = {},
	__debug = false,
}) => {
	if (!query) console.error("GQL: there was no query to send")

	if (__debug) {
		console.group("--------------- API REQUEST ---------------")
		console.log(`Language: ${locale}`)
		console.log("Query: \n", query)
		console.log("Variables:", variables)
		console.groupEnd()
	}

	let json = JSON.stringify({ query, variables })

	const options = {
		method,
		headers: {
			"Content-Type": "application/json",
			"Accept-Language": locale,
			Authorization: `Bearer ${token}`,
		},
		body: json,
	}

	let res = await fetch(url, options)
	if (__debug) console.log(res)

	if (res.status >= 400) {
		throw new Error("Network error from GQL")
	}

	const resData = await res.json()
	return Promise.resolve(resData)
}

export { gqlES5 }
