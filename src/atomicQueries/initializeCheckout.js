import { gql } from "../gql"
import { PricesFragment } from "./fragments/pricesOnProduct"

const initializeCheckout = gql`
	query initializeCheckout(
		$where: productWhereInput
		$values: [keyValueInput]
		$discountCodes: [String]
		$benefitOptions: [benefitOptionInput]
		$hasAdvisorId: Boolean = false
	) {
		products: products_2(where: $where, values: $values) {
			list {
				name
				productId {
					plan
					type
					version
				}
				...Prices
				insurer {
					id
					name
					detailedName
					logoUrls {
						typeA
						typeB
						typeC
						typeD
						typeE
					}
				}
			}
		}
	}
	${PricesFragment}
`
export { initializeCheckout }
