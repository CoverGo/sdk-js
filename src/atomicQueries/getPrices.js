import { gql } from "../gql"
import { PricesFragment } from "./fragments/pricesOnProduct"

const getPrices = gql`
	query getPrices(
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
					name
					logoUrls {
						typeC
					}
				}
			}
		}
	}
	${PricesFragment}
`
export { getPrices }
