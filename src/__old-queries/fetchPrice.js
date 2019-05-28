import gql from "../gql/"

const query = `
query products_2(
  $where: productWhereInput
  $values:[keyValueInput]
  $discountCodes: [String]
  $benefitOptions: [benefitOptionInput]
  ) {
  products_2(where:$where values:$values) {
    list {
      name
      pricing(values: $values discountCodes: $discountCodes benefitOptions: $benefitOptions){
        formattedPrice
        originalPrice
        appliedDiscounts {
          code
          originalPrice
          formattedOriginalPrice
        }
        amount
        currencyCode
      }
    }
  }
}
`

export default async ({ where, values, discountCodes, token, locale }) => {
	let res = await gql({
		query,
		variables: { where, values, discountCodes },
		token,
		locale,
	})

	// Check for errors
	// We are mimicking graphql error structure with res.errors
	if (res?.data?.data?.products_2) {
		console.log(res)
		res.errors = [{ message: "Unexpected error" }]
	}
	return Promise.resolve(res)
}
